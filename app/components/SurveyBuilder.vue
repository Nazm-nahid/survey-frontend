<template>
  <div class="space-y-6">

    <!-- Header -->
    <div class="p-6 bg-white border-t-10 border-red-500 rounded-lg shadow">
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
      <button class="btn py-1 px-2 text-gray-500" @click="store.addField('short_text')">Short answer +</button>
      <button class="btn py-1 px-2 text-gray-500" @click="store.addField('select')">Dropdown +</button>
      <button class="btn py-1 px-2 text-gray-500" @click="store.addField('radio')">Radio +</button>
      <button class="btn py-1 px-2 text-gray-500" @click="store.addField('checkbox')">Checkbox +</button>
      <button class="btn py-1 px-2 text-gray-500" @click="store.addField('rating')">Rating +</button>
    </div>

    <!-- Submit -->
    <button @click="create"
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-300">
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
    navigateTo("/surveys");
  } catch (err) {
    console.error(err);
    alert("Error creating survey");
  }
};
</script>

<style>
@reference "tailwindcss";

.btn { @apply   bg-gray-200 rounded hover:bg-gray-300; }
</style>
