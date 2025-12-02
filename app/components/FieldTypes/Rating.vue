<template>
  <div>
    <h4 class="font-medium">Rating scale</h4>
    <p class="text-sm text-gray-500">You can set min/max stars (default 1–5)</p>

    <div class="flex gap-4 mt-2">
      <label class="flex items-center gap-1">
        Min <input type="number" v-model.number="field.min" class="border p-1 w-20" />
      </label>

      <label class="flex items-center gap-1">
        Max <input type="number" v-model.number="field.max" class="border p-1 w-20" />
      </label>
    </div>

    <!-- Preview -->
    <div class="flex gap-2 mt-3">
      <span v-for="n in previewStars" :key="n" class="text-2xl text-gray-400">★</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({ field: Object });

if (!props.field.min) props.field.min = 1;
if (!props.field.max) props.field.max = 5;

const previewStars = computed(() =>
  Array.from({ length: props.field.max }, (_, i) => i + 1)
);
</script>
