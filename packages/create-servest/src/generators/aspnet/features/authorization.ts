import fs from 'node:fs';
import path from 'node:path';
import type { IAspNetOptions } from '../types';

export function applyAuthorizationFeature(
  root: string,
  appName: string,
  options: IAspNetOptions,
): void {
  const { authorization, architecture } = options;

  if (authorization !== 'rbac') return;

  // 1. Generate Roles and Policies files
  generateRolesAndPolicies(root, appName, architecture);

  // 2. Register policies in Program.cs
  registerPoliciesInProgram(root, architecture, appName);
}

function generateRolesAndPolicies(root: string, appName: string, architecture: string): void {
  const rolesContent = `namespace ${appName}.${architecture === 'enterprise' ? 'Domain.Constants' : 'Common'};

public static class Roles
{
    public const string Admin = "Admin";
    public const string Manager = "Manager";
    public const string User = "User";
}
`;

  const policiesContent = `namespace ${appName}.${architecture === 'enterprise' ? 'Domain.Constants' : 'Common'};

public static class Policies
{
    public const string RequireAdmin = "RequireAdmin";
    public const string RequireManager = "RequireManager";
}
`;

  if (architecture === 'enterprise') {
    const constantsDir = path.join(root, 'src', `${appName}.Domain`, 'Constants');
    fs.mkdirSync(constantsDir, { recursive: true });
    fs.writeFileSync(path.join(constantsDir, 'Roles.cs'), rolesContent, 'utf-8');
    fs.writeFileSync(path.join(constantsDir, 'Policies.cs'), policiesContent, 'utf-8');
  } else {
    const commonDir = path.join(root, 'Common');
    fs.mkdirSync(commonDir, { recursive: true });
    fs.writeFileSync(path.join(commonDir, 'Roles.cs'), rolesContent, 'utf-8');
    fs.writeFileSync(path.join(commonDir, 'Policies.cs'), policiesContent, 'utf-8');
  }
}

function registerPoliciesInProgram(root: string, architecture: string, appName: string): void {
  const findProgramCs = (): string | null => {
    if (architecture === 'enterprise') {
      const p = path.join(root, 'src', `${appName}.API`, 'Program.cs');
      return fs.existsSync(p) ? p : null;
    }
    const p = path.join(root, 'Program.cs');
    return fs.existsSync(p) ? p : null;
  };

  const programCs = findProgramCs();
  if (!programCs) return;

  let content = fs.readFileSync(programCs, 'utf-8');

  const policyRegistration = `
// RBAC Authorization Policies
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("RequireAdmin", policy => policy.RequireRole("Admin"));
    options.AddPolicy("RequireManager", policy => policy.RequireRole("Admin", "Manager"));
});
`;

  if (!content.includes('RequireAdmin')) {
    if (content.includes('builder.Services.AddCors(')) {
      content = content.replace(
        'builder.Services.AddCors(',
        `${policyRegistration}\nbuilder.Services.AddCors(`,
      );
    } else if (content.includes('var app = builder.Build();')) {
      content = content.replace(
        'var app = builder.Build();',
        `${policyRegistration}\nvar app = builder.Build();`,
      );
    }
    fs.writeFileSync(programCs, content, 'utf-8');
  }
}
