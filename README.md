# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

# Project Architecture

The project follows a feature-based architecture with shared modules and a centralized application layer.

```text
src
├── app
│   ├── config          # Environment configs, app settings
│   ├── http            # API client, interceptors, request utilities
│   ├── layouts         # Application layouts
│   ├── provider        # Global providers (Auth, Query, Theme, etc.)
│   ├── router          # Route definitions and routing logic
│   ├── styles          # Global styles and theme files
│   └── App.tsx         # Application entry component
│
├── features
│   ├── about
│   ├── application-form
│   ├── blogs
│   ├── career
│   ├── home
│   ├── jobsearch
│   ├── login
│   │   ├── api         # Login-specific API calls
│   │   ├── components  # Login UI components
│   │   ├── constants   # Login constants
│   │   ├── page        # Login pages/screens
│   │   └── types       # Login TypeScript types
│   │
│   └── projects
│
├── shared
│   ├── components      # Reusable UI components
│   ├── constants       # Shared constants
│   ├── hooks           # Custom React hooks
│   └── types           # Shared TypeScript types
│
└── main.tsx            # React application bootstrap
```

---

## Architecture Principles

### App Layer (`src/app`)

Contains application-wide concerns:

- Routing
- Providers
- API infrastructure
- Global styles
- Layouts
- Configuration

### Features Layer (`src/features`)

Each business module lives inside its own feature folder.

Example:

```text
features/login
├── api
├── components
├── constants
├── page
└── types
```

Feature modules should be self-contained and own their:

- Components
- API calls
- Types
- Constants
- Business logic

### Shared Layer (`src/shared`)

Contains reusable code that can be used across multiple features.

Examples:

- Buttons
- Inputs
- Modals
- Utility hooks
- Shared types
- Global constants

---

## Dependency Rules

✅ Allowed

```text
features → shared
features → app

shared → shared

app → shared
```

❌ Not Allowed

```text
feature-a → feature-b

shared → features

shared → app
```

If functionality is needed by multiple features, move it to the `shared` layer.

---

## Example Feature Structure

```text
features/login
├── api
│   └── auth.api.ts
│
├── components
│   ├── LoginForm.tsx
│   └── OTPInput.tsx
│
├── constants
│   └── auth.constants.ts
│
├── page
│   └── index.tsx
│
├── types
│   └── auth.types.ts
│
└── hooks
    └── useLogin.ts
```

This structure keeps features isolated, scalable, and easy to maintain as the application grows.
