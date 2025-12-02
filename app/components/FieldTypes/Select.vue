<template>
  <div>
    <h4 class="font-medium">Options</h4>

    <div v-for="(opt, i) in field.options" :key="i" class="flex gap-2 mt-1">
      <input class="border p-1 flex-1" v-model="opt.title" placeholder="Label" />
      <input class="border p-1 w-24" v-model.number="opt.value" placeholder="Value" />
    </div>

    <button class="text-blue-600 text-sm mt-2" @click="addOption">Add option</button>
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
