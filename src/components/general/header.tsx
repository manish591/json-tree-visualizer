import {
  IconLayoutSidebarLeftCollapse,
  IconMoon,
  IconRefresh,
  IconSun,
} from '@tabler/icons-react';
import { ExportButton } from '@/components/general/export-btn';
import { NodeSearch } from '@/components/general/node-search';
import { useSidebarContext } from '@/components/general/sidebar';
import { useTheme } from '@/components/general/theme-provider';
import { Button } from '@/components/ui/button';
import { useAppStoreActions } from '@/store/store';

export function Header() {
  const { theme, setTheme } = useTheme();
  const { openSidebar, isSidebarOpen } = useSidebarContext();
  const { setNodes, setEdges } = useAppStoreActions();

  return (
    <header className="z-40 shrink-0 rounded-t-sm relative h-12 border-b flex items-center px-4 bg-background">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            className="h-8 w-8 cursor-pointer -ml-2 lg:-ml-1"
            onClick={() => {
              openSidebar(!isSidebarOpen);
            }}
          >
            <IconLayoutSidebarLeftCollapse className="size-[18px]!" />
          </Button>
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="font-bold leading-none hidden lg:inline-block">
              JSON Tree Visualizer
            </span>
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
              setTheme(theme === 'dark' ? 'light' : 'dark');
            }}
          >
            {theme === 'dark' ? <IconSun /> : <IconMoon />}
          </Button>
          <ExportButton />
        </div>
      </div>
    </header>
  );
}
