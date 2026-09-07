import fs from 'node:fs';
import path from 'node:path';
import type { IAspNetOptions } from '../types';

export function applyExampleFeature(root: string, appName: string, options: IAspNetOptions): void {
  const { example, architecture } = options;

  if (example !== 'none') return; // Keep sample

  if (architecture === 'enterprise') {
    cleanEnterpriseExample(root, appName);
  } else if (architecture === 'mvc') {
    cleanMvcExample(root);
  } else if (architecture === 'minimal-api') {
    cleanMinimalApiExample(root, appName);
  }
}

function cleanEnterpriseExample(root: string, appName: string): void {
  const src = path.join(root, 'src');

  // 1. Remove Domain entities
  const domainEntities = path.join(src, `${appName}.Domain`, 'Entities', 'SampleItem.cs');
  if (fs.existsSync(domainEntities)) fs.rmSync(domainEntities);

  // 2. Remove Application features
  const appFeatures = path.join(src, `${appName}.Application`, 'Features', 'SampleItems');
  if (fs.existsSync(appFeatures)) fs.rmSync(appFeatures, { recursive: true, force: true });

  // 3. Remove Persistence config and clean DbContext & Interface
  const persistenceConfig = path.join(
    src,
    `${appName}.Persistence`,
    'Configurations',
    'SampleItemConfiguration.cs',
  );
  if (fs.existsSync(persistenceConfig)) fs.rmSync(persistenceConfig);

  const dbContextFile = path.join(
    src,
    `${appName}.Persistence`,
    'Context',
    'ApplicationDbContext.cs',
  );
  if (fs.existsSync(dbContextFile)) {
    let content = fs.readFileSync(dbContextFile, 'utf-8');
    content = content.replace(
      /^[ \t]*(public\s+)?DbSet<SampleItem>\s+SampleItems\b[^\r\n]*\r?\n?/gm,
      '',
    );
    content = content.replace(/using [^;]*\.Domain\.Entities;\r?\n?/g, '');
    fs.writeFileSync(dbContextFile, content, 'utf-8');
  }

  const iDbContextFile = path.join(
    src,
    `${appName}.Application`,
    'Common',
    'Interfaces',
    'IApplicationDbContext.cs',
  );
  if (fs.existsSync(iDbContextFile)) {
    let content = fs.readFileSync(iDbContextFile, 'utf-8');
    content = content.replace(
      /^[ \t]*(public\s+)?DbSet<SampleItem>\s+SampleItems\b[^\r\n]*\r?\n?/gm,
      '',
    );
    content = content.replace(/using [^;]*\.Domain\.Entities;\r?\n?/g, '');
    fs.writeFileSync(iDbContextFile, content, 'utf-8');
  }

  // 4. Remove API controller
  const controller = path.join(src, `${appName}.API`, 'Controllers', 'SampleItemsController.cs');
  if (fs.existsSync(controller)) fs.rmSync(controller);

  // 5. Remove tests
  const unitTest = path.join(
    root,
    'tests',
    `${appName}.UnitTests`,
    'Application',
    'CreateSampleItemCommandHandlerTests.cs',
  );
  if (fs.existsSync(unitTest)) fs.rmSync(unitTest);

  const integrationTest = path.join(
    root,
    'tests',
    `${appName}.IntegrationTests`,
    'Controllers',
    'SampleItemsControllerTests.cs',
  );
  if (fs.existsSync(integrationTest)) fs.rmSync(integrationTest);
}

function cleanMvcExample(root: string): void {
  // 1. Remove Controller
  const controller = path.join(root, 'Controllers', 'SampleItemsController.cs');
  if (fs.existsSync(controller)) fs.rmSync(controller);

  // 2. Remove Service
  const service = path.join(root, 'Services', 'SampleItemService.cs');
  const iService = path.join(root, 'Services', 'ISampleItemService.cs');
  if (fs.existsSync(service)) fs.rmSync(service);
  if (fs.existsSync(iService)) fs.rmSync(iService);

  // 3. Remove Models & DTOs
  const model = path.join(root, 'Models', 'SampleItem.cs');
  if (fs.existsSync(model)) fs.rmSync(model);
  const dtos = path.join(root, 'DTOs', 'SampleItemDto.cs');
  if (fs.existsSync(dtos)) fs.rmSync(dtos);

  // 4. Clean ApplicationDbContext.cs
  const dbContext = path.join(root, 'Data', 'ApplicationDbContext.cs');
  if (fs.existsSync(dbContext)) {
    let content = fs.readFileSync(dbContext, 'utf-8');
    content = content.replace(
      /^[ \t]*(public\s+)?DbSet<SampleItem>\s+SampleItems\b[^\r\n]*\r?\n?/gm,
      '',
    );
    content = content.replace(/using [^;]*\.Models;\r?\n?/g, '');
    fs.writeFileSync(dbContext, content, 'utf-8');
  }

  // 5. Clean Program.cs
  const programCs = path.join(root, 'Program.cs');
  if (fs.existsSync(programCs)) {
    let content = fs.readFileSync(programCs, 'utf-8');
    content = content.replace(
      /builder\.Services\.AddScoped<ISampleItemService,\s*SampleItemService>\(\);/g,
      '',
    );
    content = content.replace(/using [^;]*\.Services;\r?\n?/g, '');
    fs.writeFileSync(programCs, content, 'utf-8');
  }
}

function cleanMinimalApiExample(root: string, appName: string): void {
  // 1. Remove Endpoints
  const endpoint = path.join(root, 'Endpoints', 'SampleEndpoints.cs');
  if (fs.existsSync(endpoint)) fs.rmSync(endpoint);

  // 2. Remove Models & DTOs
  const model = path.join(root, 'Models', 'SampleItem.cs');
  if (fs.existsSync(model)) fs.rmSync(model);
  const dtos = path.join(root, 'DTOs', 'SampleItemDto.cs');
  if (fs.existsSync(dtos)) fs.rmSync(dtos);

  // 3. Clean ApplicationDbContext.cs
  const dbContext = path.join(root, 'Data', 'ApplicationDbContext.cs');
  if (fs.existsSync(dbContext)) {
    let content = fs.readFileSync(dbContext, 'utf-8');
    content = content.replace(
      /^[ \t]*(public\s+)?DbSet<SampleItem>\s+SampleItems\b[^\r\n]*\r?\n?/gm,
      '',
    );
    content = content.replace(/using [^;]*\.Models;\r?\n?/g, '');
    fs.writeFileSync(dbContext, content, 'utf-8');
  }

  // 4. Clean Program.cs
  const programCs = path.join(root, 'Program.cs');
  if (fs.existsSync(programCs)) {
    let content = fs.readFileSync(programCs, 'utf-8');
    content = content.replace(
      'app.MapSampleEndpoints();',
      `app.MapGet("/", () => Results.Ok(new { message = "Welcome to ${appName} API", status = "Healthy" }));`,
    );
    content = content.replace(/using [^;]*\.Endpoints;\r?\n?/g, '');
    fs.writeFileSync(programCs, content, 'utf-8');
  }
}
