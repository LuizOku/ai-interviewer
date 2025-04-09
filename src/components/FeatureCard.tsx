interface FeatureCardProps {
  emoji: string;
  title: string;
  description: string;
}

export function FeatureCard({ emoji, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
      <div className="text-orange-500 text-3xl mb-4">{emoji}</div>
      <h3 className="text-xl font-medium text-white mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
