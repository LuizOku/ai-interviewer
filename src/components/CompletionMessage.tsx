import { AudioPlayer } from "./AudioPlayer";
import { Button } from "./Button";

interface CompletionMessageProps {
  audioUrl: string | null;
  onRestart: () => void;
  onHome: () => void;
  onSave: () => void;
  isSaving?: boolean;
}

export function CompletionMessage({
  audioUrl,
  onRestart,
  onHome,
  onSave,
  isSaving = false,
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
              listen to your recording below. Choose to save this interview,
              retry for a new attempt, or return to the home page.
            </p>
          </div>

          {audioUrl && (
            <div>
              <AudioPlayer audioUrl={audioUrl} />
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2">
            <Button
              onClick={onSave}
              variant="primary"
              className="col-span-2"
              disabled={!audioUrl || isSaving}
            >
              {isSaving ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                </div>
              ) : (
                "Save Interview"
              )}
            </Button>
            <Button onClick={onRestart} variant="secondary">
              Retry
            </Button>
            <Button onClick={onHome} variant="white">
              Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
