import fs from 'node:fs';
import path from 'node:path';
import type { IAspNetOptions } from '../types';

export function applyAuthFeature(root: string, appName: string, options: IAspNetOptions): void {
  const { auth, architecture } = options;

  if (auth !== 'jwt') return;

  // 1. Add JwtBearer package to the API project
  addJwtPackage(root, architecture);

  // 2. Add JwtSettings and TokenService
  generateTokenService(root, appName, architecture);

  // 3. Update appsettings.json and .env
  updateJwtSettings(root, architecture);

  // 4. Register Authentication in Program.cs
  registerAuthenticationInPipeline(root, architecture, appName);
}

function addJwtPackage(root: string, architecture: string): void {
  const jwtPackage =
    '    <PackageReference Include="Microsoft.AspNetCore.Authentication.JwtBearer" Version="9.0.2" />\n';
  const tokensPackage =
    '    <PackageReference Include="System.IdentityModel.Tokens.Jwt" Version="8.6.1" />\n';

  if (architecture === 'enterprise') {
    const srcDir = path.join(root, 'src');
    if (fs.existsSync(srcDir)) {
      for (const dir of fs.readdirSync(srcDir)) {
        if (dir.endsWith('.API')) {
          const csproj = path.join(srcDir, dir, `${dir}.csproj`);
          if (fs.existsSync(csproj)) {
            let content = fs.readFileSync(csproj, 'utf-8');
            if (!content.includes('Microsoft.AspNetCore.Authentication.JwtBearer')) {
              content = content.replace('</ItemGroup>', `${jwtPackage}  </ItemGroup>`);
              fs.writeFileSync(csproj, content, 'utf-8');
            }
          }
        }
        if (dir.endsWith('.Infrastructure')) {
          const csproj = path.join(srcDir, dir, `${dir}.csproj`);
          if (fs.existsSync(csproj)) {
            let content = fs.readFileSync(csproj, 'utf-8');
            if (!content.includes('System.IdentityModel.Tokens.Jwt')) {
              if (content.includes('</ItemGroup>')) {
                content = content.replace('</ItemGroup>', `${tokensPackage}  </ItemGroup>`);
              } else {
                content = content.replace(
                  '</Project>',
                  `  <ItemGroup>\n${tokensPackage}  </ItemGroup>\n</Project>`,
                );
              }
              fs.writeFileSync(csproj, content, 'utf-8');
            }
          }

          // Register in Infrastructure/DependencyInjection.cs
          const diPath = path.join(srcDir, dir, 'DependencyInjection.cs');
          if (fs.existsSync(diPath)) {
            let diContent = fs.readFileSync(diPath, 'utf-8');
            if (!diContent.includes('ITokenService')) {
              diContent = diContent.replace(
                'return services;',
                'services.AddScoped<ITokenService, TokenService>();\n        return services;',
              );
              fs.writeFileSync(diPath, diContent, 'utf-8');
            }
          }
        }
      }
    }
  } else {
    for (const file of fs.readdirSync(root)) {
      if (file.endsWith('.csproj')) {
        const csproj = path.join(root, file);
        let content = fs.readFileSync(csproj, 'utf-8');
        if (!content.includes('Microsoft.AspNetCore.Authentication.JwtBearer')) {
          content = content.replace('</ItemGroup>', `${jwtPackage}${tokensPackage}  </ItemGroup>`);
          fs.writeFileSync(csproj, content, 'utf-8');
        }
      }
    }
  }
}

function generateTokenService(root: string, appName: string, architecture: string): void {
  const tokenServiceContent = `using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace ${appName}.${architecture === 'enterprise' ? 'Infrastructure.Services' : 'Services'};

public interface ITokenService
{
    string GenerateToken(string userId, string userName, IEnumerable<string>? roles = null);
}

public class TokenService : ITokenService
{
    private readonly IConfiguration _configuration;

    public TokenService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerateToken(string userId, string userName, IEnumerable<string>? roles = null)
    {
        var secret = _configuration["JwtSettings:Secret"] ?? "YourSuperSecretKeyMustBeAtLeast32BytesLong!";
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, userId),
            new(JwtRegisteredClaimNames.UniqueName, userName),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        if (roles != null)
        {
            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));
        }

        var token = new JwtSecurityToken(
            issuer: _configuration["JwtSettings:Issuer"] ?? "${appName}Api",
            audience: _configuration["JwtSettings:Audience"] ?? "${appName}Client",
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(double.TryParse(_configuration["JwtSettings:ExpiryMinutes"], out var exp) ? exp : 60),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
`;

  if (architecture === 'enterprise') {
    const infraServicesDir = path.join(root, 'src', `${appName}.Infrastructure`, 'Services');
    if (fs.existsSync(infraServicesDir)) {
      fs.writeFileSync(
        path.join(infraServicesDir, 'TokenService.cs'),
        tokenServiceContent,
        'utf-8',
      );
    }
  } else {
    const servicesDir = path.join(root, 'Services');
    fs.mkdirSync(servicesDir, { recursive: true });
    fs.writeFileSync(path.join(servicesDir, 'TokenService.cs'), tokenServiceContent, 'utf-8');
  }
}

function updateJwtSettings(root: string, architecture: string): void {
  const jwtConfig = {
    Secret: 'YourSuperSecretKeyMustBeAtLeast32BytesLongForSecurity!',
    Issuer: 'ServestApi',
    Audience: 'ServestClient',
    ExpiryMinutes: 60,
  };

  const updateJson = (jsonPath: string) => {
    if (!fs.existsSync(jsonPath)) return;
    try {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
      data.JwtSettings = jwtConfig;
      fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
    } catch {
      // ignore
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

  // Update .env
  for (const name of ['.env', '.env.example']) {
    const envPath = path.join(root, name);
    if (fs.existsSync(envPath)) {
      let content = fs.readFileSync(envPath, 'utf-8');
      content +=
        '\n# JWT Authentication\nJWT_SECRET=YourSuperSecretKeyMustBeAtLeast32BytesLongForSecurity!\nJWT_ISSUER=ServestApi\nJWT_AUDIENCE=ServestClient\n';
      fs.writeFileSync(envPath, content, 'utf-8');
    }
  }
}

function registerAuthenticationInPipeline(
  root: string,
  architecture: string,
  appName: string,
): void {
  const findProgramCs = (): string | null => {
    if (architecture === 'enterprise') {
      const apiDir = path.join(root, 'src', `${appName}.API`);
      const p = path.join(apiDir, 'Program.cs');
      return fs.existsSync(p) ? p : null;
    }
    const p = path.join(root, 'Program.cs');
    return fs.existsSync(p) ? p : null;
  };

  const programCs = findProgramCs();
  if (!programCs) return;

  let content = fs.readFileSync(programCs, 'utf-8');

  // 1. Add using directives
  if (!content.includes('Microsoft.AspNetCore.Authentication.JwtBearer')) {
    content = `using Microsoft.AspNetCore.Authentication.JwtBearer;\nusing Microsoft.IdentityModel.Tokens;\nusing System.Text;\n${content}`;
  }

  // 2. Add service registration
  const jwtRegistration = `
// JWT Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    var secret = builder.Configuration["JwtSettings:Secret"] ?? "YourSuperSecretKeyMustBeAtLeast32BytesLongForSecurity!";
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JwtSettings:Issuer"] ?? "ServestApi",
        ValidAudience = builder.Configuration["JwtSettings:Audience"] ?? "ServestClient",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret))
    };
});
`;

  if (content.includes('builder.Services.AddCors(')) {
    content = content.replace(
      'builder.Services.AddCors(',
      `${jwtRegistration}\nbuilder.Services.AddCors(`,
    );
  }

  // 3. Add app.UseAuthentication() before app.UseAuthorization()
  if (!content.includes('app.UseAuthentication()') && content.includes('app.UseAuthorization()')) {
    content = content.replace(
      'app.UseAuthorization();',
      'app.UseAuthentication();\napp.UseAuthorization();',
    );
  }

  fs.writeFileSync(programCs, content, 'utf-8');
}
