import type { Metadata } from 'next';
import { Hind_Siliguri, Inter } from 'next/font/google';
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWithManagement from '@/components/ChatWithManagement';
import MobileBottomNav from '@/components/MobileBottomNav';
import { ToastProvider } from '@/components/Toast';

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
  title: 'ডাঃ মুজিব-রুবি মডেল হাই স্কুল | সুশিক্ষাই উজ্জ্বল ভবিষ্যতের ভিত্তি',
  description: 'ডাঃ মুজিব-রুবি মডেল হাই স্কুল - আধুনিক শিক্ষা, নৈতিক মূল্যবোধ এবং প্রযুক্তিনির্ভর ভবিষ্যৎ গড়ার প্রত্যয়ে সেরা ডিজিটাল মডেল হাই স্কুল।',
  keywords: ['school', 'school management system', 'ডাঃ মুজিব-রুবি মডেল হাই স্কুল', 'শেরপুর মডেল হাই স্কুল', 'অনলাইন ভর্তি', 'রেজাল্ট'],
  openGraph: {
    title: 'ডাঃ মুজিব-রুবি মডেল হাই স্কুল',
    description: 'সুশিক্ষাই উজ্জ্বল ভবিষ্যতের ভিত্তি',
    siteName: 'ডাঃ মুজিব-রুবি মডেল হাই স্কুল',
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
