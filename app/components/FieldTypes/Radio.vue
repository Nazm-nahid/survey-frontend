<template>
  <div>
    <h4 class="font-medium">Radio choices</h4>

    <div v-for="(opt, i) in field.options" :key="i" class="flex gap-2 mt-1 rounded shadow-sm">
      <input v-model="opt.title" class="border border-gray-200 rounded p-1 m-1 flex-1" placeholder="Label" />
      <input v-model="opt.value" class="border border-gray-200 rounded p-1 m-1 w-24" placeholder="Value" />
      <button @click="removeOption(i)" class="text-red-600 hover:bg-red-100 px-2 rounded">×</button>
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

const removeOption = (index) => {
  props.field.options.splice(index, 1);
};
</script>
