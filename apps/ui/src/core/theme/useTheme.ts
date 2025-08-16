import { wrappedAccess } from "@/lib/utils";
import { useEffect, useState } from "react";

declare global {
	/**
	 * Implemented in HTML <head> to prevent FOUC
	 *
	 * https://tailwindcss.com/docs/dark-mode#with-system-theme-support
	 */
	const Theme: {
		LOCAL_STORAGE_KEY: string;
		reflectLocalStorageInDocumentElementClasses: () => void;
	};
}

type ThemeVariant = (typeof THEME_VARIANTS)[number];

const THEME_VARIANTS = ["os", "light", "dark"] as const;

export function useTheme() {
	const [theme, setTheme] = useState<ThemeVariant>("os");

	useEffect(() => {
		reflectLocalStorageInState();
	}, []);

	function reflectLocalStorageInState() {
		const localStorageVariant = localStorage.getItem(Theme.LOCAL_STORAGE_KEY);
		if (localStorageVariant === null) {
			setTheme("os");

			return;
		}

		setTheme(localStorageVariant as ThemeVariant);
	}

	/** https://tailwindcss.com/docs/dark-mode#with-system-theme-support */
	function changeTheme(variant: ThemeVariant) {
		if (variant === "os") {
			localStorage.removeItem(Theme.LOCAL_STORAGE_KEY);
		}
		if (variant === "light") {
			localStorage.setItem(Theme.LOCAL_STORAGE_KEY, variant);
		}
		if (variant === "dark") {
			localStorage.setItem(Theme.LOCAL_STORAGE_KEY, variant);
		}

		reflectLocalStorageInState();
		Theme.reflectLocalStorageInDocumentElementClasses();
	}

	function cycleTheme() {
		const currentVariantIdx = THEME_VARIANTS.indexOf(theme);
		if (currentVariantIdx === -1) {
			throw new Error("Unknown current variant?");
		}

		const nextVariant = wrappedAccess(THEME_VARIANTS, currentVariantIdx + 1);
		changeTheme(nextVariant);
	}

	return { theme, changeTheme, cycleTheme };
}
