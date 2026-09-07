import spawn from 'cross-spawn';
import type { IAspNetOptions, IValidationResult } from './types';

export function checkInstalledDotnetVersions(): number[] {
  try {
    const result = spawn.sync('dotnet', ['--list-sdks'], { encoding: 'utf-8' });
    if (result.status === 0 && result.stdout) {
      const versions: number[] = [];
      const lines = result.stdout.split('\n');
      for (const line of lines) {
        const match = /^(\d+)\./.exec(line.trim());
        if (match && match[1]) {
          const major = parseInt(match[1], 10);
          if (!versions.includes(major)) {
            versions.push(major);
          }
        }
      }
      return versions;
    }
  } catch {
    // fallback
  }
  return [9];
}

export function validateAspNetOptions(options: IAspNetOptions): IValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // 1. Architecture validation
  if (!['enterprise', 'mvc', 'minimal-api'].includes(options.architecture)) {
    errors.push(
      `Invalid architecture: "${options.architecture}". Must be 'enterprise', 'mvc', or 'minimal-api'.`,
    );
  }

  // 2. ORM & Database validation
  if (options.orm === 'dapper') {
    errors.push(
      'Dapper ORM support is currently in development. Please use Entity Framework Core (--orm ef) or --orm none.',
    );
  }

  if (options.database === 'none' && options.orm === 'ef') {
    errors.push(
      "Database is set to 'none', but ORM is set to 'ef'. Please set ORM to 'none' or choose a database (sqlite, postgres, sqlserver, mysql).",
    );
  }

  // 3. Auth & Database validation
  if (options.auth === 'identity') {
    if (options.database === 'none') {
      errors.push(
        'ASP.NET Core Identity requires a database provider. Please select a database (sqlite, postgres, sqlserver, mysql) or choose JWT authentication.',
      );
    }
    if (options.architecture === 'minimal-api') {
      warnings.push(
        'ASP.NET Core Identity with Minimal API uses standard endpoints. Enterprise or MVC is recommended for Identity.',
      );
    }
  }

  // 4. Authorization validation
  if (options.authorization === 'rbac' && options.auth === 'none') {
    errors.push(
      'RBAC authorization requires authentication. Please select JWT (--auth jwt) or Identity (--auth identity), or set authorization to none.',
    );
  }

  // 5. .NET Version validation
  if (options.dotnetVersion !== 'auto') {
    const requested = parseInt(options.dotnetVersion, 10);
    const installed = checkInstalledDotnetVersions();
    if (installed.length > 0 && !installed.includes(requested)) {
      warnings.push(
        `Requested .NET ${requested}, but installed SDKs found: [${installed.join(', ')}]. .NET will target net${requested}.0.`,
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
