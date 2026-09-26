<template>
  <slot v-for="item in items" :key="item.id" name="item" :item="item" />
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const items = ref([{
    id: 'first',
    createdAt: '2026-09-25T12:00:00Z'
  }])
</script>
