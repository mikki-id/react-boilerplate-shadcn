# React + Vite Boilerplate with shadcn/ui

**A high-scale, feature-oriented foundation for modern web applications**. Built with **Vite**, **TypeScript**, **TanStack Query**, and **shadcn/ui**, this boilerplate is structured for professional teams where maintainability is a requirement, not an option.

## ✨ Tech Stack

- ⚡ **Vite** – lightning-fast bundler
- ⚛️ **React 19.2 + TypeScript** – latest React features with the React Compiler
- 🎨 **shadcn/ui** – atomic UI components
- 🗃️ **Redux Toolkit** – client-state (auth session, UI shell)
- 🔁 **TanStack Query** – server-state caching & mutations
- 🌐 **Axios** – centralized API handling
- 🔐 **Feature-based routing**
- 🧩 **Reusable UI & shared components**

## 🏗️ Architecture Philosophy

Most projects collapse under their own weight because they group files by **technical type** (e.g., all hooks in one folder, all components in another). This leads to:
- **Scattered logic**: Business logic for a single feature is spread across multiple folders.
- **Tight coupling**: Changes in one area ripple unpredictably through the codebase.
- **Scaling pain**: Adding new features becomes a game of "Where does this go?"

This boilerplate enforces **Feature-Based Architecture** to solve these problems.

### 🏆 Why Feature-Based Wins
| Benefit | Description |
| :--- | :--- |
| **Encapsulation** | Logic for `auth` or `settings` is isolated. Changes in one cannot break the other. |
| **Scalability** | Add 50+ features without the `src/components` folder becoming unmanageable. |
| **Speed** | Developers find everything related to a domain in one folder. No hunting across the tree. |
| **Safety** | Removing a feature is as simple as deleting one folder. |

## 📁 Folder Structure

```
├── components/
│   ├── ui/         # Atomic shadcn components (No business logic)
│   └── shared/     # App-specific reusable components (Modals, Tables)
├── features/       # Modular business logic (Auth, Settings, etc.)
├── pages/          # Route-level composition layer (Thin wrappers, no business logic)
├── config/         # API Clients, TanStack keys, and Env config
├── router/         # Split routing (Admin, Auth, Public)
├── hooks/          # Domain-agnostic hooks (e.g., use-debounce)
├── types/          # Global API and Model interfaces
└── utils/          # Browser helpers (LocalStorage, Icon mapping)
```

### Feature folder example:
```
features/
└── auth/
    ├── components/    # Feature-specific UI
    ├── hooks/         # Feature hooks (useLogin)
    ├── api.ts         # Axios requests
    └── types.ts       # Interfaces & types
```

## High-Level Breakdown

- `features/`: The heart of the app. Contains feature-specific components, hooks, and API logic. Features should not depend on other features "sideways."
- `config/`: Centralizes setup logic. Includes `axios-instance.ts` for interceptors and tanstack-keys.ts for standardized caching.
- `pages/`: These are "thin" wrappers. They handle layout and compose various features but contain zero business logic.
- `router/`: Explicitly split into `auth-routes.tsx`, `admin-routes.tsx`, etc., to make access control readable.

## 🔄 Application Flow

User Action
   → Page (layout & composition)
   → Feature Hook (business logic)
   → API Client
   → Axios Instance (interceptors, tokens, error handling)
   → Backend Response
   → TanStack Query Cache
   → Feature Layer
   → UI Update


## 🌍 API & Data Handling
This boilerplate uses a centralized API layer to ensure predictable data flow:

- `axios-instance.ts`: Pre-configured with interceptors for token injection and error handling.

- `api-endpoints.ts`: The single source of truth for all backend URLs.

- `tanstack-keys.ts`: Centralized query keys to prevent cache-busting bugs and duplication.

- `api-types.ts`: Contract-first development with strict TypeScript interfaces for all responses.

## 🔐 Environment Management
This boilerplate is configured to handle multiple environments out-of-the-box using Vite's built-in mode detection. This eliminates the manual headache of switching URLs between local development and live production.

- `.env.development`: Automatically loaded during `npm run dev`. Use this for your local or staging API URLs.
- `.env.production`: Automatically loaded during `npm run build`. Use this for your live production endpoints.
- `.env.example`: A template file containing all required keys. Always keep this updated for new collaborators.

**Note**: Never commit `.env.development` or `.env.production` to version control. They are already included in the `.gitignore` to protect your secrets.

### Accessing Environment Variables
In your code, access environment variables using Vite’s built-in `import.meta.env`:

```typescript
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
// or using config helper
import { env } from "@/config/env";
const apiBaseUrl = env.VITE_API_BASE_URL;
```

## 🎯 Who This Boilerplate Is For

- Developers building **production-grade applications**

- Teams that care about **structure and long-term maintainability**

- Projects expected to **scale beyond MVP**

- Engineers who prefer **clear boundaries** over scattered logic

## 🏁 Getting Started

### 1. Clone & Install
```
git clone <your-repo-link>
cd <your-repo-name>
npm install
```

### 2. Environment Setup
Create your local environment files based on the example.
```
cp .env.example .env.development
cp .env.example .env.production
```

### 3. Start Development
`npm run dev`

### 4. Build for Production
`npm run build`

## 🤖 MCP (Model Context Protocol)

This project includes a pre-configured set of **MCP servers** to supercharge Claude Code's capabilities. When you open this project in **Claude Code Desktop** or the **VS Code extension**, these tools are automatically available.

MCP servers are configured in [`.claude/settings.json`](./.claude/settings.json).

### 🧰 Configured MCP Servers

| MCP Server | Tool | Purpose |
|---|---|---|
| **filesystem** | `@modelcontextprotocol/server-filesystem` | Safe file access to the project directory |
| **browser** | `@browsermcp/mcp` | Headless browser automation for testing & screenshots |
| **playwright** | `@playwright/mcp` | Playwright-powered UI interaction & assertions |
| **shadcn** | `shadcn-mcp` | Add, manage, and discover shadcn/ui components |
| **context7** | `@upstash/context7-mcp` | Long-term context & memory across conversations |
| **fetch** | `mcp-server-fetch-typescript` | Web fetching & API exploration |
| **memory** | `@modelcontextprotocol/server-memory` | Persistent knowledge graph for the AI assistant |
| **sequential-thinking** | `@modelcontextprotocol/server-sequential-thinking` | Structured multi-step reasoning |
| **terminal** | `@nichoth/mcp-server-terminal` | Terminal command execution |

> **Note:** The GitHub MCP server (`@modelcontextprotocol/server-github`) requires a `GITHUB_PERSONAL_ACCESS_TOKEN` environment variable. To enable it, set the token and add it to `.claude/settings.json`.

### 🏛️ State Management — Clean Architecture

This boilerplate enforces a **clean separation of concerns** between two state layers:

| Layer | Tool | Responsibility |
|---|---|---|
| **Client State** | **Redux Toolkit** | Auth session, UI state (sidebar, theme, modals, toasts) |
| **Server State** | **TanStack Query** | API data fetching, caching, revalidation, mutations |

### Why Redux Toolkit + TanStack Query Together?

- **Redux Toolkit** handles what lives on the client: the JWT token, the current user object, sidebar open/close, theme preference, toast queue. This state is synchronous, immediately available, and drives the app shell.
- **TanStack Query** handles everything from the server: API GET/POST/PUT/DELETE, background refetching, optimistic updates, cache invalidation. It eliminates reducers for server data.
- The two never overlap — you won't find API data in Redux or UI state in TanStack Query.

### 📁 Store Structure

```
src/store/
├── index.ts              # configureStore — combines all slices
├── hooks.ts              # Typed useAppDispatch / useAppSelector
├── slices/
│   ├── authSlice.ts      # Auth credentials, user, hydration status
│   └── uiSlice.ts        # Sidebar, theme, toasts, modal state
├── hooks/
│   └── useAuthHydration.ts  # Boot-time token restore from localStorage
└── middleware/
    └── authMiddleware.ts  # Dispatch clearCredentials on 401 from RTK async actions
```

### 🧩 Slices

**authSlice** — JWT token + user info
```typescript
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setCredentials,
  clearCredentials,
  selectIsAuthenticated,
  selectCurrentUser,
} from "@/store/slices/authSlice";

const dispatch = useAppDispatch();
const isAuth = useAppSelector(selectIsAuthenticated);
const user = useAppSelector(selectCurrentUser);

// After successful login
dispatch(setCredentials({ accessToken, user }));
```

**uiSlice** — UI shell state
```typescript
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleSidebar, setTheme, selectSidebarOpen } from "@/store/slices/uiSlice";

const dispatch = useAppDispatch();
const sidebarOpen = useAppSelector(selectSidebarOpen);

dispatch(toggleSidebar());
dispatch(setTheme("dark"));
```

### 🔐 Auth Flow — Redux + TanStack Query Handshake

1. **Login API call** → handled by `usePostMutation` (TanStack Query)
2. On success → persist token to `localStorage`, then dispatch `setCredentials({ accessToken, user })` to Redux
3. Redux becomes the single source of truth for the token
4. **Axios interceptor** reads the token from `store.getState()` for every request
5. On **401 response** → `api-client.ts` dispatches `clearCredentials()` → all subscribers react instantly
6. On **app boot** → `useAuthHydration` reads token from `localStorage`, dispatches `hydrate()` to restore session

```typescript
// Example: Login component
import { usePostMutation } from "@/hooks/use-tanstack-query";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";
import { setLocalStorage } from "@/utils/storage-utils";
import { env } from "@/config/env";
import type { LoginApiResponse } from "@/features/auth/types/api-types";

const loginMutation = usePostMutation<LoginFormData, LoginApiResponse>(
  "login",
  "/auth/login",
);

const handleSubmit = async (data: LoginFormData) => {
  const response = await loginMutation.mutateAsync(data);

  // Persist token to localStorage for boot-time hydration
  setLocalStorage(env.VITE_AUTH_TOKEN_SECRET, response.accessToken);

  // Dispatch to Redux — single source of truth
  dispatch(setCredentials({
    accessToken: response.accessToken,
    user: response.user,
  }));
};
```

### ✅ Best Practices

1. **Typed hooks only** — always import `useAppDispatch` and `useAppSelector` from `@/store/hooks`, never the raw Redux hooks.
2. **Server data stays in TanStack Query** — do not create Redux slices for API entities. Use TanStack Query's cache instead.
3. **Selectors are colocated** — each slice file exports its own selectors alongside the reducer.
4. **Slices are flat and small** — one concern per slice. Avoid deeply nested state.
5. **RTK Query is intentionally excluded** — TanStack Query already handles server state; adding RTK Query would create two competing server-cache layers.

## 🧩 UI Registries

This project is configured with **third-party shadcn/ui registries** so you can install components from popular design ecosystems using the standard `shadcn add` workflow. Registries are defined in [`components.json`](./components.json).

### 📦 Available Registries

| Registry | URL | Description |
|---|---|---|
| `@originui` | [originui.com](https://originui.com) | Modern UI components & blocks |
| `@magicui` | [magicui.design](https://magicui.design) | Animated & magic UI components |
| `@motion-primitives` | [motion-primitives.com](https://motion-primitives.com) | Motion & animation primitives |
| `@react-bits` | [reactbits.dev](https://reactbits.dev) | Text animations, particles, and more |
| `@21st.dev` | [21st.dev](https://21st.dev) | Community-driven shadcn components |
| `@reui` | [reui.io](https://reui.io) | Reusable UI component collection |
| `@basecn` | [basecn.dev](https://basecn.dev) | Base components & templates |
| `@formcn` | [formcn.dev](https://formcn.dev) | Form components & builders |
| `@shadcnblocks` | [shadcnblocks.com](https://shadcnblocks.com) | Pre-built page blocks & sections |
| `@tweakcn` | [tweakcn.com](https://tweakcn.com) | Themed component variants |

### Usage

Install a component from any registry just like a local shadcn component:

```bash
# From OriginUI
npx shadcn add "@originui/button"

# From MagicUI
npx shadcn add "@magicui/magic-card"

# From Motion Primitives
npx shadcn add "@motion-primitives/accordion"

# From shadcnblocks
npx shadcn add "@shadcnblocks/hero-section"
```

> **Note:** Components are downloaded from the remote registry and placed in your `components/ui/` directory — no extra dependencies or build steps required.

## 🔧 Adding a New MCP Server

To add a custom MCP server, edit `.claude/settings.json`:

```json
{
  "mcpServers": {
    "my-server": {
      "command": "npx",
      "args": ["-y", "my-mcp-server-package"]
    }
  }
}
```

MCP servers run on `npx` start-up and require no manual installation.

## 🤝 Contributing
Contributions are welcome. Please read the [CONTRIBUTING.md](./CONTRIBUTING.md) file before opening a pull request.

### How to Contribute
1. **Fork the repository** and create a new branch.
2. **Follow the project’s coding style** (TypeScript, Prettier, ESLint).
3. **Write clear, descriptive commit messages** (e.g., `feat: add dark mode support`, `fix: resolve login API bug`).
4. **Test your changes** to ensure they work as expected.
5. **Open a Pull Request (PR)** with a detailed description of your changes.

For major changes or new features, please open an issue first to discuss the proposed changes.

## 📜 License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/zohair636/react-boilerplate-shadcn/blob/main/LICENSE) file for details.

## 📌 Final Note
This boilerplate prioritizes **clarity over cleverness**. If your app grows, this structure grows with it. Built for predictable growth and long-term maintainability.