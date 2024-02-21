import type { Metadata } from 'next';
import { UserWrapper } from '@/context/userContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Plant Market',
  description: 'Plant Collection',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <UserWrapper>{children}</UserWrapper>
      </body>
    </html>
  );
}
