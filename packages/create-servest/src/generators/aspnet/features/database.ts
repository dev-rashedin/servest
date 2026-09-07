import fs from 'node:fs';
import path from 'node:path';
import type { IAspNetOptions } from '../types';

interface IDatabaseConfig {
  packageName: string;
  packageVersion: string;
  connectionString: string;
  envConnectionString: string;
  useMethod: string;
}

export const DATABASE_CONFIGS: Record<string, IDatabaseConfig> = {
  sqlite: {
    packageName: 'Microsoft.EntityFrameworkCore.Sqlite',
    packageVersion: '9.0.2',
    connectionString: 'Data Source=app.db',
    envConnectionString: 'Data Source=app.db',
    useMethod: 'options.UseSqlite(connectionString)',
  },
  postgres: {
    packageName: 'Npgsql.EntityFrameworkCore.PostgreSQL',
    packageVersion: '9.0.4',
    connectionString:
      'Host=localhost;Port=5432;Database={APP_NAME}Db;Username=postgres;Password=postgres',
    envConnectionString:
      'Host=localhost;Port=5432;Database={APP_NAME}Db;Username=postgres;Password=postgres',
    useMethod: 'options.UseNpgsql(connectionString)',
  },
  sqlserver: {
    packageName: 'Microsoft.EntityFrameworkCore.SqlServer',
    packageVersion: '9.0.2',
    connectionString:
      'Server=localhost;Database={APP_NAME}Db;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True',
    envConnectionString:
      'Server=localhost;Database={APP_NAME}Db;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True',
    useMethod: 'options.UseSqlServer(connectionString)',
  },
  mysql: {
    packageName: 'Pomelo.EntityFrameworkCore.MySql',
    packageVersion: '8.0.3',
    connectionString: 'Server=localhost;Port=3306;Database={APP_NAME}Db;User=root;Password=root',
    envConnectionString: 'Server=localhost;Port=3306;Database={APP_NAME}Db;User=root;Password=root',
    useMethod: 'options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))',
  },
};

export function applyDatabaseFeature(root: string, appName: string, options: IAspNetOptions): void {
  const { database, orm, architecture } = options;

  if (database === 'none' || orm === 'none') {
    // Remove SQLite and DB registrations if no DB or no ORM
    removeDatabaseReferences(root, architecture);
    return;
  }

  const config = DATABASE_CONFIGS[database];
  if (!config) return;

  const connStr = config.connectionString.replace('{APP_NAME}', appName);
  const envConnStr = config.envConnectionString.replace('{APP_NAME}', appName);

  // 1. Update .csproj files
  updateCsprojPackages(root, architecture, config.packageName, config.packageVersion);

  // 2. Update C# source files (DependencyInjection.cs or Program.cs)
  updateDatabaseRegistration(root, architecture, config.useMethod, database);

  // 3. Update appsettings.json and appsettings.Development.json
  updateAppSettings(root, architecture, connStr);

  // 4. Update .env and .env.example
  updateEnvFiles(root, envConnStr);
}

function updateCsprojPackages(
  root: string,
  architecture: string,
  newPkg: string,
  newVer: string,
): void {
  const findCsprojFiles = (dir: string): string[] => {
    let results: string[] = [];
    for (const file of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, file.name);
      if (file.isDirectory()) {
        results = results.concat(findCsprojFiles(full));
      } else if (file.name.endsWith('.csproj')) {
        results.push(full);
      }
    }
    return results;
  };

  const csprojFiles = findCsprojFiles(root);
  for (const file of csprojFiles) {
    let content = fs.readFileSync(file, 'utf-8');
    if (content.includes('Microsoft.EntityFrameworkCore.Sqlite')) {
      if (newPkg !== 'Microsoft.EntityFrameworkCore.Sqlite') {
        content = content.replace(
          /<PackageReference Include="Microsoft\.EntityFrameworkCore\.Sqlite" Version="[^"]*" \/>/,
          `<PackageReference Include="${newPkg}" Version="${newVer}" />`,
        );
        fs.writeFileSync(file, content, 'utf-8');
      }
    }
  }
}

function updateDatabaseRegistration(
  root: string,
  architecture: string,
  useMethod: string,
  database: string,
): void {
  if (database === 'sqlite') return; // Default is already sqlite

  const replaceInFile = (filePath: string) => {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf-8');
    if (content.includes('options.UseSqlite(connectionString)')) {
      content = content.replace('options.UseSqlite(connectionString)', useMethod);
      fs.writeFileSync(filePath, content, 'utf-8');
    }
  };

  if (architecture === 'enterprise') {
    // In src/<AppName>.Persistence/DependencyInjection.cs
    const srcDir = path.join(root, 'src');
    if (fs.existsSync(srcDir)) {
      for (const dir of fs.readdirSync(srcDir)) {
        if (dir.endsWith('.Persistence')) {
          replaceInFile(path.join(srcDir, dir, 'DependencyInjection.cs'));
        }
      }
    }
  } else {
    // In Program.cs
    replaceInFile(path.join(root, 'Program.cs'));
  }
}

function updateAppSettings(root: string, architecture: string, connectionString: string): void {
  const updateJson = (jsonPath: string) => {
    if (!fs.existsSync(jsonPath)) return;
    try {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
      if (!data.ConnectionStrings) {
        data.ConnectionStrings = {};
      }
      data.ConnectionStrings.DefaultConnection = connectionString;
      fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
    } catch {
      // ignore parsing issues
    }
  };

  if (architecture === 'enterprise') {
    const srcDir = path.join(root, 'src');
    if (fs.existsSync(srcDir)) {
      for (const dir of fs.readdirSync(srcDir)) {
        if (dir.endsWith('.API')) {
          updateJson(path.join(srcDir, dir, 'appsettings.json'));
          updateJson(path.join(srcDir, dir, 'appsettings.Development.json'));
        }
      }
    }
  } else {
    updateJson(path.join(root, 'appsettings.json'));
    updateJson(path.join(root, 'appsettings.Development.json'));
  }
}

function updateEnvFiles(root: string, envConnStr: string): void {
  for (const name of ['.env', '.env.example']) {
    const filePath = path.join(root, name);
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf-8');
      content = content.replace(/CONNECTION_STRING=.*/, `CONNECTION_STRING=${envConnStr}`);
      fs.writeFileSync(filePath, content, 'utf-8');
    }
  }
}

function removeDatabaseReferences(root: string, _architecture: string): void {
  // Remove Sqlite package reference
  const walk = (dir: string) => {
    for (const file of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, file.name);
      if (file.isDirectory()) {
        walk(full);
      } else if (file.name.endsWith('.csproj')) {
        let content = fs.readFileSync(full, 'utf-8');
        content = content.replace(
          /<PackageReference Include="Microsoft\.EntityFrameworkCore\.Sqlite" Version="[^"]*" \/>\r?\n?/,
          '',
        );
        fs.writeFileSync(full, content, 'utf-8');
      }
    }
  };
  walk(root);
}
