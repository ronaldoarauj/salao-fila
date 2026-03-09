'use client';  // Importante: precisa ser client component

import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}