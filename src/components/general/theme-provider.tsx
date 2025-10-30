import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
};

type ThemeContextState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

const initialState: ThemeContextState = {
	theme: "system",
	setTheme: (_: Theme) => null,
};

const ThemeContext = createContext<ThemeContextState>(initialState);

export function ThemeContextProvider({
	children,
	defaultTheme = "system",
	storageKey = "theme-key",
}: Readonly<ThemeProviderProps>) {
	const [theme, setTheme] = useState<Theme>(
		() => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
	);

	useEffect(() => {
		const root = document.documentElement;

		root.classList.remove("light", "dark");

		if (theme === "system") {
			const systemTheme = matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";

			root.classList.add(systemTheme);
			return;
		}

		root.classList.add(theme);
	}, [theme]);

	const value = useMemo(
		() => ({
			theme,
			setTheme: (theme: Theme) => {
				localStorage.setItem(storageKey, theme);
				setTheme(theme);
			},
		}),
		[theme, storageKey],
	);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error("Component must be wrapped in theme context provider");
	}

	return context;
}
