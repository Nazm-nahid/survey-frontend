<template>
     <AppHeader />
  <div class="max-w-3xl mx-auto py-10 space-y-6">
    <SurveyBuilder :is-create="false" :id="id"/>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute, navigateTo } from 'nuxt/app'
import { useSurveyStore } from '~/stores/survey'
import SurveyBuilder from '@/components/SurveyBuilder.vue'

const store = useSurveyStore()
const route = useRoute()

// Get ID from route
const id = Number(route.params.id)

onMounted(async () => {
  await store.fetchSurvey(id)      // Load from backend
  store.loadSurveyToEditor()       // Convert API payload → editable fields
})

</script>

<style>
@reference "tailwindcss";
.btn { @apply bg-gray-200 rounded hover:bg-gray-300; }
</style>
