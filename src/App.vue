<script setup lang="ts">
import { ref } from 'vue';

const count = ref<number>(0);
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
