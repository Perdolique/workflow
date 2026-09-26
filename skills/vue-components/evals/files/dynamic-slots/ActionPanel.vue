<template>
  <section :class="$style.component">
    <header v-if="$slots.heading" :class="$style.heading">
      <slot name="heading" />
    </header>
    <slot />
    <footer v-if="$slots.actions || canRetry" :class="$style.actions">
      <slot name="actions">
        <span>Retry available</span>
      </slot>
    </footer>
  </section>
</template>

<script setup lang="ts">
  interface Props {
    canRetry?: boolean;
  }

  defineProps<Props>()
</script>

<style module>
  .component {
    display: grid;
  }

  .heading {
    font-weight: 600;
  }

  .actions {
    display: flex;
  }
</style>
