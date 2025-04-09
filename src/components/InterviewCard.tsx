import { Interview } from "@/models/interview";
import { Button } from "@/components/Button";

interface InterviewCardProps {
  interview: Interview;
  onDelete: (id: string) => void;
}

export function InterviewCard({ interview, onDelete }: InterviewCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 transition-colors border border-white/10">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold mb-2 text-white">
            Interview on {new Date(interview.date).toLocaleDateString()}
          </h2>
          <p className="text-gray-300">
            Duration: {Math.floor(interview.duration / 60)}m{" "}
            {interview.duration % 60}s
          </p>
          <p className="text-gray-300">Messages: {interview.messages.length}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="danger" onClick={() => onDelete(interview.id)}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
