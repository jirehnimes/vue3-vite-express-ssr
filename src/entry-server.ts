import { renderToString } from 'vue/server-renderer';

import createApp from './app';

export const render = async () => {
  /**
   * Creating the Vue app to the server side and rendering it to HTML string.
   */
  const app = await createApp();

  return await renderToString(app);
};
