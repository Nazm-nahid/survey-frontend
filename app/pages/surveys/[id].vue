<script setup>
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useSurveyStore } from "~/stores/survey";

const route = useRoute();
const store = useSurveyStore();

// Track hover state for stars
const hoverRating = {};

onMounted(async () => {
  await store.fetchSurvey(Number(route.params.id));
});

const survey = computed(() => store.survey);

async function submit() {
  await store.submitSurvey(Number(route.params.id));
  alert("Survey submitted!");
}

// Helper: returns stars array for a rating field
const stars = [1, 2, 3, 4, 5];
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
    <div v-if="survey" class="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 space-y-8">
      <!-- Header -->
      <div class="space-y-2">
        <h1 class="text-3xl font-bold">{{ survey.title }}</h1>
        <p class="text-gray-500">{{ survey.description }}</p>
      </div>

      <!-- Fields -->
      <div class="space-y-6">
        <div
          v-for="field in survey.fields"
          :key="field.id"
          class="space-y-2 border-b border-gray-200 pb-4"
        >
          <h2 class="text-lg font-medium">{{ field.title }}</h2>

          <!-- Short Text -->
          <div v-if="field.type === 'short_text'">
            <input
              type="text"
              class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Write your answer..."
              v-model="store.answers[field.id]"
            />
          </div>

          <!-- Select -->
          <div v-else-if="field.type === 'select'">
            <select
              class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              v-model="store.answers[field.id]"
            >
              <option v-for="opt in field.options" :key="opt.id" :value="opt.title">
                {{ opt.title }}
              </option>
            </select>
          </div>

          <!-- Radio -->
          <div v-else-if="field.type === 'radio'" class="space-y-2">
            <label
              v-for="opt in field.options"
              :key="opt.id"
              class="flex items-center space-x-3 cursor-pointer"
            >
              <input
                type="radio"
                :name="'f' + field.id"
                :value="opt.title"
                v-model="store.answers[field.id]"
                class="form-radio h-4 w-4 text-green-500"
              />
              <span>{{ opt.title }}</span>
            </label>
          </div>

          <!-- Checkbox -->
          <div v-else-if="field.type === 'checkbox'" class="space-y-2">
            <label
              v-for="opt in field.options"
              :key="opt.id"
              class="flex items-center space-x-3 cursor-pointer"
            >
              <input
                type="checkbox"
                @change="e => {
                  let arr = store.answers[field.id] || [];
                  if (e.target.checked) arr.push(opt.title);
                  else arr = arr.filter(i => i !== opt.title);
                  store.setAnswer(field.id, arr);
                }"
                class="form-checkbox h-4 w-4 text-green-500"
              />
              <span>{{ opt.title }}</span>
            </label>
          </div>

          <!-- Rating -->
          <div v-else-if="field.type === 'rating'" class="flex space-x-1">
            <template v-for="star in stars" :key="star">
                <svg
                @click="store.setAnswer(field.id, star)"
                @mouseover="hoverRating[field.id] = star"
                @mouseleave="hoverRating[field.id] = 0"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                :class="{
                    'text-yellow-400': star <= (hoverRating[field.id] || store.answers[field.id]),
                    'text-gray-300': star > (hoverRating[field.id] || store.answers[field.id])
                }"
                class="w-6 h-6 cursor-pointer transition-colors"
                viewBox="0 0 20 20"
                >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.538 1.118l-3.36-2.44a1 1 0 00-1.176 0l-3.36 2.44c-.783.57-1.838-.197-1.538-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.047 9.384c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.957z"/>
                </svg>
            </template>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="pt-6">
        <button
          class="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
          @click="submit"
        >
          Submit Survey
        </button>
      </div>
    </div>

    <div v-else class="text-gray-500 text-center py-10">
      Loading survey...
    </div>
  </div>
</template>
