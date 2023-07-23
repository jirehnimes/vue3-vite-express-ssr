<template>
  <section
    id="page-home"
    class="section"
  >
    <div class="container">
      <HomeForm />
    </div>
  </section>
</template>

<script setup lang="ts">
import HomeForm from '@/components/home/HomeForm.vue';
</script>

<style scoped lang="sass">
#page-home
  .container
    max-width: 360px
</style>
