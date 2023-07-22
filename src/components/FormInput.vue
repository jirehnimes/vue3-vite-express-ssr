<template>
  <div class="form-control">
    <input class="input" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  console.log('HELLO WORLD INPUT');
});
</script>

<style scoped></style>
