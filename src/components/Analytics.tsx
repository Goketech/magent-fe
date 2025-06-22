"use client";
import { usePathname } from "next/navigation";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { useEffect } from "react";

// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const GoogleAnalytic = () => {
  const pathname = usePathname(); // This gives the current path

  useEffect(() => {
    if (!pathname) return;
    // Google Analytics configuration on route change
    window.gtag("config", process.env.NEXT_PUBLIC_GTAG, {
      page_path: pathname,
    });
  }, [pathname]); // Trigger effect whenever the pathname changes

  return (
    <>
      <GoogleAnalytics
        trackPageViews
        gaMeasurementId={process.env.NEXT_PUBLIC_GTAG}
        debugMode={false} // Enable for debugging
      />
    </>
  );
};