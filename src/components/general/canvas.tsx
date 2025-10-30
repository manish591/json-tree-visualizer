import { Background, Controls, type NodeTypes, ReactFlow } from "@xyflow/react";
import { JsonTypeNode } from "@/components/nodes/json-type-node";
import {
	useAppStoreActions,
	useAppStoreEdges,
	useAppStoreNodes,
} from "@/store/store";
import { useTheme } from "./theme-provider";

export const nodeTypes: NodeTypes = {
	jsonTypeNode: JsonTypeNode,
};

export function Canvas() {
	const { theme } = useTheme();
	const nodes = useAppStoreNodes();
	const edges = useAppStoreEdges();
	const { onNodesChange, onEdgesChange, onConnect } = useAppStoreActions();

	return (
		<div style={{ width: "100%", height: "100%" }}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				nodeTypes={nodeTypes}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				colorMode={theme}
			>
				<Background />
				<Controls />
			</ReactFlow>
		</div>
	);
}
