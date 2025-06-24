// hooks/useAnalytics.ts
// @ts-ignore
import { useEffect } from "react";
// @ts-ignore
import { logEvent, Analytics } from "firebase/analytics";
import { analytics } from "../../firebase";

export function useAnalytics() {
  const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (analytics) {
      logEvent(analytics, eventName, parameters);
    }
  };

  const trackPageView = (pageName: string, pageTitle?: string) => {
    if (analytics) {
      logEvent(analytics, "page_view", {
        page_title: pageTitle || document.title,
        page_location: window.location.href,
        page_path: pageName,
      });
    }
  };

  const trackUserEngagement = (engagementTimeMs: number) => {
    if (analytics) {
      logEvent(analytics, "user_engagement", {
        engagement_time_msec: engagementTimeMs,
      });
    }
  };

  const trackCustomEvent = (
    eventName: string,
    eventData: Record<string, any>,
  ) => {
    if (analytics) {
      logEvent(analytics, eventName, eventData);
    }
  };

  return {
    trackEvent,
    trackPageView,
    trackUserEngagement,
    trackCustomEvent,
  };
}
