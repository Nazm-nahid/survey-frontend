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
  <AppHeader />
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-semibold ml-5">Survey List</h2>
      <button 
        @click="navigateTo('/surveys/create')" 
        class="bg-red-400 text-white px-2 py-1  rounded hover:bg-red-700"
      >
        + New Survey
      </button>
    </div>

    <div class="overflow-x-auto bg-white shadow rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Title</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Created By</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Created At</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Start At</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">End At</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Submissions</th>
            <th class="px-4 py-2 text-center text-sm font-medium text-gray-700">Live</th>
            <th class="px-4 py-2 text-center text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
          <tr v-for="s in store.surveys" :key="s.id" class="hover:bg-gray-50">
            <td class="px-4 py-2  text-sm text-gray-700">{{ s.id }}</td>
            <td class="px-4 py-2 text-sm text-gray-700">{{ s.title }}</td>
            <td class="px-4 py-2 text-sm text-gray-700">{{ s.created_by }}</td>
            <td class="px-4 py-2 text-sm text-gray-700">{{ s.created_at }}</td>
            <td class="px-4 py-2 text-sm text-gray-700">{{ s.start_at }}</td>
            <td class="px-4 py-2 text-sm text-gray-700">{{ s.end_at }}</td>
            <td class="px-4 py-2 text-sm text-gray-700 text-center">{{ s.submission_count }}</td>
            <td class="px-4 py-2 text-center">
              <input type="checkbox" class="h-5 w-5" :checked="s.is_live" @change="toggleLive(s)">
            </td>
            <td class="px-4 py-2  text-center space-x-2">
              <button 
                @click="navigateTo('/surveys/edit/' + s.id)" 
                class="bg-blue-500 text-white  py-1 px-2 rounded hover:bg-blue-600 text-sm"
              >
                Edit
              </button>
              <button 
                @click="navigateTo('/surveys/' + s.id + '/submissions')" 
                class="bg-gray-400 text-white  py-1 px-2 rounded hover:bg-gray-300 text-sm"
              >
                Submissions
              </button>
              <button 
                @click="navigateTo('/surveys/' + s.id)" 
                class="bg-green-700 text-white  py-1 px-2 rounded hover:bg-green-900 text-sm"
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
