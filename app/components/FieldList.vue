<template>
  <div class="space-y-4">
    <div v-for="field in store.fields"
         :key="field.local_id"
         class="p-5 bg-white border-l-4 border-red-500 rounded-lg shadow">

      <FieldEditor :field="field" />

      <div class="w-full text-right mt-1">
        <button
          @click="store.removeField(field.local_id)"
          class="text-red-600 hover:bg-red-100 p-1 rounded"
        >
          <i class="fas fa-trash"></i>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useSurveyStore } from '~/stores/survey'
import FieldEditor from "./FieldEditor.vue";

const store = useSurveyStore();
</script>
