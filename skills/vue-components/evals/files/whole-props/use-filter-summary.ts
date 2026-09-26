import { computed } from 'vue'

export interface FilterSource {
  primary: string;
  secondary: string;
  selectedKey: 'primary' | 'secondary';
}

export function useFilterSummary(source: FilterSource) {
  return computed(() => source[source.selectedKey])
}
