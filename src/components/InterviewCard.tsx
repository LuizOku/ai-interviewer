import { Interview } from "@/models/interview";
import { Button } from "@/components/Button";
import { AudioPlayer } from "./AudioPlayer";
import { format } from "date-fns";

interface InterviewCardProps {
  interview: Interview;
  onDelete: (id: string) => void;
}

export function InterviewCard({ interview, onDelete }: InterviewCardProps) {
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

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
      return format(date, "MMMM d, yyyy 'at' h:mm a");
    } catch {
      return "Invalid date";
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 transition-colors border border-white/10">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-white">
              Interview on {formatDate(interview.createdAt)}
            </h2>
          </div>
          <div className="flex gap-2">
            <Button variant="danger" onClick={() => onDelete(interview._id)}>
              Delete
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
