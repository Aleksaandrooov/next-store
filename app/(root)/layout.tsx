import type { Metadata } from 'next';
import { Header } from '@/components/shared/header';
import { MainHeader } from '@/components/shared/MainHeader';
import { Footer } from '@/components/shared/footer';
import { HeaderMobile } from '@/components/shared/HeaderMobile';
import { Nunito } from 'next/font/google';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Create Next | App',
  description: 'Generated by create next app',
};

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={cn('flex flex-col min-h-svh relative ' + nunito.className)}>
      <MainHeader className="max-xl:hidden" />
      <Header className="sticky top-0 z-40 bg-white max-xl:relative" />
      <div className="flex-1 min-h-[600px]">{children}</div>
      <Footer />
      <HeaderMobile className="bg-white h-16 sticky bottom-0 z-30 shadow-inner xl:hidden" />
    </main>
  );
}
