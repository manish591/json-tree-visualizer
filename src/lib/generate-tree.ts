import type { Edge } from "@xyflow/react";
import type { JsonTypeNode } from "@/components/nodes/json-type-node";
import type { JsonObject, JsonValue } from "@/store/store";

function getNumChildrenNodes(data: JsonValue): number {
	if (Array.isArray(data)) {
		return data.length;
	}

	if (typeof data === "object" && data !== null) {
		return Object.entries(data).length;
	}

	return 0;
}

function getNodeDataType(data: JsonValue): string {
	if (Array.isArray(data)) {
		return "array";
	}

	if (typeof data === "object" && data !== null) {
		return "object";
	}

	if (data === null) {
		return "null";
	}

	return typeof data;
}

export function generateTree(data: JsonValue, root: string | null = null) {
	let nodes: JsonTypeNode[] = [];
	let edges: Edge[] = [];

	if (root === null) {
		const node: JsonTypeNode = {
			id: "$",
			type: "jsonTypeNode",
			position: {
				x: 0,
				y: 0,
			},
			data: {
				key: "$",
				value: data,
				dataType: getNodeDataType(data),
				numChildren: getNumChildrenNodes(data),
			},
		};

		nodes = [...nodes, node];
	}

	if (typeof data === "object" && data !== null) {
		for (const key in data) {
			const value = (data as JsonObject)[key];

			if (typeof value === "object" && value !== null) {
				const numChildren = Array.isArray(value)
					? value.length
					: Object.keys(value).length;
				const parent = root ?? "$";
				const currentNodeId = `${parent}.${key}`;
				const dataType = Array.isArray(value) ? "array" : "object";

				const node: JsonTypeNode = {
					id: currentNodeId,
					type: "jsonTypeNode",
					position: {
						x: 0,
						y: 0,
					},
					data: {
						dataType,
						key,
						value,
						numChildren,
					},
				};

				const edge = {
					id: `${parent}-${currentNodeId}`,
					source: parent,
					target: currentNodeId,
				};

				nodes = [...nodes, node];
				edges = [...edges, edge];

				const { nodes: newNodes, edges: newEdges } = generateTree(
					value,
					currentNodeId,
				);
				nodes = [...nodes, ...newNodes];
				edges = [...edges, ...newEdges];
			} else {
				const parent = root ?? "$";
				const currentNodeId = `${parent}.${key}`;
				const dataType = value === null ? "null" : typeof value;
				const node: JsonTypeNode = {
					id: currentNodeId,
					type: "jsonTypeNode",
					position: {
						x: 0,
						y: 0,
					},
					data: {
						dataType,
						key,
						value,
						numChildren: 0,
					},
				};

				const edge = {
					id: `${parent}-${currentNodeId}`,
					source: parent,
					target: currentNodeId,
				};

				nodes = [...nodes, node];
				edges = [...edges, edge];
			}
		}
	}

	return {
		nodes,
		edges,
	};
}
