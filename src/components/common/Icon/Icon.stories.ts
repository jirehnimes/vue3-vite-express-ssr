import type { Meta, StoryObj } from '@storybook/vue3';

import Icon from './Icon.vue';

const meta = {
  component: Icon,
  tags: ['autodocs'],
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
