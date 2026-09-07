import fs from 'node:fs';
import path from 'node:path';
import type { IAspNetOptions } from '../types';

export function applyDockerFeature(root: string, appName: string, options: IAspNetOptions): void {
  const { docker, database } = options;

  if (!docker) {
    // Remove Dockerfile and .dockerignore
    const dockerfile = path.join(root, 'Dockerfile');
    const dockerignore = path.join(root, '.dockerignore');
    if (fs.existsSync(dockerfile)) fs.rmSync(dockerfile);
    if (fs.existsSync(dockerignore)) fs.rmSync(dockerignore);
    return;
  }

  // If database is postgres or mysql, create a multi-service docker-compose.yml
  if (['postgres', 'mysql', 'sqlserver'].includes(database)) {
    generateDockerCompose(root, appName, database);
  }
}

function generateDockerCompose(root: string, appName: string, database: string): void {
  const composePath = path.join(root, 'docker-compose.yml');

  let dbService = '';

  if (database === 'postgres') {
    dbService = `
  db:
    image: postgres:16-alpine
    container_name: ${appName.toLowerCase()}-postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: ${appName}Db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5
`;
  } else if (database === 'mysql') {
    dbService = `
  db:
    image: mysql:8.0
    container_name: ${appName.toLowerCase()}-mysql
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: ${appName}Db
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
`;
  } else if (database === 'sqlserver') {
    dbService = `
  db:
    image: mcr.microsoft.com/mssql/server:2022-latest
    container_name: ${appName.toLowerCase()}-sqlserver
    environment:
      ACCEPT_EULA: "Y"
      MSSQL_SA_PASSWORD: "YourStrong@Password123"
    ports:
      - "1433:1433"
    volumes:
      - sqlserver_data:/var/opt/mssql
`;
  }

  const volumeName =
    database === 'postgres'
      ? 'postgres_data'
      : database === 'mysql'
        ? 'mysql_data'
        : 'sqlserver_data';

  const content = `version: '3.8'

services:
  api:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: ${appName.toLowerCase()}-api
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
    ports:
      - "5000:5000"
    depends_on:
      - db
${dbService}
volumes:
  ${volumeName}:
`;

  fs.writeFileSync(composePath, content, 'utf-8');
}
