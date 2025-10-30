import {
	IconDownload,
	IconLayoutSidebarLeftCollapse,
	IconMoon,
	IconRefresh,
	IconSun,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppStoreActions } from "@/store/store";
import { NodeSearch } from "./node-search";
import { useSidebarContext } from "./sidebar";
import { useTheme } from "./theme-provider";

export function Header() {
	const { theme, setTheme } = useTheme();
	const { openSidebar, isSidebarOpen } = useSidebarContext();
	const { setNodes, setEdges } = useAppStoreActions();

	return (
		<header className="z-40 shrink-0 rounded-t-sm relative h-12 border-b flex items-center px-4 bg-background">
			<div className="flex items-center justify-between w-full">
				<div className="flex items-center gap-2">
					<Button
						variant="ghost"
						size="icon-lg"
						className="h-8 w-8 cursor-pointer"
						onClick={() => {
							openSidebar(!isSidebarOpen);
						}}
					>
						<IconLayoutSidebarLeftCollapse className="size-[18px]!" />
					</Button>
					<div className="flex items-center gap-2 text-sm font-medium">
						<span className="font-bold leading-none">JSON Tree Visualizer</span>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<NodeSearch />
					<Button
						size="icon-sm"
						variant="outline"
						className="cursor-pointer"
						onClick={() => {
							setNodes([]);
							setEdges([]);
						}}
					>
						<IconRefresh />
					</Button>
					<Button
						size="icon-sm"
						variant="outline"
						className="cursor-pointer"
						onClick={() => {
							setTheme(theme === "dark" ? "light" : "dark");
						}}
					>
						{theme === "dark" ? <IconSun /> : <IconMoon />}
					</Button>
					<Button
						size="sm"
						variant="secondary"
						className={cn(
							"border border-primary/40 cursor-pointer rounded-lg px-3 text-sm",
						)}
					>
						<IconDownload className="size-4" />
						<span>Export</span>
					</Button>
				</div>
			</div>
		</header>
	);
}
