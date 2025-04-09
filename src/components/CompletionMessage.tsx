import { AudioPlayer } from "./AudioPlayer";
import { Button } from "./Button";

interface CompletionMessageProps {
  audioUrl: string | null;
  onRestart: () => void;
  onHome: () => void;
}

export function CompletionMessage({
  audioUrl,
  onRestart,
  onHome,
}: CompletionMessageProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-2 sm:p-4">
      <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-gray-700/50 shadow-2xl w-full max-w-lg">
        <div className="p-6 sm:p-8 space-y-4 sm:space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-medium text-white mb-2">
              Interview Complete!
            </h2>
            <p className="text-sm sm:text-base text-gray-300">
              Thank you for participating in this AI interview session. You can
              listen to the recording below.
            </p>
          </div>

          {audioUrl && (
            <div>
              <AudioPlayer audioUrl={audioUrl} />
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
            <Button onClick={onRestart} variant="primary" className="flex-1">
              New Interview
            </Button>
            <Button onClick={onHome} variant="secondary" className="flex-1">
              Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
