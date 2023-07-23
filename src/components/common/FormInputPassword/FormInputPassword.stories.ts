import type { Meta, StoryObj } from '@storybook/vue3';

import FormInputPassword from './FormInputPassword.vue';

const meta = {
  component: FormInputPassword,
  tags: ['autodocs'],
} satisfies Meta<typeof FormInputPassword>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
