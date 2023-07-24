# vue3-vite-express-ssr

A case-study application that implements SSR using Vue 3, Vite, Express, and Typescript.
This application can still run as a SPA.

## Project Setup

### Install dependencies

```sh
npm install
```

### Create an .env file

```
# .env

APP_ENVIRONMENT=local
APP_CLIENT_PORT=3001
APP_SERVER_PORT=3000
```

### Compile and Hot-Reload for Development SPA

```sh
npm run dev:client
```

Access the app using `http://localhost:3001`.

### Compile and Hot-Reload for Development SSR

```sh
npm run dev:server
```

Access the app using `http://localhost:3000`.

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

Sample test file is located at `src/server/services/form.service.test.ts`.

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

---

### Additionals:

While doing this project, I created a new version of my article regarding registering global components in Vue 3. Check the articles:

Updated: [How to register global components in Vue 3 dynamically in 2023?](https://dev.to/jirehnimes/how-to-register-global-components-in-vue-3-dynamically-in-2023-1d50)

Previous: [How to register global components in Vue 3 dynamically?](https://dev.to/jirehnimes/how-to-register-global-components-in-vue-3-dynamically-3gl)

---

### To Do:

- Finish setup for production scenario.
- Project cleanup.
- Finish component stories.
- Integrate RxDB for sample database integration in server-side.

---

### References:

- [[Vue 3] Server-Side Rendering (SSR)](https://vuejs.org/guide/scaling-up/ssr.html)
- [[Vite] Server-Side Rendering](https://vitejs.dev/guide/ssr.html)
- [[dev.to] My first time implementing SSR using Vue 3 and Vite.](https://dev.to/akbarnafisa/my-first-time-implementing-ssr-using-vue-3-and-vite-e06)
