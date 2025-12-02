<template>
  <div>
    <h4 class="font-medium">Radio choices</h4>

    <div v-for="(opt, i) in field.options" :key="i" class="flex gap-2 mt-1">
      <input v-model="opt.title" class="border p-1 flex-1" placeholder="Label" />
      <input v-model.number="opt.value" class="border p-1 w-24" placeholder="Value" />
    </div>

    <button @click="addOption" class="text-blue-600 text-sm mt-2">
      Add option
    </button>
  </div>
</template>

<script setup>
const props = defineProps({ field: Object });

const addOption = () => {
  props.field.options.push({
    title: "",
    value: props.field.options.length + 1
  });
};
</script>
