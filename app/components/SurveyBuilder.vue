<template>
  <div class="space-y-6">

    <!-- Header -->
    <div class="p-6 bg-white border rounded-lg shadow">
      <input v-model="store.title"
             placeholder="Untitled form"
             class="text-3xl font-bold w-full border-none focus:ring-0" />

      <textarea v-model="store.description"
                placeholder="Form description"
                class="mt-2 w-full border-none focus:ring-0"></textarea>
    </div>

    <!-- Fields -->
    <FieldList />

    <!-- Add Field Buttons -->
    <div class="flex flex-wrap gap-3">
      <button class="btn" @click="store.addField('short_text')">Short answer</button>
      <button class="btn" @click="store.addField('select')">Dropdown</button>
      <button class="btn" @click="store.addField('radio')">Radio</button>
      <button class="btn" @click="store.addField('checkbox')">Checkbox</button>
      <button class="btn" @click="store.addField('rating')">Rating</button>
    </div>

    <!-- Submit -->
    <button @click="create"
            class="px-4  bg-purple-600 text-white rounded hover:bg-purple-700">
      Create Survey
    </button>

  </div>
</template>

<script setup>
import FieldList from "./FieldList.vue";
import { useSurveyStore } from '~/stores/survey'

const store = useSurveyStore();

const create = async () => {
  try {
    store.createSurvey(
        {
            title: store.title,
            description: store.description,
            is_live: store.is_live,
            created_by: store.created_by,
            fields: store.fields
        }
    )

    // alert("Survey Created!");
  } catch (err) {
    console.error(err);
    // alert("Error creating survey");
  }
};
</script>

<style>
@reference "tailwindcss";

.btn { @apply   bg-gray-200 rounded hover:bg-gray-300; }
</style>
