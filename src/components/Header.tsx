import { Button } from "./Button";

interface HeaderProps {
  started: boolean;
  completed: boolean;
  onFinish: () => void;
  onBackHome: () => void;
}

export function Header({
  started,
  completed,
  onFinish,
  onBackHome,
}: HeaderProps) {
  return (
    <header className="h-16 border-b border-gray-700 flex items-center justify-between px-4">
      <h1
        onClick={onBackHome}
        className="text-xl font-medium hover:text-orange-400 transition-colors cursor-pointer"
      >
        AI Interview
      </h1>
      <div className="flex items-center space-x-2">
        {started && !completed && (
          <Button variant="danger" icon="call_end" onClick={onFinish}>
            End Interview
          </Button>
        )}
        {completed && (
          <Button variant="secondary" icon="home" onClick={onBackHome}>
            Back to Home
          </Button>
        )}
      </div>
    </header>
  );
}
