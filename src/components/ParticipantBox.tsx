interface ParticipantBoxProps {
  type: "user" | "ai";
}

export function ParticipantBox({ type }: ParticipantBoxProps) {
  return (
    <div className="bg-gray-900/40 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl p-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
          <span className="material-icons text-2xl text-orange-500">
            {type === "user" ? "person" : "smart_toy"}
          </span>
        </div>
        <div>
          <h2 className="text-xl font-medium text-white">
            {type === "user" ? "You" : "AI Interviewer"}
          </h2>
          <p className="text-gray-400">
            {type === "user" ? "Interviewee" : "Assistant"}
          </p>
        </div>
      </div>
    </div>
  );
}
