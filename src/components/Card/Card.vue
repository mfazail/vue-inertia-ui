<script lang="ts">
export default{
	inheritAttrs:false
}
</script>

<script setup lang="ts">
defineProps({
    title: {
        type: String,
    },
    shadow: {
        type: Boolean,
        default: false,
    },
    rounded: {
        type: Boolean,
        default: true,
    },
    color: {
        type: String,
    },
    parentClass:String,
	footerClass:String
});
</script>

<template>
    <div
        class="w-full flex flex-col border dark:border-0"
        :class="[
            shadow ? 'shadow-md' : '',
            rounded ? 'rounded-md' : '',
            color ? color : 'bg-white dark:bg-secondary-800',
            parentClass,
        ]"
    >
        <div
            v-if="title || $slots.action"
            class="flex items-center px-4 py-2.5 border-b dark:border-0"
            :class="title ? 'justify-between' : 'justify-end'"
        >
            <h1
                v-if="title"
                v-text="title"
                class="text-md font-medium text-secondary-700 dark:text-secondary-400 whitespace-normal"
            ></h1>
			<div>
				<slot name="action" />
			</div>
        </div>
        <div
            class="p-4 text-secondary-700 dark:text-secondary-400 grow"
        >
            <slot />
        </div>
        <div
			:class="footerClass"
            v-if="$slots.footer"
            class="flex px-4 py-4 sm:px-6 bg-secondary-50 rounded-t-none dark:bg-secondary-800 border-t dark:border-secondary-600"
        >
            <slot name="footer" />
        </div>
    </div>
</template>
