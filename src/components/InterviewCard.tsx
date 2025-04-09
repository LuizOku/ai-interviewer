import { Interview } from "@/models/interview";
import { Button } from "@/components/Button";
import { AudioPlayer } from "./AudioPlayer";
import { format } from "date-fns";

interface InterviewCardProps {
  interview: Interview;
  onDelete: (id: string) => void;
}

export function InterviewCard({ interview, onDelete }: InterviewCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 transition-colors border border-white/10">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-white">
              Interview on{" "}
              {format(new Date(interview.date), "MMMM d, yyyy 'at' h:mm a")}{" "}
            </h2>
          </div>
          <div className="flex gap-2">
            <Button variant="danger" onClick={() => onDelete(interview.id)}>
              Delete
            </Button>
          </div>
        </div>

        {interview.audioUrl && (
          <div className="mt-4">
            <AudioPlayer audioUrl={interview.audioUrl} />
          </div>
        )}
      </div>
    </div>
  );
}
