import { type BuiltInEdge, type Node, useReactFlow } from '@xyflow/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';

export function NodeSearch() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);
  const { getNodes, fitView, setNodes } = useReactFlow<Node, BuiltInEdge>();

  useEffect(() => {
    if (debouncedQuery) {
      const node = getNodes().find((node) => node.id === debouncedQuery);

      if (node) {
        setNodes((nodes) =>
          nodes.map((n) =>
            n.id === debouncedQuery
              ? { ...n, selected: true }
              : { ...n, selected: false },
          ),
        );
        fitView({ nodes: [node], duration: 500 });
      } else {
        toast.error('No matching nodes found');
      }
    } else {
      setNodes((nodes) => nodes.map((n) => ({ ...n, selected: false })));
    }
  }, [debouncedQuery, fitView, setNodes, getNodes]);

  return (
    <Input
      placeholder="Search node"
      className="h-8"
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
      }}
    />
  );
}
