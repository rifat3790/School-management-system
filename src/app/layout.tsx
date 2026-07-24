import type { Metadata } from 'next';
import { Hind_Siliguri, Inter } from 'next/font/google';
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWithManagement from '@/components/ChatWithManagement';
import MobileBottomNav from '@/components/MobileBottomNav';
import { ToastProvider } from '@/components/Toast';
import { SCHOOL_INFO } from '@/data/schoolData';

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-hind-siliguri',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${SCHOOL_INFO.name} | ${SCHOOL_INFO.sloganPrimary}`,
  description: `${SCHOOL_INFO.name} - আধুনিক শিক্ষা, নৈতিক মূল্যবোধ এবং প্রযুক্তিনির্ভর ভবিষ্যৎ গড়ার প্রত্যয়ে সেরা ডিজিটাল মডেল হাই স্কুল।`,
  keywords: ['school', 'school management system', 'ডাঃ মুজিব-রুবি মডেল হাই স্কুল', 'ঢাকা স্কুল', 'অনলাইন ভর্তি', 'রেজাল্ট'],
  openGraph: {
    title: SCHOOL_INFO.name,
    description: SCHOOL_INFO.sloganPrimary,
    siteName: SCHOOL_INFO.name,
    locale: 'bn_BD',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} ${inter.variable}`}>
      <body className="bg-schoolBg text-heading min-h-screen flex flex-col antialiased">
        <ToastProvider>
          <Navbar />
          <main className="flex-1 pb-16 xl:pb-0">{children}</main>
          <Footer />
          <ChatWithManagement />
          <MobileBottomNav />
        </ToastProvider>
      </body>
    </html>
  );
}
