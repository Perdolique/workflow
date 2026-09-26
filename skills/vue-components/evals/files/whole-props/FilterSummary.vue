<template>
  <section :class="$style.component">
    <h2>{{ props.title }}</h2>
    <p>{{ summary }}</p>
  </section>
</template>

<script setup lang="ts">
  import { useFilterSummary } from './use-filter-summary'
  import type { FilterSource } from './use-filter-summary'

  interface Props extends FilterSource {
    title: string;
  }

  const props = defineProps<Props>()
  const summary = useFilterSummary(props)
</script>

<style module>
  .component {
    display: grid;
  }
</style>
