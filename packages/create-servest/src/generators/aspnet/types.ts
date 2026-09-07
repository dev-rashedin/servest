export type ArchitectureType = 'enterprise' | 'mvc' | 'minimal-api';
export type DotnetVersion = 'auto' | '8' | '9' | '10';
export type DatabaseType = 'sqlite' | 'postgres' | 'sqlserver' | 'mysql' | 'none';
export type OrmType = 'ef' | 'dapper' | 'none';
export type AuthType = 'none' | 'jwt' | 'identity';
export type AuthorizationType = 'none' | 'rbac';
export type TestingType = 'none' | 'unit' | 'unit-integration';
export type ExampleType = 'sample' | 'none';

export interface IAspNetOptions {
  projectName: string;
  targetDir: string;
  root: string;
  architecture: ArchitectureType;
  dotnetVersion: DotnetVersion;
  targetFramework?: string;
  database: DatabaseType;
  orm: OrmType;
  auth: AuthType;
  authorization: AuthorizationType;
  docker: boolean;
  testing: TestingType;
  git: boolean;
  example: ExampleType;
  dryRun?: boolean;
  nonInteractive?: boolean;
}

export interface IValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}
