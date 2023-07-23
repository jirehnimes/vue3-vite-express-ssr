import type { Meta, StoryObj } from '@storybook/vue3';

import FormInputEmail from './FormInputEmail.vue';

const meta = {
  component: FormInputEmail,
  tags: ['autodocs'],
} satisfies Meta<typeof FormInputEmail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
