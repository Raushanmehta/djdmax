import { Card } from "@/components/ui/card";

export default function TrustedCard({ video }) {
  return (
    <Card className="h-full overflow-hidden rounded-2xl border-gray-200 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-400 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
      <video
        className="aspect-video h-96 w-full bg-black object-cover"
        src={video.src}
        preload="metadata"
        aria-label={video.title}
      >
        Your browser does not support the video tag.
      </video>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {video.title}
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Location: Mumbai, India
        </p>
      </div>
    </Card>
  );
}