import { cn } from "@/lib/utils";

export function BaseNode({
	className,
	...props
}: Readonly<React.ComponentProps<"div">>) {
	return (
		<div
			className={cn(
				"relative rounded-md border bg-card text-card-foreground",
				"hover:ring-1 p-[5px] w-[250px]",
				String.raw`[.react-flow\_\_node.selected_&]:border-primary`,
				String.raw`[.react-flow\_\_node.selected_&]:border-2`,
				String.raw`[.react-flow\_\_node.selected_&]:shadow-lg`,
				className,
			)}
			{...props}
		/>
	);
}

export function BaseNodeHeader({
	className,
	...props
}: Readonly<React.ComponentProps<"header">>) {
	return (
		<header
			{...props}
			className={cn(
				"mx-0 my-0 flex flex-row items-center justify-between gap-2 px-2 py-2",
				"rounded-md",
				className,
			)}
		/>
	);
}

export function BaseNodeContent({
	className,
	...props
}: Readonly<React.ComponentProps<"div">>) {
	return (
		<div
			data-slot="base-node-content"
			className={cn("flex flex-col gap-y-2", className)}
			{...props}
		/>
	);
}

export function BaseNodeFooter({
	className,
	...props
}: Readonly<React.ComponentProps<"div">>) {
	return (
		<div
			data-slot="base-node-footer"
			className={cn(
				"flex flex-col items-center gap-y-2 border-t px-3 pb-3 pt-2",
				className,
			)}
			{...props}
		/>
	);
}
