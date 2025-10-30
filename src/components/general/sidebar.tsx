import { IconArrowRight } from '@tabler/icons-react';
import { createContext, useContext, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { INITIAL_JSON_DATA } from '@/constants';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import { generateTree } from '@/lib/generate-tree';
import { useAppStoreActions } from '@/store/store';

type SidebarContextState = {
  isSidebarOpen: boolean;
  openSidebar: (value: boolean) => void;
};

const SidebarContext = createContext<SidebarContextState | null>(null);

export function useSidebarContext() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error('Sidebar context must be used within sidebar provider');
  }

  return context;
}

export function SidebarContextProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const value = useMemo(
    () => ({
      isSidebarOpen: isOpen,
      openSidebar: setIsOpen,
    }),
    [isOpen],
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

export function Sidebar() {
  const { isSidebarOpen } = useSidebarContext();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [value, setValue] = useState(INITIAL_JSON_DATA);
  const { setNodes, setEdges } = useAppStoreActions();

  function validateJSON() {
    try {
      const res = JSON.parse(value);
      return res;
    } catch (err) {
      console.log('Error while parsing the JSON', err);
      toast.error('JSON Parsing Failed');
      return null;
    }
  }

  return (
    <aside
      className={cn(
        'relative h-full border-r shrink-0 overflow-hidden',
        'transition-all duration-300 ease-in-out bg-background',
        isSidebarOpen ? 'w-[360px] opacity-100' : 'w-0 opacity-0',
        isMobile ? 'absolute z-40' : 'relative',
      )}
    >
      <div
        className={cn(
          'absolute inset-0 w-[360px] overflow-x-hidden overflow-y-auto',
          'transition-transform ease-in-out duration-300',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="w-full h-full">
          <Textarea
            className="rounded-none w-full h-full border-0 resize-none px-6 py-8"
            placeholder="Enter JSON Here"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </div>
        {value ? (
          <div className="absolute bottom-6 w-full px-8">
            <Button
              size="lg"
              className="w-full cursor-pointer"
              onClick={() => {
                const res = validateJSON();

                if (res) {
                  const { nodes, edges } = generateTree(res);
                  setNodes(nodes);
                  setEdges(edges);
                }
              }}
            >
              <span>Visualize JSON</span>
              <IconArrowRight />
            </Button>
          </div>
        ) : null}
      </div>
    </aside>
  );
}
