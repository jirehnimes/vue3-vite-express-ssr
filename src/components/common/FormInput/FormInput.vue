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
          class="input"
          type="text"
          v-bind="$attrs"
          v-model="_modelValue"
        />

        <!-- Form input support message -->
        <div v-if="!!message && Array.isArray(message)">
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

type FormInputPropsType = {
  modelValue: any;
  label?: string;
  message?: string[] | null;
  messageType?: string;
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
});

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
