<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { computed } from "vue";

let props = defineProps({
    id: String,
    placeholder: {
        type: String,
        default: "Please input",
    },
    label: String,
	labelPlacement:{
		type:String,
		default:'top'
	},
    modelValue: {
        type: [String, Number],
        default: null,
    },
    hint: String,
    cornerHint: String,
    textArea: {
        type: Boolean,
        default: false,
    },
});

let id = computed(() => {
    return props.id ? props.id : Math.random().toString(36).substring(7);
});
</script>

<template>
    <div>
        <div
            class="w-full flex items-center font-medium"
            :class="label && labelPlacement =='top'? 'justify-between' : 'justify-end'"
        >
            <label v-if="label && labelPlacement == 'top'" :for="id" v-text="label" class="dark:text-white pb-1"></label>
            <h1 v-if="cornerHint" v-text="cornerHint"></h1>
        </div>
        <div class="relative flex"
			:class="[label && labelPlacement == 'left'? 'space-x-4':'',textArea? 'items-start':'items-center']">
            <label v-if="label && labelPlacement == 'left'" :for="id" v-text="label" class="dark:text-white"></label>
            <div
                :class="textArea ? 'top-2' : ''"
                class="absolute w-8 flex items-center justify-center text-gray-500 pointer-events-none"
            >
                <slot name="prefix" />
            </div>
            <input
                v-if="!textArea"
                :id="id"
                type="text"
                v-bind="$attrs"
                :value="modelValue"
                :placeholder="placeholder"
                @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
                :class="{ 'pl-8': $slots.prefix, 'pr-8': $slots.suffix }"
                class="placeholder-secondary-400 dark:bg-secondary-800 dark:text-secondary-400 dark:placeholder-secondary-500 border border-secondary-300 focus:ring-primary-500 focus:border-primary-500 dark:border-secondary-600 form-input block w-full sm:text-sm rounded-md transition ease-in-out duration-100 focus:outline-none shadow-sm"
            />
            <textarea
                v-else
                :id="id"
                cols="30"
                rows="4"
                v-bind="$attrs"
                :value="modelValue"
                :placeholder="placeholder"
                :class="{ 'pl-8': $slots.prefix, 'pr-8': $slots.suffix }"
                @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
                class="placeholder-secondary-400 dark:bg-secondary-800 dark:text-secondary-400 dark:placeholder-secondary-500 border border-secondary-300 focus:ring-primary-500 focus:border-primary-500 dark:border-secondary-600 form-textarea block w-full sm:text-sm rounded-md transition ease-in-out duration-100 focus:outline-none shadow-sm"
            ></textarea>
            <div
                :class="textArea ? 'top-2' : ''"
                class="absolute right-1 flex items-center justify-center text-gray-500 pointer-events-none"
            >
                <slot name="suffix" />
            </div>
        </div>
        <h1 v-if="hint" class="text-gray-400 text-sm" v-text="hint"></h1>
    </div>
</template>
