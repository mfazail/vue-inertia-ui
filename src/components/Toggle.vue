<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>
<script lang="ts" setup>
import { computed, onMounted } from "vue";

let props = defineProps({
    id: String,
    size: String,
    label: String,
    rightLabel: String,
    modelValue: {
        type: Boolean,
        default: null,
    },
});

onMounted(() => {
    if (props.label && props.rightLabel) {
        console.warn(["There should be only 1 label!"]);
    }
});

let _size = computed(() => {
    switch (props.size) {
        case "sm":
            return "h-4 w-7";
        case "lg":
            return "h-6 w-10";
        default:
            return "h-5 w-9";
    }
});

let _circleClass = computed(() => {
    switch (props.size) {
        case "sm":
            return "checked:translate-x-3 w-3 h-3";
        case "lg":
            return "checked:translate-x-4 left-0.5 w-4 h-4";
        default:
            return "checked:translate-x-3.5 left-0.5 w-3.5 h-3.5";
    }
});

let _id = computed(() => {
    return props.id ? props.id : Math.random().toString(36).substring(7);
});
</script>

<template>
    <div class="flex items-center">
        <label v-if="label" :for="_id" class="mr-2">{{ label }}</label>
        <label
            :for="_id"
            tabindex="-1"
            class="group relative flex items-center select-none"
        >
            <input
                :id="_id"
                type="checkbox"
                v-bind="$attrs"
                :class="_circleClass"
                :checked="modelValue"
                @change="$emit('update:modelValue',($event.target as HTMLInputElement).checked)"
                class="absolute mx-0.5 my-auto inset-y-0 rounded-full border-0 appearance-none translate-x-0 transform transition ease-in-out duration-200 cursor-pointer shadow checked:bg-none peer focus:ring-0 focus:ring-offset-0 focus:outline-none bg-white checked:text-white dark:bg-secondary-200"
            />
            <div
                :class="_size"
                class="block rounded-full cursor-pointer transition ease-in-out duration-100 peer-focus:ring-2 peer-focus:ring-offset-2 group-focus:ring-2 group-focus:ring-offset-2 bg-secondary-200 peer-checked:bg-primary-600 peer-focus:ring-primary-600 group-focus:ring-primary-600 dark:group-focus:ring-secondary-600 dark:peer-focus:ring-secondary-600 dark:peer-focus:ring-offset-secondary-800 dark:bg-secondary-600 dark:peer-checked:bg-secondary-700"
            ></div>
        </label>
        <label v-if="rightLabel && !label" :for="_id" class="ml-2">{{
            rightLabel
        }}</label>
    </div>
</template>
