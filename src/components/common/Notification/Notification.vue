import Notification from './index';
<template>
  <div
    :class="['notification', showClass, statusClass]"
    v-bind="$attrs"
  >
    <button
      class="delete"
      @click="() => hide()"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { STATUS_CLASS_MAP } from '@/consts/status.const';

const isShow = ref<boolean>(false);
const statusClass = ref<(typeof STATUS_CLASS_MAP)[keyof typeof STATUS_CLASS_MAP]>(STATUS_CLASS_MAP.info);

const showClass = computed(() => isShow.value === false && 'hide');

const show = (type: keyof typeof STATUS_CLASS_MAP) => {
  isShow.value = true;
  statusClass.value = STATUS_CLASS_MAP[type];
};

const hide = (type?: keyof typeof STATUS_CLASS_MAP) => {
  isShow.value = false;
  statusClass.value = STATUS_CLASS_MAP.info;
};

defineExpose({
  show,
  hide,
});
</script>

<style scoped lang="sass">
.notification.hide
  display: none
</style>
