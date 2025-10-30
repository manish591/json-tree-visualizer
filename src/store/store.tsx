import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
} from '@xyflow/react';
import { create } from 'zustand';

export type JsonPrimitive = string | number | boolean | null;

export interface JsonObject {
  [key: string]: JsonValue;
}

export interface JsonArray extends Array<JsonValue> {}

export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

export type NodeData = {
  dataType: string;
  key: string;
  value: JsonValue;
  numChildren: number;
};

type AppStoreActions = {
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
};

type AppStoreState = {
  nodes: Node[];
  edges: Edge[];
  actions: AppStoreActions;
};

const useAppStore = create<AppStoreState>((set, get) => ({
  nodes: [],
  edges: [
    {
      id: '$-$.name',
      source: '$',
      target: '$.name',
    },
  ],
  actions: {
    onNodesChange: (changes: NodeChange[]) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge(connection, get().edges),
      });
    },
    setNodes: (nodes) => {
      set({ nodes });
    },
    setEdges: (edges) => {
      set({ edges });
    },
  },
}));

export const useAppStoreNodes = () => useAppStore((state) => state.nodes);

export const useAppStoreEdges = () => useAppStore((state) => state.edges);

export const useAppStoreActions = () => useAppStore((state) => state.actions);
