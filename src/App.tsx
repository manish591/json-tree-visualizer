import { useTheme } from '@/components/general/theme-provider';
import { Button } from '@/components/ui/button';

export default function App() {
  const { setTheme } = useTheme();

  return (
    <div className="min-h-svh p-2 grid bg-sidebar">
      <div className="relative border rounded-sm h-full flex flex-col z-1 overflow-hidden">
        {/* <Header /> */}
        <Button
          onClick={() => {
            setTheme('light');
          }}
        >
          Submit
        </Button>
        <div className="relative rounded-b-sm flex-1 h-full w-full bg-background flex">
          {/* <Sidebar />
          <NodesCanvas /> */}
        </div>
      </div>
    </div>
  );
}
