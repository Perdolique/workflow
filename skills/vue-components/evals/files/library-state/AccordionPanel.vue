<template>
  <LibraryAccordionItem :class="$style.component" value="details">
    <template #trigger="{ props }">
      <button :id="props.id" v-bind="props">
        Details
      </button>
    </template>
    <p>Reservation details</p>
  </LibraryAccordionItem>
</template>

<style module>
  .component {
    padding: 1rem;

    &:global([data-state='open']) {
      background: var(--surface-open);
    }
  }
</style>
