<script setup>
import { ref } from "vue";

defineProps({
  field: Object,
  setAnswer: Function
});

const textareaRef = ref(null);

function autoResize(e) {
  const el = textareaRef.value;
  if (!el) return;

  // Reset height to calculate scrollHeight
  el.style.height = "auto";

  // Line height (adjust based on text size & padding)
  const lineHeight = 24; // Tailwind p-2 with text-base ~24px
  const maxLines = 5;
  const maxHeight = lineHeight * maxLines;

  // Set height to scrollHeight or maxHeight
  el.style.height = Math.min(el.scrollHeight, maxHeight) + "px";

  // Enable scroll after 5 lines
  if (el.scrollHeight > maxHeight) {
    el.style.overflowY = "auto";
  } else {
    el.style.overflowY = "hidden";
  }

  setAnswer(field.id, e.target.value, field.type);
}
</script>

<template>
  <textarea
    ref="textareaRef"
    class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none text-black"
    placeholder="Write your answer..."
    rows="1"
    @input="autoResize"
  ></textarea>
</template>
