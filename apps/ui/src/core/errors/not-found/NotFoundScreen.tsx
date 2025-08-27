import { cn } from "@/lib/tailwind";
import { Link } from "@tanstack/react-router";
import { Ghost } from "lucide-react";
import { BaseScreen } from "../../components/screen/BaseScreen";

export function NotFoundScreen() {
	return (
		<BaseScreen title="...?" className="flex flex-col">
			<div
				className={cn("flex-grow", "grid place-items-center", "text-center")}
			>
				<div className="space-y-6">
					<figure className="grid place-items-center gap-3">
						{<Ghost className="size-24" />}
						<figcaption className="text-xl font-bold">We got lost</figcaption>
					</figure>

					<Link to="/">Go back home</Link>
				</div>
			</div>
		</BaseScreen>
	);
}
