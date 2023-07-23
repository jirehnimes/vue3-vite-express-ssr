<template>
  <FormInput
    label="Password"
    placeholder="Enter your password"
    :type="inputType"
    @update:modelValue="(_value: any) => (_modelValue = _value)"
    :modelValue="_modelValue"
    :message="message"
    :message-type="messageType"
  >
    <template #buttonRight>
      <Button @click="toggleShow">
        <Icon :icon="buttonIcon" />
      </Button>
    </template>
  </FormInput>
</template>

<script setup lang="ts">
import { computed, onUpdated, ref } from 'vue';

type FormInputPasswordPropsType = {
  modelValue: any;
  message?: string[] | null;
  messageType?: string;
};

const emit = defineEmits(['update:modelValue']);
const props = defineProps<FormInputPasswordPropsType>();

const isShow = ref<boolean>(false);

const inputType = computed(() => (isShow.value === true ? 'text' : 'password'));
const buttonIcon = computed(() => (isShow.value === true ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'));
const _modelValue = computed({
  get() {
    return props.modelValue;
  },
  set(_value: any) {
    emit('update:modelValue', _value);
  },
});

const toggleShow = () => (isShow.value = !isShow.value);
</script>

<style scoped></style>
