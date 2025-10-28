import { IconChecks, IconLayoutSidebarLeftCollapse } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSidebarContext } from './sidebar';

export function Header() {
  const { openSidebar, isSidebarOpen } = useSidebarContext();

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
        <Button
          size="sm"
          variant="secondary"
          className={cn(
            'border border-primary/40 cursor-pointer rounded-lg px-3 text-sm',
          )}
        >
          <IconChecks className="size-4" />
          <span>Save</span>
        </Button>
      </div>
    </header>
  );
}
