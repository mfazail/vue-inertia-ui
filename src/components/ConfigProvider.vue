<script lang="ts">
export default{
	inheritAttrs:false
}
</script>
<script lang="ts" setup>
import { ref } from "vue";
import {useTheme} from './theme'

let props = defineProps({
    theme: {
        type: String,
        default: "light",
    },
});

let _theme = useTheme()

_theme.setTheme(props.theme)

let wrapper = ref<HTMLElement | null>(null);
</script>

<template>
    <div ref="wrapper" class="dark:bg-slate-700" :class="_theme.theme" v-bind="$attrs">
        <slot />
    </div>
</template>
