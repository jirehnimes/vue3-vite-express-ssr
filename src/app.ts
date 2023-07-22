import { createSSRApp } from 'vue';

import App from './App.vue';

/**
 * "createApp" will be used for both client.ts and server.ts.
 * App will be rendered to the server-side then it will be sent to the client-side for hydration process.
 * Vue will run the same app on the client-side or in the browser, matches it with the server-side, then making it interactive.
 */
const createApp = () => createSSRApp(App);

export default createApp;
