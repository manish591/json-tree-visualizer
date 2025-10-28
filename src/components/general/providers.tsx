import type { PropsWithChildren } from 'react';
import { ThemeContextProvider } from './theme-provider';

export function Providers({ children }: Readonly<PropsWithChildren>) {
  return (
    <ThemeContextProvider defaultTheme="light">{children}</ThemeContextProvider>
  );
}
