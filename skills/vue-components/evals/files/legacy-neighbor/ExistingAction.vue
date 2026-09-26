<template>
  <button
    :class="[$style.component, $style.active]"
    :data-selected="props.selected"
    :disabled="props.saving"
    @click="emit('confirm')"
  >
    {{ props.label }}
  </button>
</template>

<script setup lang="ts">
  interface Props {
    label?: string;
    saving?: boolean;
    selected?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    label: 'Confirm'
  })

  const emit = defineEmits<{ confirm: [] }>()
</script>

<style module>
  .component {
    font: inherit;
  }

  .active {
    font-weight: 600;
  }
</style>
