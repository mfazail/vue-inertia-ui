import { onMounted, ref, watch } from "vue"

export function useTheme() {
	onMounted(() => {
		if (
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
	})
	let currentTheme = ref<string>('light')
	const toggleTheme = () => {
		currentTheme.value = currentTheme.value == 'light' ? 'dark':'light'
	}
	const setTheme = (v: string) => {
		document.documentElement.classList.remove(currentTheme.value)
		document.documentElement.classList.add(v)
		currentTheme.value = v
	}
	// watch(currentTheme.value, (v: string) => {
	// 	setTheme(v)
	// })
	return {
		theme:currentTheme.value,
		toggleTheme,
		setTheme
	}
}