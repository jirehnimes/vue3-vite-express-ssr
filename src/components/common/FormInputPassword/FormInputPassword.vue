<template>
  <FormInput
    label="Password"
    placeholder="Enter your password"
    :type="inputType"
    v-bind="props"
  >
    <template #buttonRight>
      <Button @click="toggleShow">
        <Icon :icon="buttonIcon" />
      </Button>
    </template>
  </FormInput>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

type FormInputPasswordPropsType = {
  message?: string[] | null;
  messageType?: string;
  isError?: boolean;
  isSuccess?: boolean;
};

const props = defineProps<FormInputPasswordPropsType>();

const isShow = ref<boolean>(false);

const inputType = computed(() => (isShow.value === true ? 'text' : 'password'));
const buttonIcon = computed(() => (isShow.value === true ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'));

const toggleShow = () => (isShow.value = !isShow.value);
</script>

<style scoped></style>
