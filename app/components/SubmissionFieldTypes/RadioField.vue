<script setup>
defineProps({
  field: Object,
  setAnswer: Function
});
</script>

<template>
    <div class="space-y-2">
        <label v-for="opt in field.options" :key="opt.id" class="flex items-center space-x-3 cursor-pointer">
            <input
            type="radio"
            :name="'f' + field.id"
            :value="opt.title"
            @change="(e) => setAnswer(field.id, e.target.value, field.type)"
            class="form-radio h-4 w-4"
            id="red-checked-option"
            />
            <span>{{ opt.title }}</span>
        </label>
    </div>

</template>

<style>
#red-checked-option {
  accent-color: #fe0000;
}


</style>

