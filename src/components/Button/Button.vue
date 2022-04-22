<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { computed } from "vue";

let props = defineProps({
    variant: String,
    color: String,
    size: String,
    circle: {
        type: Boolean,
        default: false,
    },
    rounded: {
        type: Boolean,
        default: false,
    },
    squared: {
        type: Boolean,
        default: false,
    },
    loading: {
        type: Boolean,
        default: false,
    },
});

defineEmits(["click"]);

let _size = computed(() => {
    switch (props.size) {
        case "xs":
            return "gap-x-1 text-xs px-2.5 py-1.5";
        case "sm":
            return "gap-x-2 text-sm leading-4 px-3 py-2";
        case "md":
            return "gap-x-2 text-base px-4 py-2";
        case "lg":
            return "gap-x-2 text-base px-6 py-3";
        case "xl":
            return "gap-x-3 text-base px-7 py-4";
        default:
            return "gap-x-2 text-sm px-4 py-2";
    }
});

let _round = computed(() => {
    let r = props.squared ? "" : props.rounded ? "rounded-full" : "rounded";
    return r;
});

let _color = computed(() => {
    return props.color ? props.color : "primary";
});

let _buttonClass = computed(() => {
    switch (props.variant) {
        case "outline":
            return `${_size.value} ${_round.value} ring-${_color.value}-500 text-${_color.value}-500 border border-${_color.value}-500 hover:bg-${_color.value}-50 dark:ring-offset-slate-800 dark:hover:bg-slate-700`;
        case "flat":
            return `${_size.value} ${_round.value} ring-${_color.value}-600 text-${_color.value}-600 hover:bg-${_color.value}-100 dark:ring-offset-slate-800 dark:hover:bg-slate-700 dark:ring-${_color.value}-700`;
        case "circle":
            return `rounded-full ring-${_color.value}-500 text-white bg-${_color.value}-500 hover:bg-${_color.value}-600 hover:ring-${_color.value}-600
					dark:ring-offset-slate-800 dark:bg-${_color.value}-700 dark:ring-${_color.value}-700
					dark:hover:bg-${_color.value}-600 dark:hover:ring-${_color.value}-600 w-10 h-10 truncate text-center`;
        default:
            return `${_size.value} ${_round.value} ring-${_color.value}-500 text-white bg-${_color.value}-500 hover:bg-${_color.value}-600 hover:ring-${_color.value}-600
					dark:ring-offset-slate-800 dark:bg-${_color.value}-700 dark:ring-${_color.value}-700
					dark:hover:bg-${_color.value}-600 dark:hover:ring-${_color.value}-600`;
    }
});
</script>

<template>
    <button
        :class="_buttonClass"
        :disabled="loading"
        @click="$emit('click', $event)"
        class="relative focus:outline-none inline-flex justify-center items-center transition-all ease-in duration-100 focus:ring-2 focus:ring-offset-2 hover:shadow-sm disabled:opacity-80 disabled:cursor-not-allowed"
    >
        <slot name="prefix" />

        <slot />

        <div v-if="$slots.suffix && !loading">
            <slot name="suffix" />
        </div>
        <div
            v-show="loading"
            :class="
                variant == 'circle'
                    ? 'absolute flex justify-center items-center z-10 bg-gray-300/50 w-full h-full'
                    : ''
            "
        >
            <svg
                class="animate-spin w-4 h-4 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                ></circle>
                <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
            </svg>
        </div>
    </button>
</template>
