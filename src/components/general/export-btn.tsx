import { IconDownload } from '@tabler/icons-react';
import { toPng } from 'html-to-image';
import { toast } from 'sonner';
import { useTheme } from '@/components/general/theme-provider';
import { Button } from '@/components/ui/button';
import { downloadImage } from '@/lib/download-img';
import { cn } from '@/lib/utils';

const IMAGE_WIDTH = 1024;
const IMAGE_HEIGHT = 768;

export function ExportButton() {
  const node = document.querySelector('.react-flow__viewport') as HTMLElement;
  const { theme } = useTheme();

  async function handleDownloadViewportImage() {
    if (!node) {
      return;
    }

    try {
      const dataurl = await toPng(node, {
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        backgroundColor: theme === 'dark' ? '#000' : '#fff',
      });

      downloadImage(dataurl);
    } catch (err) {
      console.log('Error occured', err);
      toast.error('Failed to export');
    }
  }

  return (
    <Button
      size="sm"
      variant="secondary"
      className={cn(
        'border border-primary/40 cursor-pointer rounded-lg px-3 text-sm',
      )}
      onClick={handleDownloadViewportImage}
    >
      <IconDownload className="size-4" />
      <span>Export</span>
    </Button>
  );
}
