interface AudioPlayerProps {
  audioUrl: string;
}

export function AudioPlayer({ audioUrl }: AudioPlayerProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4">
      <audio controls className="w-full">
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
