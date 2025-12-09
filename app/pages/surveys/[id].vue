<script setup>
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useSurveyStore } from '~/stores/survey';

import ShortTextField from '~/components/SubmissionFieldTypes/ShortTextField.vue';
import SelectField from '~/components/SubmissionFieldTypes/SelectField.vue';
import RadioField from '~/components/SubmissionFieldTypes/RadioField.vue';
import CheckboxField from '~/components/SubmissionFieldTypes/CheckboxField.vue';
import RatingField from '~/components/SubmissionFieldTypes/RatingField.vue';

const route = useRoute();
const store = useSurveyStore();

onMounted(async () => {
  await store.fetchSurvey(Number(route.params.id));
});

const survey = computed(() => store.survey);

function setAnswer(fieldId , value, type) {
  store.setAnswer(fieldId , value, type);
}

function getAnswerValue(fieldId) {
  const ans = store.answers.find(a => a.field_id === fieldId);
  return ans ? Number(ans.value) : 0;
}

async function submit() {
  await store.submitSurvey(Number(route.params.id));
  alert("Survey submitted!");
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
    <div v-if="survey" class="w-full max-w-lg p-8 space-y-8">
      <div class="space-y-6">
        <div v-for="field in survey.fields" :key="field.id" class="space-y-2 pb-4">
          <h2 class="text-lg font-medium">{{field.id+'.    '+field.title }}</h2>

          <ShortTextField class="ml-5" v-if="field.type === 'short_text'" :field="field" :setAnswer="setAnswer"/>
          <SelectField class="ml-5" v-else-if="field.type === 'select'" :field="field" :setAnswer="setAnswer"/>
          <RadioField class="ml-5" v-else-if="field.type === 'radio'" :field="field" :setAnswer="setAnswer"/>
          <CheckboxField class="ml-5" v-else-if="field.type === 'checkbox'" :field="field" :setAnswer="setAnswer"/>
          <RatingField class="ml-5" v-else-if="field.type === 'rating'" :field="field" :setAnswer="setAnswer" :getAnswerValue="getAnswerValue"/>
        </div>
      </div>

      <div class="pt-6 w-full text-right">
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
