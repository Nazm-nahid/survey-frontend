<script setup>
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useSurveyStore } from "~/stores/survey";

const route = useRoute();
const store = useSurveyStore();

let hoverRating = {}

onMounted(async () => {
  await store.fetchSurvey(Number(route.params.id));
});

const survey = computed(() => store.survey);

async function submit() {
  await store.submitSurvey(Number(route.params.id));
  alert("Survey submitted!");
}

function setAnswer(fieldId , value, type) {
  console.log("field_id: ", fieldId ," value: ", value ," type: ", type);
  store.setAnswer(fieldId , value, type);
}

function getAnswerValue(fieldId) {
  const ans = store.answers.find(a => a.field_id === fieldId);
  return ans ? Number(ans.value) : 0;
}

const stars = [1, 2, 3, 4, 5];
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
    <div v-if="survey" class="w-full max-w-3xl p-8 space-y-8">
      <!-- Header -->
      <!-- <div class="space-y-2">
        <h1 class="text-3xl font-bold">{{ survey.title }}</h1>
        <p class="text-gray-500">{{ survey.description }}</p>
      </div> -->

      <!-- Fields -->
      <div class="space-y-6">
        <div
          v-for="field in survey.fields"
          :key="field.id"
          class="space-y-2 pb-4"
        >
          <h2 class="text-lg font-medium">{{ field.title }}</h2>

          <!-- Short Text -->
          <div v-if="field.type === 'short_text'">
            <input
              type="text"
              class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Write your answer..."
              @change="(e) => setAnswer(field.id, e.target.value, field.type)"
            />
          </div>

          <!-- Select -->
          <div v-else-if="field.type === 'select'">
            <select
              class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-200"
              @change="(e) => setAnswer(field.id, e.target.value, field.type)"
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
                @change="(e) => setAnswer(field.id, e.target.value, field.type)"
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
                :checked="(store.answers.find(a => a.field_id === field.id)?.value || '').split(',').includes(opt.title)"
                  @change="(e) => {
                    const ans = store.answers.find(a => a.field_id === field.id);
                    let arr = ans && ans.value ? ans.value.split(',') : [];

                    if (e.target.checked) {
                      if (!arr.includes(opt.title)) arr.push(opt.title);
                    } else {
                      arr = arr.filter(i => i !== opt.title);
                    }

                    setAnswer(field.id, arr.join(','), field.type);
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
                @mousemove="(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const width = rect.width;
                  const value = star - 1 + (x < width / 2 ? 0.5 : 1);
                  setAnswer(field.id, String(value), field.type)
                }"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                class="w-6 h-6 cursor-pointer transition-colors"
              >
                <defs>
                  <linearGradient id="half-grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="50%" stop-color="#FACC15" /> <!-- yellow -->
                    <stop offset="50%" stop-color="#ededed" /> <!-- gray -->
                  </linearGradient>
                </defs>

                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.538 1.118l-3.36-2.44a1 1 0 00-1.176 0l-3.36 2.44c-.783.57-1.838-.197-1.538-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.047 9.384c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.957z"
                  :fill="(hoverRating[field.id] || getAnswerValue(field.id)) + 0.5 === star ? 'url(#half-grad)' :
                        (hoverRating[field.id] || getAnswerValue(field.id)) >= star ? '#FACC15' :
                        '#ededed'"
                />
              </svg>
            </template>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="pt-6">
        <button
          class="w-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-300"
          @click="submit"
        >
          Submit
        </button>
      </div>
    </div>

    <div v-else class="text-gray-500 text-center py-10">
      Loading survey...
    </div>
  </div>
</template>

<style>
.half path {
  clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
}
</style>
