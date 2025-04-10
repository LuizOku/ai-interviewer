import { Interview } from "@/models/interview";
import { Button } from "@/components/Button";
import { AudioPlayer } from "./AudioPlayer";
import { formatDate } from "@/utils/date";

interface InterviewCardProps {
  interview: Interview;
  onDelete: (id: string) => Promise<void>;
  isDeleting: boolean;
}

export function InterviewCard({
  interview,
  onDelete,
  isDeleting,
}: InterviewCardProps) {
  const getAudioUrl = () => {
    if (interview.audioId) {
      const baseUrl =
        typeof window !== "undefined"
          ? window.location.origin
          : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      return `${baseUrl}/api/audio/${interview.audioId}`;
    }
    return interview.audioUrl;
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 transition-colors border border-white/10">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-white">
              Interview on {formatDate(interview.createdAt)}
            </h2>
            <p className="text-sm text-gray-400 mt-1">{interview.filename}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="danger"
              onClick={() => onDelete(interview._id)}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-red-400"></div>
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <AudioPlayer audioUrl={getAudioUrl() || ""} />
        </div>
      </div>
    </div>
  );
}
