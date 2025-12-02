<script setup>
import { ref, onMounted } from 'vue'
import { useSurveyStore } from '~/stores/survey'

const store = useSurveyStore()

onMounted(() => {
  store.fetchSurveys()
})

const toggleLive = (survey) => {
  survey.is_live = !survey.is_live
  // optionally send update to backend
}

const navigateTo = (path) => {
  // Replace with your router push logic
  window.location.href = path
}
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-semibold ml-5">Survey List</h2>
      <button 
        @click="navigateTo('/surveys/create')" 
        class="bg-green-500 text-black px-4  rounded hover:bg-green-600"
      >
        + New Survey
      </button>
    </div>

    <div class="overflow-x-auto bg-white shadow rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4  text-left text-sm font-medium text-gray-700">ID</th>
            <th class="px-4  text-left text-sm font-medium text-gray-700">Title</th>
            <th class="px-4  text-left text-sm font-medium text-gray-700">Created By</th>
            <th class="px-4  text-left text-sm font-medium text-gray-700">Created At</th>
            <th class="px-4  text-left text-sm font-medium text-gray-700">Start At</th>
            <th class="px-4  text-left text-sm font-medium text-gray-700">End At</th>
            <th class="px-4  text-left text-sm font-medium text-gray-700">Submissions</th>
            <th class="px-4  text-center text-sm font-medium text-gray-700">Live</th>
            <th class="px-4  text-center text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
          <tr v-for="s in store.surveys" :key="s.id" class="hover:bg-gray-50">
            <td class="px-4  text-sm text-gray-700">{{ s.id }}</td>
            <td class="px-4  text-sm text-gray-700">{{ s.title }}</td>
            <td class="px-4  text-sm text-gray-700">{{ s.created_by }}</td>
            <td class="px-4  text-sm text-gray-700">{{ s.created_at }}</td>
            <td class="px-4  text-sm text-gray-700">{{ s.start_at }}</td>
            <td class="px-4  text-sm text-gray-700">{{ s.end_at }}</td>
            <td class="px-4  text-sm text-gray-700 text-center">{{ s.submission_count }}</td>
            <td class="px-4  text-center">
              <input type="checkbox" class="h-5 w-5" :checked="s.is_live" @change="toggleLive(s)">
            </td>
            <td class="px-4  text-center space-x-2">
              <button 
                @click="navigateTo('/surveys/edit/' + s.id)" 
                class="bg-blue-500 text-black  py-1 rounded hover:bg-blue-600 text-sm"
              >
                Edit
              </button>
              <button 
                @click="navigateTo('/surveys/' + s.id + '/submissions')" 
                class="bg-gray-500 text-black  py-1 rounded hover:bg-gray-600 text-sm"
              >
                Submissions
              </button>
              <button 
                @click="navigateTo('/surveys/preview/' + s.id)" 
                class="bg-purple-500 text-black  py-1 rounded hover:bg-purple-600 text-sm"
              >
                Preview
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
