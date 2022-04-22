<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";

let props = defineProps({
    id: String,
    size: String,
    label: String,
    rightLabel: String,
    value: [String, Number],
    modelValue: {
        type: [String, Number],
        default: null,
    },
});

defineEmits(["update:modelValue"]);

let checked = ref(false);

onMounted(() => {
    if (props.label && props.rightLabel) {
        console.warn(["There should be only 1 label!"]);
    }
    checked.value = props.modelValue == props.value;
});

let size = computed(() => {
    switch (props.size) {
        case "md":
            return "h-5 w-5";
        case "lg":
            return "h-6 w-6";
        default:
            return "h-4 w-4";
    }
});

let id = computed(() => {
    return props.id ? props.id : Math.random().toString(36).substring(7);
});
</script>

<template>
    <div class="flex items-center">
        <label v-if="label" :for="id" class="mr-2">
            {{ label }}
        </label>

        <input
            :id="id"
            type="radio"
            :class="size"
            v-bind="$attrs"
            :checked="checked"
            :value="value"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            class="form-radio rounded-full transition ease-in-out duration-100 border-secondary-300 text-primary-600 focus:ring-primary-600 focus:border-primary-400 dark:border-secondary-500 dark:checked:border-secondary-600 dark:focus:ring-secondary-600 dark:focus:border-secondary-500 dark:bg-secondary-600 dark:text-secondary-600 dark:focus:ring-offset-secondary-800"
        />

        <label v-if="rightLabel && !label" :for="id" class="ml-2">
            {{ rightLabel }}
        </label>
    </div>
</template>
