<template>
  <div class="space-y-4">
    <div v-for="field in store.fields"
         :key="field.local_id"
         class="p-5 bg-white border rounded shadow-sm">

      <FieldEditor :field="field" />

      <button @click="store.removeField(field.local_id)"
              class="text-red-600 text-sm mt-2">
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
import { useSurveyStore } from '~/stores/survey'
import FieldEditor from "./FieldEditor.vue";

const store = useSurveyStore();
</script>
