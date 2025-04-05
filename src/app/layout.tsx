import type {Metadata} from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/components/Navbar';
import {ClerkProvider} from '@/components/ClerkProviderWrapper';
import {ThemeWrapper} from '@/components/ThemeProvider';
import Sidebar from '@/components/Sidebar';
import {Toaster} from 'react-hot-toast';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
});

export const metadata: Metadata = {
  title: 'Socially - A Social Media App',
  description: 'A social media app built with Next.js, Prisma, and Clerk'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider>
          <ThemeWrapper>
            <div className="min-h-screen">
              <Navbar />
              <main className="py-8">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="hidden lg:block lg:col-span-3">
                      <Sidebar />
                    </div>
                    <div className="lg:col-span-9">{children}</div>
                    <Toaster position="top-center" />
                  </div>
                </div>
              </main>
            </div>
          </ThemeWrapper>
        </ClerkProvider>
      </body>
    </html>
  );
}
