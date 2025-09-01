# 📦 Changelog

All notable changes to **create-servest** will be documented here.

## [1.2.0] – 2025-09-01

### Added
- Support for multiple addons in a single `-a` or `--addons` command.
- Automatic package installation before running `servest init` when addons are specified.
- Improved CLI messages for successful dependency installation and addon execution.
- Non-interactive scaffolding support for templates and addons.

### Changed
- `servest.config.json` now correctly created inside the newly scaffolded project folder.
- Updated final outro message logic to hide redundant install commands if dependencies were already installed.
- Addons command now uses space-separated input instead of comma-separated input to allow multiple features.

### Fixed
- Fixed django-basic template registration issue.
- Fixed issue where only the first addon was executed.
- Minor fixes and cleanup in scaffolding logic.


---


## [1.1.0] – 2025-08-25
### Fixed
- Bug where `--template` argument was ignored in some package managers (npm works consistently now)
- Minor fixes and cleanup in scaffolding logic

---

## [1.0.0] – 2025-08-25
### Added
- Stable 1.0.0 release of **creative-servest** — production-ready
- CLI improvements for best developer experience (DX):
  - Interactive prompts for project name, framework, and variant selection
  - Non-interactive flags support: `--template`, `-a / --addons`, `--overwrite`
  - Addons integration: run `npx add servest@latest <addon>` automatically after scaffolding
- Full support for all templates:
  - Express templates: Basic JS/TS, MVC CommonJS/ESM/TS, Modular CommonJS/ESM/TS
  - Django Basic template
- Safe handling of existing directories with options: overwrite, ignore, or cancel
- Package name validation and auto-suggestion for valid npm names
- Final scaffolding messages optimized and consistent across package managers (`npm`, `pnpm`, `yarn`)
- Helper functions modularized (`copyDir`, `updatePackageName`, etc.) for maintainability

### Fixed
- Fixed incorrect template resolution with `--template` flag
- Fixed addon execution flow to continue on valid addons even if some fail
- Fixed issues with project folder naming and relative paths
- Corrected `pkgManager` detection for different environments

### Changed
- Folder name selection now occurs first for safer CLI flow
- Removed unnecessary display of custom commands for templates
- Reorganized CLI steps for consistent and intuitive user experience

---

## [0.1.2] – 2025-08-16
### Added
- Initial MVP release of **Servest**
- Added 8 Express templates:
  - Basic - JavaScript
  - Basic - TypeScript
  - MVC - CommonJS
  - MVC - ESM
  - MVC - TypeScript
  - Modular - CommonJS
  - Modular - ESM
  - Modular - TypeScript
- Added 1 Django template:
  - Django Basic
- CLI scaffolding fully functional for creating backend projects
- `checkDirectory` implemented to safely handle existing directories
