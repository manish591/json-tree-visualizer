import type { PropsWithChildren } from 'react';
import { SidebarContextProvider } from '@/components/general/sidebar';
import { ThemeContextProvider } from '@/components/general/theme-provider';
import { Toaster } from '@/components/ui/sonner';

export function Providers({ children }: Readonly<PropsWithChildren>) {
  return (
    <ThemeContextProvider defaultTheme="light">
      <SidebarContextProvider>{children}</SidebarContextProvider>
      <Toaster position="top-center" />
    </ThemeContextProvider>
  );
}
