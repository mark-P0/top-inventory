import { cn } from "@/lib/tailwind";
import { Link } from "@tanstack/react-router";
import { Wrench } from "lucide-react";
import { Screen } from "../components/Screen";

export function ErrorScreen() {
	return (
		<Screen title="..." className="flex flex-col">
			<div
				className={cn("flex-grow", "grid place-items-center", "text-center")}
			>
				<div className="space-y-6">
					<figure className="grid place-items-center gap-3">
						{<Wrench className="size-24" />}
						<figcaption className="text-xl font-bold">
							Something went wrong
						</figcaption>
					</figure>

					<Link to="/">Go back home</Link>
				</div>
			</div>
		</Screen>
	);
}
