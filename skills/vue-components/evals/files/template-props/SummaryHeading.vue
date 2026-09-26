<template>
  <header :class="$style.component">
    <h2>{{ title }}</h2>
  </header>
</template>

<script setup lang="ts">
  interface Props {
    title: string;
  }

  defineProps<Props>()
</script>

<style module>
  .component {
    display: grid;
  }
</style>
