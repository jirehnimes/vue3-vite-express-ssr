import type { App } from 'vue';

/**
 * Registering global or common components dynamically in Vue 3.
 *
 * I wrote an article before last 2021:
 * https://dev.to/jirehnimes/how-to-register-global-components-in-vue-3-dynamically-3gl
 * Though the written article uses webpack that's why require.context will not work in this project.
 *
 * I just wrote a new article while doing this project:
 * https://dev.to/jirehnimes/how-to-register-global-components-in-vue-3-dynamically-in-2023-1d50
 * Here's a modified version:
 */

const importComponents = import.meta.glob('./**/*.vue');

export const registerComponents = async (app: App<Element>): Promise<void> => {
  for (const fileName of Object.keys(importComponents)) {
    const componentConfig = await importComponents[fileName]();
    const componentName = fileName
      .split('/')
      .pop()
      ?.replace(/\.\w+$/, '') as string;

    app.component(componentName, (componentConfig as any)?.default);
  }
};
