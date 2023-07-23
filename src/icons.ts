/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';
/* import specific icons */
import { faEye, faEyeSlash, faHome } from '@fortawesome/free-solid-svg-icons';
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { App } from 'vue';

/* add icons to the library */
library.add(faHome);
library.add(faEye);
library.add(faEyeSlash);

export const registerFontAwesome = (app: App<Element>): void => {
  app.component('FontAwesomeIcon', FontAwesomeIcon);
};
