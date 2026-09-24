<template>
  <main :class="$style.component">
    <button :disabled="pending" @click="refresh">
      Refresh
    </button>
    <ul>
      <li v-for="reservation in reservations" :key="reservation.id">
        {{ reservation.id }}
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  interface Reservation {
    id: string;
  }

  const { data, pending, refresh } = await useAsyncData('reservations', () => $fetch<Reservation[]>('/api/reservations'))
  const reservations = computed(() => data.value ?? [])
</script>

<style module>
  .component {
    display: block;
  }
</style>
