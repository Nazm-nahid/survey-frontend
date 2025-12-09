<script setup>
import { useSurveyStore } from '~/stores/survey';
const store = useSurveyStore();

defineProps({
  field: Object,
  setAnswer: Function
});
</script>
<template>
    <div class="space-y-2">
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
            class="form-checkbox h-4 w-4"
            id="red-checked-option"
            />
            <span>{{ opt.title }}</span>
        </label>
    </div>
</template>

