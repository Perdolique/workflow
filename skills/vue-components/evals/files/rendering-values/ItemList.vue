<template>
  <section :class="$style.component">
    <button :disabled="isSaving || items.length === 0" @click="isSaving = true">
      Save
    </button>
    <ol>
      <li v-for="(item, index) in items" :key="item.id">
        {{ index + 1 }}. {{ item.name.trim() }}
      </li>
    </ol>
    <ItemFeed>
      <template #item="{ item }">
        <time>{{ item.createdAt.slice(0, 10) }}</time>
      </template>
    </ItemFeed>
  </section>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import ItemFeed from './ItemFeed.vue'

  interface Item {
    id: string;
    name: string;
  }

  interface Props {
    items: Item[];
  }

  const { items } = defineProps<Props>()
  const isSaving = ref(false)
</script>

<style module>
  .component {
    display: grid;
  }
</style>
