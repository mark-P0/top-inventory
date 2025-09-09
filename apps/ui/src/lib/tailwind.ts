import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** https://ui.shadcn.com/docs/installation/manual */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
