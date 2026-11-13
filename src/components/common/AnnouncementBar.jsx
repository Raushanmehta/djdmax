import React from "react";

const announcements = [
  "🚀 Free Shipping on Orders Above ₹999",
  "🔥 New Collection is Live",
  "🎉 Get 20% Off on Your First Order",
  "📦 Fast & Secure Delivery",
];

const AnnouncementBar = () => {
  const repeatedAnnouncements = [...announcements, ...announcements];

  return (
    <div className="w-full overflow-hidden bg-black dark:bg-orange-500 dark:text-black text-white ">
      <div className="announcement-track flex ">
        {repeatedAnnouncements.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="announcement-item flex shrink-0 items-center  py-3 text-sm font-medium"
          >
            <span>{item}</span>
            <span className="ml-8 text-gray-400">•</span>
          </div>
        ))}
      </div>

      <style>{`
        .announcement-track {
          animation: announcementScroll 22s linear infinite;
          will-change: transform;
        }

        .announcement-track:hover {
          animation-play-state: paused;
        }

        @keyframes announcementScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default AnnouncementBar;