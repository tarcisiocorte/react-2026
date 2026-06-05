# React 2026

Modern React project built with TypeScript, Vite, Jest, ESLint, Husky, and clean architecture boundaries.

This repository is a 2026 refresh of the early steps from the `clean-react` project. The current code covers the project foundation, the first domain use case, and the first data-layer implementation for remote authentication.

## Tech Stack

- React 19
- Vite 8
- TypeScript 6
- Jest 30 with SWC
- ESLint 10 with flat config
- Husky 9 and lint-staged
- `@faker-js/faker` for test data

## Current Features

- React application shell rendered with `createRoot` and `StrictMode`.
- Global CSS entry point through Vite.
- Domain model for an authenticated account.
- Domain contract for the authentication use case.
- Data-layer `RemoteAuthentication` implementation.
- HTTP POST client protocol.
- Unit test proving `RemoteAuthentication` calls `HttpPostClient` with the expected URL.
- Git hooks for staged linting and pre-push test coverage.

## Project Structure

```text
src/
  app.tsx
  main.tsx
  styles.css
  vite-env.d.ts
  domain/
    models/
      account-model.ts
    usecases/
      authentication.ts
  data/
    protocols/
      http/
        http-post-client.ts
    test/
      mock-http-client.ts
    usecases/
      authentication/
        remote-authentication.ts
        remote-authentication.spec.ts
```

## Architecture Notes

The code is organized around clean architecture layers.

`domain/` contains business-facing contracts and models. It does not depend on React, HTTP clients, storage, or framework code.

`data/` contains implementations that coordinate external dependencies through protocols. The current `RemoteAuthentication` class receives an HTTP client through its constructor, which keeps the use case testable and decoupled from any concrete HTTP library.

`src/app.tsx` and `src/main.tsx` are the current React application entry points. They are intentionally small while the domain and data layers are being built.

## Implemented Domain Code

`src/domain/models/account-model.ts`

```ts
export type AccountModel = {
  accessToken: string
}
```

`src/domain/usecases/authentication.ts`

```ts
export type AuthenticationParams = {
  email: string
  password: string
}

export interface Authentication {
  auth: (params: AuthenticationParams) => Promise<AccountModel>
}
```

The authentication use case accepts an email and password and resolves an account model.

## Implemented Data Code

`src/data/protocols/http/http-post-client.ts`

```ts
export type HttpPostParams = {
  url: string
}

export interface HttpPostClient {
  post: (params: HttpPostParams) => Promise<void>
}
```

`src/data/usecases/authentication/remote-authentication.ts`

```ts
export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth (): Promise<void> {
    await this.httpPostClient.post({
      url: this.url
    })
  }
}
```

The current remote authentication implementation only sends the configured URL to the injected HTTP POST client. Request body handling, response mapping, and error handling are intentionally not implemented yet.

## Tests

The current unit test is:

`src/data/usecases/authentication/remote-authentication.spec.ts`

It verifies that `RemoteAuthentication.auth()` calls `HttpPostClient.post()` with the correct URL.

The test uses:

- `HttpPostClientSpy` from `src/data/test/mock-http-client.ts`
- `makeSut()` factory for test setup
- `@faker-js/faker` for generated URL values

## Commands

Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

Run tests:

```sh
npm test
```

Run tests with coverage:

```sh
npm run test:ci
```

Run lint:

```sh
npm run lint
```

Build for production:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

## Git Hooks

Husky is configured with:

- `pre-commit`: runs `lint-staged`
- `pre-push`: runs `npm run test:ci`

`lint-staged` currently runs ESLint with autofix and related Jest tests for staged TypeScript files under `src/`.

## Path Aliases

TypeScript, Jest, and Vite are configured with these aliases:

- `data/*` -> `src/data/*`
- `domain/*` -> `src/domain/*`

This allows imports such as:

```ts
import type { HttpPostClient } from 'data/protocols/http/http-post-client'
```

## Current Status

The repository currently represents the foundation and first authentication slice:

- Tooling is configured.
- React app shell is running.
- Authentication domain contract exists.
- Remote authentication calls an injected HTTP POST client with the correct URL.
- Tests, lint, and build pass.

Next likely implementation steps are adding request body handling, HTTP status handling, account mapping, and a concrete HTTP client.
