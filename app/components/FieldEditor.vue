<template>
  <div class="space-y-4">

    <input class="w-full border p-2"
           v-model="field.title"
           placeholder="Question title" />

    <textarea v-model="field.description"
              class="w-full border p-2"
              placeholder="Description (optional)"></textarea>

    <component :is="componentForType" :field="field" />

    <label class="flex items-center gap-2">
      <input type="checkbox" v-model="field.is_required" />
      Required
    </label>

    <!-- Conditions -->
    <div class="bg-gray-50 p-3 rounded border">
      <h4 class="font-medium mb-2">Conditions</h4>

      <div v-for="(cond, i) in field.conditions"
           :key="i"
           class="text-xs bg-white border p-2 rounded mb-1">
        {{ cond }}
      </div>

      <div class="flex gap-2 mt-2">
        <input v-model="newCondition"
               placeholder="if @value == 5 visible -> 3,4,5"
               class="flex-1 border p-1 text-sm" />
        <button class="text-blue-600 text-sm" @click="addCondition">
          Add
        </button>
      </div>
    </div>

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
