<template>
  <section :class="$style.component">
    <h2>{{ props.heading }}</h2>
    <p>{{ label }}</p>
    <p>Changes: {{ changeCount }}</p>
  </section>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { useReservationLabel } from './use-reservation-label'

  interface Props {
    heading?: string;
    reservationId: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    heading: 'Reservation'
  })

  const changeCount = ref(0)
  const label = useReservationLabel(() => props.reservationId)

  watch(() => props.reservationId, () => {
    changeCount.value += 1
  })
</script>

<style module>
  .component {
    display: grid;
  }
</style>
