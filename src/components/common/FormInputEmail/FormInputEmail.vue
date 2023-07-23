<template>
  <FormInput
    label="Email Address"
    placeholder="sample@gmail.com"
    v-bind="props"
  />
</template>

<script setup lang="ts">
type FormInputEmailPropsType = {
  message?: string[] | null;
  messageType?: string;
  isError?: boolean;
  isSuccess?: boolean;
};

const props = defineProps<FormInputEmailPropsType>();
</script>

<style scoped></style>
