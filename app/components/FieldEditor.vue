<template>
  <div class="space-y-4">

    <input class="w-full rounded-lg shadow p-2"
           v-model="field.title"
           placeholder="Question title" />

    <textarea v-model="field.description"
              class="w-full rounded-lg shadow p-2"
              placeholder="Description (optional)"></textarea>

    <div class="flex justify-between">
      <label class="flex items-center gap-2 text-gray-500">
        <input type="checkbox" v-model="field.is_required" />
        Required
      </label>
      <label class="flex text-xs items-center gap-2 bg-red-200 shadow rounded-lg px-2 text-gray-500">
        {{field.type == 'select' ? 'Checkbox' : (field.type.replace(/_/g, ' ')).replace(/^./, c => c.toUpperCase())}}
      </label>
    </div>

    <component :is="componentForType" :field="field" />
    

    <!-- Conditions -->
    <!-- <div class="bg-gray-50 p-3 rounded-lg shadow">
      <h4 class="font-medium mb-2">Conditions</h4>

      <div v-for="(cond, i) in field.conditions"
           :key="i"
           class="text-xs bg-white rounded-lg shadow p-2 mb-1">
        {{ cond }}
      </div>

      <div class="flex gap-2 mt-2">
        <input v-model="newCondition"
               placeholder="if @value == 5 visible -> 3,4,5"
               class="flex-1 rounded-lg shadow p-1 text-sm" />
        <button class="btn text-blue-600 text-sm" @click="addCondition">
          Add
        </button>
      </div>
    </div> -->

  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import ShortAnswer from "./FieldTypes/ShortAnswer.vue";
import Select from "./FieldTypes/Select.vue";
import Checkbox from "./FieldTypes/Checkbox.vue";
import Radio from "./FieldTypes/Radio.vue";
import Rating from "./FieldTypes/Rating.vue";

const props = defineProps({ field: Object });
const newCondition = ref("");

const componentForType = computed(() => ({
  short_text: ShortAnswer,
  select: Select,
  checkbox: Checkbox,
  radio: Radio,
  rating: Rating,
}[props.field.type]));

const addCondition = () => {
  if (!newCondition.value) return;
  props.field.conditions.push(newCondition.value);
  newCondition.value = "";
};
</script>
