import React from 'react';
import HeroSection from '@/components/HeroSection';
import QuickLinksSection from '@/components/QuickLinksSection';
import PrincipalMessage from '@/components/PrincipalMessage';
import FeaturesGrid from '@/components/FeaturesGrid';
import InfoHubSection from '@/components/InfoHubSection';
import AchievementsBanner from '@/components/AchievementsBanner';
import TeachersGridSection from '@/components/TeachersGridSection';
import GalleryAndVirtualTour from '@/components/GalleryAndVirtualTour';
import AdmissionStepper from '@/components/AdmissionStepper';
import { getSiteSettings, getNotices, getTeachers, getGallery } from '@/lib/dataFetchers';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [siteSettings, notices, teachers, gallery] = await Promise.all([
    getSiteSettings(),
    getNotices(10),
    getTeachers(10),
    getGallery(12),
  ]);

  return (
    <div className="bg-slate-50 min-h-screen space-y-0 selection:bg-blue-600 selection:text-white">
      {/* 1. Banner & Polygon Background + 4 Stat Floating Cards */}
      <HeroSection settings={siteSettings} />

      {/* 2. Quick Links Grid (6 Cards) */}
      <QuickLinksSection settings={siteSettings} />

      {/* 3. Principal Message & About Us Side-by-Side */}
      <PrincipalMessage settings={siteSettings} />

      {/* 4. Why Choose Our School (8 Features Grid) */}
      <FeaturesGrid />

      {/* 5. 3-Column Info Hub (Academic Depts | Latest Notices | Upcoming Events) */}
      <InfoHubSection 
        notices={notices} 
        events={siteSettings?.events} 
        academicPrograms={siteSettings?.academicPrograms} 
      />

      {/* 6. Our Achievements Banner (Dark Navy Full-Width Section) */}
      <AchievementsBanner settings={siteSettings} />

      {/* 7. Faculty / Teachers Grid (6 Profile Cards) */}
      <TeachersGridSection teachers={teachers} />

      {/* 8. Gallery & Virtual Campus Tour Side-by-Side */}
      <GalleryAndVirtualTour gallery={gallery} />

      {/* 9. Admission Stepper Process (6 Step Cards) */}
      <AdmissionStepper />
    </div>
  );
}
