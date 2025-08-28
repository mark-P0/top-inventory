import { cn } from "@/lib/tailwind";
import { Progress } from "@ark-ui/react/progress";
import { Portal } from "radix-ui";
import type { ReactNode } from "react";

export function Loading(props: { label?: ReactNode }) {
	const { label = "Loading..." } = props;

	return (
		<Portal.Root>
			<Progress.Root
				/** Indeterminate */
				defaultValue={null}
				translations={{
					/** Value text */
					value({ value, max }) {
						if (value === null) return "Loading...";
						return `${value} of ${max} items loaded`;
					},
				}}
				className={cn("fixed top-0 left-0", "w-svw", "bg-muted-1/50")}
			>
				<div
					className={cn(
						"animate-pulse",
						"absolute -z-10 top-0 left-0 size-full",
						"bg-muted-2/50",
					)}
				/>
				<div className="grid place-items-center">
					<Progress.Label
						className={cn(
							"w-full py-1",
							"text-center font-semibold",
							"subtitle",
						)}
					>
						{label}
					</Progress.Label>
				</div>
				<Progress.ValueText />

				<Progress.Circle className="sr-only">
					<Progress.CircleTrack />
					<Progress.CircleRange />
				</Progress.Circle>
			</Progress.Root>
		</Portal.Root>
	);
}
