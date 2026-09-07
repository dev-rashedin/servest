import { confirm, isCancel, select } from '@clack/prompts';
import { cancelOperation } from '../../../../utils/sharedUtility';
import type {
  ArchitectureType,
  AuthType,
  AuthorizationType,
  DatabaseType,
  DotnetVersion,
  ExampleType,
  IAspNetOptions,
  OrmType,
  TestingType,
} from './types';

export async function promptAspNetOptions(
  projectName: string,
  targetDir: string,
  root: string,
  existingOptions?: Partial<IAspNetOptions>,
): Promise<IAspNetOptions> {
  // 1. Architecture
  let architecture = existingOptions?.architecture;
  if (!architecture) {
    const archResult = await select({
      message: 'Select an architecture:',
      options: [
        {
          value: 'enterprise',
          label: 'Enterprise Architecture',
          hint: 'Clean/Onion architecture with CQRS, MediatR, and separation of concerns',
        },
        {
          value: 'mvc',
          label: 'MVC Layered Web API',
          hint: 'Controller-based layered API (Controllers, Services, Models, DTOs)',
        },
        {
          value: 'minimal-api',
          label: 'Minimal API',
          hint: 'Modern high-performance minimal API with Route Groups',
        },
      ],
    });
    if (isCancel(archResult)) return cancelOperation() as never;
    architecture = archResult as ArchitectureType;
  }

  // 2. .NET Version
  let dotnetVersion = existingOptions?.dotnetVersion;
  if (!dotnetVersion) {
    const dotnetResult = await select({
      message: 'Select .NET version:',
      options: [
        { value: 'auto', label: 'Auto Detect', hint: 'Detect installed .NET SDK automatically' },
        { value: '10', label: '.NET 10', hint: 'Modern LTS / Preview' },
        { value: '9', label: '.NET 9', hint: 'Standard STS release' },
        { value: '8', label: '.NET 8', hint: 'LTS release' },
      ],
    });
    if (isCancel(dotnetResult)) return cancelOperation() as never;
    dotnetVersion = dotnetResult as DotnetVersion;
  }

  // 3. Database
  let database = existingOptions?.database;
  if (!database) {
    const dbResult = await select({
      message: 'Select a database:',
      options: [
        {
          value: 'sqlite',
          label: 'SQLite',
          hint: 'Zero setup, file-based database (recommended for fast start)',
        },
        {
          value: 'postgres',
          label: 'PostgreSQL',
          hint: 'Production-ready relational database via Npgsql',
        },
        { value: 'sqlserver', label: 'SQL Server', hint: 'Microsoft SQL Server provider' },
        { value: 'mysql', label: 'MySQL', hint: 'MySQL relational database via Pomelo' },
        { value: 'none', label: 'None', hint: 'No database or persistent store' },
      ],
    });
    if (isCancel(dbResult)) return cancelOperation() as never;
    database = dbResult as DatabaseType;
  }

  // 4. ORM
  let orm = existingOptions?.orm;
  if (!orm) {
    if (database === 'none') {
      orm = 'none';
    } else {
      const ormResult = await select({
        message: 'Select an ORM:',
        options: [
          {
            value: 'ef',
            label: 'Entity Framework Core',
            hint: 'Full-featured ORM with migrations',
          },
          { value: 'none', label: 'None', hint: 'Raw ADO.NET or custom data access' },
        ],
      });
      if (isCancel(ormResult)) return cancelOperation() as never;
      orm = ormResult as OrmType;
    }
  }

  // 5. Authentication
  let auth = existingOptions?.auth;
  if (!auth) {
    const authOptions = [
      { value: 'none', label: 'None', hint: 'No authentication' },
      {
        value: 'jwt',
        label: 'JWT (JSON Web Token)',
        hint: 'Bearer token authentication with TokenService',
      },
    ];
    if (database !== 'none') {
      authOptions.push({
        value: 'identity',
        label: 'ASP.NET Core Identity',
        hint: 'Built-in Identity system with EF Core stores',
      });
    }
    const authResult = await select({
      message: 'Select authentication:',
      options: authOptions,
    });
    if (isCancel(authResult)) return cancelOperation() as never;
    auth = authResult as AuthType;
  }

  // 6. Authorization
  let authorization = existingOptions?.authorization;
  if (!authorization) {
    if (auth === 'none') {
      authorization = 'none';
    } else {
      const authzResult = await select({
        message: 'Select authorization:',
        options: [
          { value: 'none', label: 'None', hint: 'Standard authentication only' },
          {
            value: 'rbac',
            label: 'Role-Based Access Control (RBAC)',
            hint: 'Roles, Permissions & Policies',
          },
        ],
      });
      if (isCancel(authzResult)) return cancelOperation() as never;
      authorization = authzResult as AuthorizationType;
    }
  }

  // 7. Docker
  let docker = existingOptions?.docker;
  if (docker === undefined) {
    const dockerResult = await confirm({
      message: 'Include Docker containerization (Dockerfile & .dockerignore)?',
      initialValue: true,
    });
    if (isCancel(dockerResult)) return cancelOperation() as never;
    docker = Boolean(dockerResult);
  }

  // 8. Testing
  let testing = existingOptions?.testing;
  if (!testing) {
    const testingResult = await select({
      message: 'Select testing suite:',
      options: [
        {
          value: 'unit-integration',
          label: 'Unit + Integration Tests',
          hint: 'xUnit, Moq, FluentAssertions, WebApplicationFactory',
        },
        { value: 'unit', label: 'Unit Tests Only', hint: 'xUnit, Moq, FluentAssertions' },
        { value: 'none', label: 'None', hint: 'No test projects' },
      ],
    });
    if (isCancel(testingResult)) return cancelOperation() as never;
    testing = testingResult as TestingType;
  }

  // 9. Git
  let git = existingOptions?.git;
  if (git === undefined) {
    const gitResult = await confirm({
      message: 'Initialize a new Git repository?',
      initialValue: true,
    });
    if (isCancel(gitResult)) return cancelOperation() as never;
    git = Boolean(gitResult);
  }

  // 10. Example feature
  let example = existingOptions?.example;
  if (!example) {
    const exampleResult = await select({
      message: 'Include example feature?',
      options: [
        {
          value: 'sample',
          label: 'Sample Item (CRUD)',
          hint: 'Pre-built working entity, controller/endpoint, and tests',
        },
        {
          value: 'none',
          label: 'None (Clean Slate)',
          hint: 'Pristine project structure with zero sample entities',
        },
      ],
    });
    if (isCancel(exampleResult)) return cancelOperation() as never;
    example = exampleResult as ExampleType;
  }

  return {
    projectName,
    targetDir,
    root,
    architecture,
    dotnetVersion,
    database,
    orm,
    auth,
    authorization,
    docker,
    testing,
    git,
    example,
  };
}
