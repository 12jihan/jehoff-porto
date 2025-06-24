// utils/analyticsEvents.ts
import { logEvent } from "firebase/analytics";
import { analytics } from "../../firebase";

export const trackUserActions = {
  // E-commerce events
  addToCart: (itemId: string, itemName: string, price: number) => {
    if (analytics) {
      logEvent(analytics, "add_to_cart", {
        currency: "USD",
        value: price,
        items: [
          {
            item_id: itemId,
            item_name: itemName,
            price: price,
          },
        ],
      });
    }
  },

  // User engagement
  shareContent: (contentType: string, contentId: string) => {
    if (analytics) {
      logEvent(analytics, "share", {
        content_type: contentType,
        content_id: contentId,
      });
    }
  },

  // Search events
  search: (searchTerm: string, resultCount: number) => {
    if (analytics) {
      logEvent(analytics, "search", {
        search_term: searchTerm,
        result_count: resultCount,
      });
    }
  },

  // Video engagement
  videoPlay: (videoTitle: string, videoDuration: number) => {
    if (analytics) {
      logEvent(analytics, "video_start", {
        video_title: videoTitle,
        video_duration: videoDuration,
      });
    }
  },

  // Download tracking
  fileDownload: (fileName: string, fileType: string) => {
    if (analytics) {
      logEvent(analytics, "file_download", {
        file_name: fileName,
        file_extension: fileType,
        link_url: window.location.href,
      });
    }
  },
};
