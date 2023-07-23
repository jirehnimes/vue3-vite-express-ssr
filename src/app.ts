import { createApp as createNonSSRApp, createSSRApp } from 'vue';

import App from './App.vue';
import { registerComponents } from './components/common/components';
import { router } from './router';

/**
 * "createApp" will be used for both client.ts and server.ts.
 * App will be rendered to the server-side then it will be sent to the client-side for hydration process.
 * Vue will run the same app on the client-side or in the browser, matches it with the server-side, then making it interactive.
 */
const createApp = async () => {
  const isSSR = typeof window === 'undefined';
  const app = (isSSR === true ? createSSRApp : createNonSSRApp)(App);

  await registerComponents(app);

  app.use(router(isSSR));

  return app;
};

export default createApp;
