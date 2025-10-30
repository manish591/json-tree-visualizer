import { IconArrowsMaximize } from '@tabler/icons-react';
import { Handle, type Node, type NodeProps, Position } from '@xyflow/react';
import { useState } from 'react';
import {
  BaseNode,
  BaseNodeContent,
  BaseNodeHeader,
} from '@/components/nodes/base-node';
import { Button } from '@/components/ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import type { NodeData } from '@/store/store';

export type JsonTypeNode = Node<NodeData, 'jsonTypeNode'>;

export function JsonTypeNode({ id, data }: NodeProps<JsonTypeNode>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BaseNode>
      <BaseNodeHeader className="bg-chart-1/10 border border-chart-1/30">
        <div className="flex items-baseline justify-center gap-3">
          <span className="text-[10px] font-bold font-mono">
            {data.dataType}
          </span>
          <p className="">{data.key}</p>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          className="w-6.5 h-6.5 cursor-pointer hover:bg-transparent"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <IconArrowsMaximize className="size-3.5!" strokeWidth={2.5} />
        </Button>
      </BaseNodeHeader>
      <BaseNodeContent className="text-xs">
        {isOpen ? (
          <div className="space-y-4 py-4 px-2">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs text-muted-foreground">
                JSON Path
              </Label>
              <Input
                value={id}
                type="text"
                className="h-7 shadow-none text-xs!"
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs text-muted-foreground">
                Value
              </Label>
              <Textarea
                value={JSON.stringify(data.value)}
                className="h-7 shadow-none text-xs! resize-none"
                readOnly
                rows={3}
              />
            </div>
          </div>
        ) : null}
        {data.key === '$' ? null : (
          <Handle type="target" position={Position.Top} />
        )}
        {data.numChildren ? (
          <Handle type="source" position={Position.Bottom} />
        ) : null}
      </BaseNodeContent>
    </BaseNode>
  );
}
