<template>
  <FormInput
    label="Password"
    :type="inputType"
    placeholder="Enter your password"
  >
    <template #buttonRight>
      <Button @click="toggleShow">
        {{ buttonLabel }}
      </Button>
    </template>
  </FormInput>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const isShow = ref<boolean>(false);

const inputType = computed(() => (isShow.value === true ? 'text' : 'password'));
const buttonLabel = computed(() => (isShow.value === true ? 'HIDE' : 'SHOW'));

const toggleShow = () => (isShow.value = !isShow.value);
</script>

<style scoped></style>
