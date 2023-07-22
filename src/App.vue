<template>
  <RouterView />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';

import FormInput from './components/FormInput.vue';

const count = ref<number>(0);
</script>

<style lang="sass">
@import './styles/app'
</style>
