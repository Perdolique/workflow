<template>
  <div :class="$style.component">
    <DataTable :columns="columns" :rows="rows" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  interface Reservation {
    id: string;
    guestName: string;
  }

  interface Column {
    key: keyof Reservation;
    label: string;
    cellClass?: string;
  }

  const rows = ref<Reservation[]>([])

  const columns: Column[] = [{
    key: 'guestName',
    label: 'Guest name'
  }]
</script>

<style module>
  .component {
    display: block;
  }

  .guestNameCell {
    font-weight: 600;
  }
</style>
