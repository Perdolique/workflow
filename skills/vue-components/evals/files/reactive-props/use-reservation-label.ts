import { computed, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

export function useReservationLabel(reservationId: MaybeRefOrGetter<string>) {
  return computed(() => {
    const id = toValue(reservationId)

    return `Reservation ${id}`
  })
}
