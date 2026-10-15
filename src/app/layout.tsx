import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CT AVA PWA',
  description: 'Sistema CT AVA',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
