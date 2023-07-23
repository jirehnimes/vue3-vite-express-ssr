<template>
  <div class="field form-input">
    <!-- Form input label -->
    <label
      v-if="!!props.label"
      class="label is-small"
    >
      {{ label }}
    </label>

    <div class="field has-addons">
      <!-- Form input buttons -->
      <div
        v-if="$slots.buttonLeft"
        class="control"
      >
        <slot name="buttonLeft" />
      </div>

      <div class="control is-expanded">
        <!-- Form input -->
        <input
          :class="['input', inputStatusClass]"
          type="text"
          v-bind="$attrs"
          v-model="_modelValue"
        />

        <!-- Form input support message -->
        <div v-if="showMessages">
          <p
            v-for="(_message, index) of message"
            :key="index"
            :class="['help', messageType]"
          >
            {{ _message ?? "Something's wrong." }}
          </p>
        </div>
      </div>

      <!-- Form input buttons -->
      <div
        v-if="$slots.buttonRight"
        class="control"
      >
        <slot name="buttonRight" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { STATUS_CLASS_MAP } from '@/consts/status.const';

type FormInputPropsType = {
  modelValue: any;
  label?: string;
  message?: string[] | null;
  messageType?: string;
  isError?: boolean;
  isSuccess?: boolean;
};

// prettier-ignore
const emit = defineEmits([
  'update:modelValue',
  'click:buttonLeft',
  'click:buttonRight',
]);

const props = withDefaults(defineProps<FormInputPropsType>(), {
  label: undefined,
  message: null,
  messageType: 'is-danger',
  isError: false,
  isSuccess: false,
});

const inputStatusClass = computed(() => {
  if (props.isError === true) return STATUS_CLASS_MAP.error;
  if (props.isSuccess === true) return STATUS_CLASS_MAP.success;

  return '';
});
const showMessages = computed(() => !!props.message === true && Array.isArray(props.message));
const _modelValue = computed({
  get() {
    return props.modelValue;
  },
  set(_value: any) {
    emit('update:modelValue', _value);
  },
});
</script>

<style scoped lang="sass"></style>
