<script lang="ts">
export default{
	inheritAttrs:false
}
</script>

<script lang="ts" setup>
import { computed, onMounted } from "vue";

let props = defineProps({
	id:String,
    size: String,
    label: String,
    rightLabel: String,
    modelValue: {
        type: Boolean,
		default:null,
    },
});

onMounted(() => {
    if (props.label && props.rightLabel) {
        console.warn(["There should be only 1 label!"]);
    }
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
			:class="size"
			v-bind="$attrs"
            type="checkbox"
			:checked="modelValue"
            @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
            class="form-checkbox rounded transition ease-in-out duration-100 border-secondary-300 text-primary-600 focus:ring-primary-600 focus:border-primary-400 dark:border-secondary-500 dark:checked:border-secondary-600 dark:focus:ring-secondary-600 dark:focus:border-secondary-500 dark:bg-secondary-600 dark:text-secondary-600 dark:focus:ring-offset-secondary-800"
        />

        <label v-if="rightLabel && !label" :for="id" class="ml-2">
            {{ rightLabel }}
        </label>
    </div>
</template>
