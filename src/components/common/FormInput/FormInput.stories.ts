import type { Meta, StoryObj } from '@storybook/vue3';

import FormInput from './FormInput.vue';

const meta = {
  component: FormInput,
  tags: ['autodocs'],
} satisfies Meta<typeof FormInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
