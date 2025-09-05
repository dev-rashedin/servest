# f-fileName Addon

The `f-<name>` addon in **Servest** is used to quickly scaffold feature-specific files and folders in your project.  
This helps maintain consistency across projects and speeds up development.

---

## How It Works

When you run:

```bash
npx servest@latest add f-auth
```

Servest will:

1. Detect your **base directory** using this priority:
   - `src/app` → if it exists
   - `src` → if no `app` folder
   - project root → if no `src` folder

2. Scaffold files based on the **architecture** set in your `servest.config.json`.

---

## Architecture-Specific Behavior

### MVC Architecture

- Files are created inside `controllers`, `models`, `routes`, etc.
- Example (`f-auth`):

```
src/app/
  controllers/
    auth.controller.ts
  models/
    auth.model.ts
  routes/
    auth.route.ts
```

### Modular Architecture

- A dedicated folder is created under `modules/<feature>`.
- Example (`f-auth`):

```
src/app/modules/auth/
  auth.controller.ts
  auth.model.ts
  auth.route.ts
```

### Basic Architecture

- A single file is created at the base directory.
- Example (`f-auth`):

```
src/app/
  auth.ts
```

---

## Notes

- File extensions depend on your chosen language (`.ts` or `.js`).
- If files already exist, Servest skips them and shows a message.
- Servest ensures that the project structure aligns with your configuration.

---

## Why Use f-fileName?

- **Consistency** → keeps all features structured the same way.
- **Flexibility** → works across MVC, modular, and basic architectures.
- **Smart defaults** → auto-detects the right folder (`src/app`, `src`, or root).

---

\_Last updated: 2025-09-05 15:35:19
