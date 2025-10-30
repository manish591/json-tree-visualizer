import { Canvas } from '@/components/general/canvas';
import { Header } from '@/components/general/header';
import { Sidebar } from '@/components/general/sidebar';

export default function App() {
  return (
    <div className="h-svh p-2 grid bg-sidebar overflow-hidden">
      <div className="relative border rounded-sm h-full flex flex-col z-1 overflow-hidden">
        <Header />
        <div className="relative rounded-b-sm flex-1 overflow-hidden w-full bg-background flex">
          <Sidebar />
          <Canvas />
        </div>
      </div>
    </div>
  );
}
