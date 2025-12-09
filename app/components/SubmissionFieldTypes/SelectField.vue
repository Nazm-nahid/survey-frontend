<script setup>
import { ref, watch } from "vue";

const { field, setAnswer } = defineProps({
  field: Object,
  setAnswer: Function
});

const open = ref(false);
const selectedOption = ref(null);

function choose(opt) {
  selectedOption.value = opt;
  open.value = false;
  setAnswer(field.id, opt.title, field.type);
}

// Close dropdown if clicked outside
const dropdownRef = ref(null);
document.addEventListener("click", (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    open.value = false;
  }
});
</script>

<template>
  <div class="relative w-full" ref="dropdownRef">
    <!-- Dropdown Header -->
    <div
      @click="open = !open"
      class="w-full border border-gray-300 rounded-md p-2 bg-white cursor-pointer flex justify-between items-center hover:ring-1 hover:ring-blue-200"
    >
      <span class="text-black">
        {{ selectedOption?.title || "Please select" }}
      </span>
      <span class="text-gray-500">⌄</span>
    </div>

    <!-- Dropdown Options -->
    <div
      v-if="open"
      class="absolute z-50 w-full bg-white border border-gray-300 rounded-md shadow mt-1 max-h-60 overflow-auto"
    >
      <div
        v-for="opt in field.options"
        :key="opt.id"
        @click="choose(opt)"
        class="p-2 cursor-pointer hover:bg-gray-100 text-black"
        :class="{ 'font-bold bg-gray-50': selectedOption?.title === opt.title }"
      >
        {{ opt.title }}
      </div>
    </div>
  </div>
</template>
