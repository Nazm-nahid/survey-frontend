<script setup>
import { ref } from 'vue';

defineProps({
  field: Object,
  setAnswer: Function,
  getAnswerValue: Function
});

const hoverRating = ref({});
const stars = [1, 2, 3, 4, 5];
</script>
<template>
    <div class="flex space-x-1">
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
                <stop offset="50%" stop-color="#FACC15" />
                <stop offset="50%" stop-color="#ededed" />
                </linearGradient>
            </defs>

            <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.538 1.118l-3.36-2.44a1 1 0 00-1.176 0l-3.36 2.44c-.783.57-1.838-.197-1.538-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.047 9.384c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.957z"
                :fill="getAnswerValue(field.id) + 0.5 === star ? 'url(#half-grad)' :
                    getAnswerValue(field.id) >= star ? '#FACC15' : '#ededed'"
            />
            </svg>
        </template>
    </div>
</template>

