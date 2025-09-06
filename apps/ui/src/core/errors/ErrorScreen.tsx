import { cn } from "@/lib/tailwind";
import { Link } from "@tanstack/react-router";
import { Wrench } from "lucide-react";
import { Button } from "../components/Button";
import { BaseScreen } from "../components/screen/BaseScreen";

export function ErrorScreen(props: { errorMsg?: string }) {
	const { errorMsg } = props;

	return (
		<BaseScreen title="..." className="flex flex-col">
			<div
				className={cn("flex-grow", "grid place-items-center", "text-center")}
			>
				<div className="space-y-6">
					<figure className="grid place-items-center gap-3">
						{<Wrench className="size-24" />}
						<figcaption className="grid gap-1">
							<span className="text-xl font-bold">Something went wrong</span>
							{errorMsg !== undefined && (
								<code className={cn("text-xs", "text-muted-2-reverse")}>
									{errorMsg}
								</code>
							)}
						</figcaption>
					</figure>

					<Link to="/">
						<Button variant="link">Go back home</Button>
					</Link>
				</div>
			</div>
		</BaseScreen>
	);
}
