# Contributing to Servest CLI

Thank you for your interest in contributing! We welcome contributions from everyone. By contributing, you agree to follow the guidelines below to keep the project consistent and maintainable.

## Project Overview

This repository contains three packages:

1. **create-servest** – CLI for generating backend starter projects with templates.

   - Supports Express, Django, and future variants like Laravel and Go.
   - Example: `npm create servest@latest -- --template express-mvc-ts`

2. **servest-frontend** – Frontend for project templates, inspired by vite.dev.

3. **servest** – Package to add backend utilities in one line, similar to Shadcn.
   - Example: `npx add servest@latest eslint-prettier`

## How to Contribute

### 1. Reporting Issues

- Open an issue in the [GitHub Issues](https://github.com/dev-rashedin/servest) tab.
- Provide clear steps to reproduce, expected behavior, and actual behavior.

### 2. Submitting Pull Requests

1. Fork the repository and create a branch for your feature or bug fix.
   ```bash
   git checkout -b feature/my-feature
   ```
2. Make your changes, keeping code style consistent.
   - Use **2-space indentation** and LF line endings.
   - Follow existing project patterns.
3. Add tests if applicable.
4. Commit your changes using clear, descriptive messages.
   ```bash
   git commit -m "feat(create-servest): add new express template"
   ```
5. Push your branch and open a pull request.

### 3. Code Style

- This repo uses **ESLint** and **Prettier**.
- Run linters before committing:
  ```bash
  npm run lint
  npm run format
  ```

### 4. Testing

- Test your CLI or templates locally before submitting a PR.
- Ensure that new features do not break existing templates.

### 5. Adding Templates

- New templates go in `packages/create-servest/templates`.
- Follow the naming convention: `framework-variant-language`.
- Include a README explaining the template structure.

### 6. Communication

- For major features, open an **issue or discussion first** to align on design.
- Keep PRs small and focused whenever possible.

## Additional Guidelines

- Keep commits atomic and descriptive.
- Ensure all tests pass before submitting a PR.
- Follow the existing folder structure and naming conventions.
- Respect the established code style and formatting.

Thank you for helping make Servest better!
