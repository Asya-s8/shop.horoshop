# shop.horoshop

Playwright test framework for the [Horoshop demo store](https://shop700415.horoshop.ua/).

Covers UI flows (Page Object Model) and API checks (Axios).

## Project structure

```
shop.horoshop/
├── playwright.config.ts
├── package.json
├── src/
│   ├── base/
│   │   ├── base.page.ts      # Shared base for UI pages
│   │   ├── http.client.ts    # Shared Axios client
│   │   ├── session.ts        # Cookies, challenge, CSRF
│   │   └── form.ts           # Form body / auth headers
│   ├── proveders/
│   │   └── url.provider.ts   # Base URL and endpoint helpers
│   ├── dto/                  # DTOs + Chance factories
│   │   ├── sign-up.*
│   │   ├── profile.*
│   │   ├── catalog.dto.ts
│   │   └── checkout.*
│   ├── api/                  # Axios API clients
│   │   ├── auth.api.ts       # POST /security/sign_up/
│   │   ├── profile.api.ts    # POST /profile/save/
│   │   └── catalog.api.ts    # GET /electronics/
│   └── ui/
│       └── pages/            # Page Objects
│           ├── home.page.ts
│           ├── electronics.page.ts
│           ├── product.page.ts
│           ├── cart.page.ts
│           ├── checkout.page.ts
│           └── order-success.page.ts
└── tests/
    ├── api/
    │   ├── sign-up.spec.ts
    │   ├── profile-save.spec.ts
    │   └── catalog.spec.ts
    └── ui/
        ├── home.spec.ts
        ├── cart.spec.ts
        ├── in-cart.spec.ts
        └── checkout.spec.ts
```

| Area | Purpose |
|------|---------|
| `src/base` | Shared foundation: `BasePage`, HTTP client, session/CSRF, form helpers |
| `src/api` | Axios clients for signup, profile save, catalog |
| `src/ui/pages` | Page Objects for store UI |
| `src/dto` | Request/response types and Chance-based factories |
| `src/proveders` | Central URL provider |
| `tests/api` | `POST /security/sign_up/`, `POST /profile/save/`, `GET /electronics/` |
| `tests/ui` | Home, cart, in-cart, checkout scenarios |

## Prerequisites

- Node.js (LTS recommended)
- Google Chrome (UI project uses `channel: 'chrome'`)

## Setup

```bash
npm install
npx playwright install
```

## Running tests

```bash
# All tests (API + UI)
npm test

# API only
npm run test:api

# UI / e2e only
npm run test:e2e

# UI mode
npm run test:ui

# Headed browser
npm run test:headed

# HTML report
npm run report
```

### Run a single file

```bash
npx playwright test tests/api/sign-up.spec.ts --project=api
npx playwright test tests/ui/checkout.spec.ts --project=chromium
```
