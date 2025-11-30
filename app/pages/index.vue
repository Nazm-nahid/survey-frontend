<template>
  <div class="p-5">
    <h1 class="text-2xl mb-4">Counter: {{ counter.count }}</h1>
    <button @click="counter.increment" class="px-4 py-2 bg-blue-500 text-white rounded">
      Increment
    </button>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '~/stores/counter'

// Initialize the store
const counter = useCounterStore()
</script>
