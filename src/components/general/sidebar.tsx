import { IconAlertCircle, IconCircleCheck } from '@tabler/icons-react';
import { createContext, useContext, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { INITIAL_JSON_DATA } from '@/constants';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { generateTree } from '@/lib/generate-tree';
import { cn } from '@/lib/utils';
import { validateJSON } from '@/lib/validate-json';
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
  const isMobile = useMediaQuery('(max-width: 1000px)');
  const [isOpen, setIsOpen] = useState<boolean>(() => !isMobile);

  console.log('is open', isMobile, isOpen);

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
  const isMobile = useMediaQuery('(max-width: 1000px)');
  const [value, setValue] = useState(INITIAL_JSON_DATA);
  const [isValidJson, setIsValidJson] = useState<boolean>(
    () => !!validateJSON(value),
  );
  const { setNodes, setEdges } = useAppStoreActions();

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
            className="rounded-none w-full h-full border-0 resize-none px-6 py-8 bg-transparent!"
            placeholder="Enter JSON Here"
            value={value}
            onChange={(e) => {
              const value = e.target.value;
              const validationResult = validateJSON(value);
              setValue(value);
              setIsValidJson(!!validationResult);
            }}
          />
        </div>
        {value ? (
          <div className="absolute bottom-6 w-full px-4">
            <div className="flex items-center justify-between bg-muted/60 px-4 py-3 rounded-md">
              <div
                className={cn(
                  'flex items-center text-xs gap-1',
                  isValidJson ? 'text-green-500' : 'text-destructive',
                )}
              >
                {isValidJson ? (
                  <IconCircleCheck className="size-4" />
                ) : (
                  <IconAlertCircle className="size-4" />
                )}
                <span className="mt-px">
                  {isValidJson ? 'Valid Json' : 'Invalid Json'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs cursor-pointer"
                  onClick={() => {
                    setValue('');
                    setIsValidJson(false);
                  }}
                >
                  Clear
                </Button>
                <Button
                  size="sm"
                  className="cursor-pointer h-7 text-xs"
                  disabled={!isValidJson}
                  onClick={() => {
                    const res = validateJSON(value);

                    if (res) {
                      const { nodes, edges } = generateTree(res);
                      setNodes(nodes);
                      setEdges(edges);
                    }
                  }}
                >
                  <span>Visualize</span>
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </aside>
  );
}
