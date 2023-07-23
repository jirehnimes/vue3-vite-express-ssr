import { setup, type Preview } from '@storybook/vue3';

import { registerComponents } from '../src/components/common/components';

import '@/styles/app.sass';

setup((app) => {
  console.log('STORYBOOK HAHAHAHA');
  // await registerComponents(app);
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
