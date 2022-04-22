<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { onClickOutside } from '@vueuse/core'
type OptionType = {
    value: string | number | null;
    label: string | number;
};

let props = defineProps({
    id: String,
    label: String,
    searchable: {
        type: Boolean,
        default: false,
    },
    placeholder: {
        type: String,
        default: "Please select",
    },
    modelValue: {
        type: [String, Number, Array],
        default: null,
    },
    multiple: {
        type: Boolean,
        default: false,
    },
    options: {
        type: Array,
        default: [],
    },
});
let emit = defineEmits(["update:modelValue"]);

let id = computed(() =>
    props.id ? props.id : Math.random().toString(36).substring(7)
);

let valueText = computed(() =>
    props.multiple ? null : (selected.value as OptionType)?.label
);

onMounted(() => {
    if (props.modelValue != null) {
        if (!props.multiple) {
            selected.value = (props.options as OptionType[])?.find(
                (item: OptionType) => item.value == props.modelValue
            ) as OptionType;
        } else {
            (props.modelValue as number[]).forEach((item: number) => {
                (selected.value as OptionType[])?.push(
                    (props.options as OptionType[]).find(
                        (i: OptionType) => i.value == item
                    ) as OptionType
                );
            });
        }
    }
});

// Variables
let open = ref<boolean>(false);
let search = ref<string | null>(null);
let popover = ref<HTMLElement | null>(null);
let searchInput = ref<HTMLElement | null>(null);
let currentIndex = ref<number>(-1);
let selected = props.multiple
    ? ref<OptionType[] | null>([])
    : ref<OptionType | null>();
let options = ref<OptionType[]>(props.options as OptionType[]);

onClickOutside(popover,()=>closePopover())


// Functions
const togglePopover = async () => {
    open.value = !open.value;
    currentIndex.value = -1;
    if (open.value && props.searchable) {
        await nextTick();
        (searchInput.value as HTMLElement).focus();
    } else {
        await nextTick();
        focusNext();
    }
};
const closePopover = () => {
    open.value = false;
    search.value = "";
};

const select = (option: OptionType, index: number) => {
    currentIndex.value = index;
    if (props.multiple) {
        if ((selected.value as OptionType[]).includes(option)) {
            unSelect(option);
        } else {
            (selected.value as OptionType[]).push(option);
            let tempVal = (selected.value as OptionType[]).map(
                (item) => item.value
            );
            emit("update:modelValue", tempVal);
        }
    } else {
        if (selected.value != option) {
            selected.value = option;
            emit("update:modelValue", (selected.value as OptionType).value);
            closePopover();
        }
    }
};
const unSelect = (item: OptionType) => {
    selected.value = (selected.value as OptionType[]).filter(
        (i) => item.value != i.value
    );
    let tempVal = (selected.value as OptionType[]).map((item) => item.value);
    emit("update:modelValue", tempVal);
};

const focusPrev = () => {
    if (currentIndex.value == -1) return;

    if (!props.searchable && currentIndex.value == 0) return;

    currentIndex.value--;

    if (currentIndex.value < 0 && props.searchable) {
        (searchInput.value as HTMLElement).focus();
        return;
    }
    focusElement();
};

const focusNext = () => {
    if (currentIndex.value >= options.value.length - 1) return;

    currentIndex.value++;

    focusElement();
};

const focusElement = () => {
    var focusItem: HTMLElement | null = document.getElementById(
        `item-${id.value}-${currentIndex.value}`
    );
    focusItem?.focus();
};

let checkSelection = (option: OptionType) =>
    props.multiple
        ? (selected.value as OptionType[])?.includes(option)
        : selected.value == option;

watch(search, () => {
    options.value = (props.options as OptionType[]).filter((option) =>
        (option.label as string)
            .toLowerCase()
            .includes((search.value as string).toLowerCase())
    );
    currentIndex.value = -1;
});
</script>

<template>
    <div class="relative">
        <div class="relative">
            <label v-if="label" :for="id" @click="togglePopover">
                {{ label }}
            </label>
            <input
                readonly
                v-bind="$attrs"
                :value="valueText ?? ''"
                @click="togglePopover"
                :placeholder="
                    multiple && (selected as OptionType[])?.length > 0 ? '' : placeholder
                "
                @keydown.esc.prevent="closePopover"
                @keydown.arrow-down.prevent="togglePopover"
                class="cursor-pointer overflow-hidden placeholder-secondary-400 dark:bg-secondary-800 dark:text-secondary-400 dark:placeholder-secondary-500 border border-secondary-300 focus:ring-primary-500 focus:border-primary-500 dark:border-secondary-600 form-input block w-full sm:text-sm rounded-md transition ease-in-out duration-100 focus:outline-none shadow-sm"
            />
            <div
                v-if="multiple && (selected as OptionType[])?.length > 0"
                class="absolute top-2 left-3 flex"
            >
                <span class="text-center w-full">
                    {{ (selected as OptionType[])?.length }}
                </span>
                <div class="ml-2 flex items-center space-x-2">
                    <div
                        @click="togglePopover"
                        class="flex px-1 space-x-1 cursor-pointer"
                        v-for="option in selected"
                        :key="(option as OptionType).label"
                    >
                        <span class="pointer-events-none">{{
                            (option as OptionType).label
                        }}</span>
                        <button
                            @click.stop="unSelect(option as OptionType)"
                            @keydown.enter.prevent="unSelect(option as OptionType)"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4 mt-px"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <div
                    class="absolute inset-y-0 right-0 flex items-center pr-2 gap-x-2"
                >
                    <button class="focus:outline-none" @click="togglePopover">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <div
            ref="popover"
            v-show="open"
            @keydown.esc.prevent="closePopover"
            class="absolute w-full mt-1 rounded-lg overflow-hidden shadow-md bg-white z-10 border border-secondary-200 dark:bg-secondary-800 dark:border-secondary-600"
        >
            <div v-if="searchable" class="relative px-2 my-2">
                <input
                    v-model="search"
                    ref="searchInput"
                    placeholder="Search here..."
                    @keydown.tab.prevent="focusNext"
                    @keydown.shift.tab.prevent="focusPrev"
                    @keydown.arrow-up.prevent="focusPrev"
                    @keydown.arrow-down.prevent="focusNext"
                    class="form-input rounded-md w-full border-none focus:shadow-md bg-slate-100 focus:border-none ring-0 focus:ring-0 outline-none focus:outline-none duration-300"
                />
                <svg
                    fill="none"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 absolute top-3 right-5 text-secondary-500"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>
            <div
                class="max-h-60 overflow-y-auto select-none transition-all duration-300"
            >
                <template
                    :key="option.value ?? option"
                    v-for="(option, index) in options"
                >
                    <button
                        :id="`item-${id}-${index}`"
                        @click="select(option as OptionType, index)"
                        @keydown.tab.prevent="focusNext"
                        @keydown.shift.tab.prevent="focusPrev"
                        @keydown.esc.prevent="closePopover"
                        @keydown.arrow-up.prevent="focusPrev"
                        @keydown.arrow-down.prevent="focusNext"
                        @keydown.enter.prevent="select(option as OptionType, index)"
                        class="w-full flex items-center py-1 px-3 focus:outline-none group hover:text-white focus:text-white"
                        :class="
                            checkSelection(option as OptionType)
                                ? 'hover:bg-negative-600 focus:bg-negative-600 justify-between'
                                : 'hover:bg-primary-600 focus:bg-primary-600'
                        "
                    >
                        <h1
                            :class="
                                checkSelection(option as OptionType) ? 'font-semibold' : ''
                            "
                        >
                            {{ (option as OptionType).label }}
                        </h1>
                        <svg
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            v-if="checkSelection(option as OptionType)"
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-primary-600 group-hover:text-white group-focus:text-white"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            />
                        </svg>
                    </button>
                </template>
            </div>
        </div>
    </div>
</template>
