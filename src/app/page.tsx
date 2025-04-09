"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/Button";
import { FeatureCard } from "@/components/FeatureCard";

const features = [
  {
    emoji: "🎤",
    title: "Real-time Conversation",
    description:
      "Engage in natural, flowing conversations with our advanced AI interviewer that adapts to your responses.",
  },
  {
    emoji: "🎯",
    title: "Professional Experience",
    description:
      "Get a realistic interview experience with our AI that simulates real-world scenarios.",
  },
  {
    emoji: "📱",
    title: "Record & Review",
    description:
      "Access recordings of your interviews to analyze your performance and track improvement.",
  },
];

export default function Home() {
  const router = useRouter();

  const startInterview = () => {
    router.push("/interview");
  };

  return (
    <div className="min-h-screen bg-[#202124] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-orange-500/10 via-transparent to-transparent" />
      <div className="absolute top-1/4 right-1/4 w-24 h-24 rounded-full bg-orange-500/20 blur-xl" />
      <div className="absolute bottom-1/4 left-1/4 w-32 h-32 rounded-full bg-orange-500/10 blur-xl" />

      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">AI-powered</span>
              <span className="block text-orange-500">
                interview experience
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-2xl">
              Experience real-time AI interviews that adapt to your responses.
              Our advanced AI creates a natural conversation flow while
              providing meaningful insights into your interview performance.
            </p>
            <div className="mt-8">
              <Button onClick={startInterview}>Start Interview</Button>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="w-full aspect-square relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent rounded-full animate-pulse" />
              <div className="absolute inset-4 bg-gradient-to-tr from-orange-500/30 to-transparent rounded-full animate-pulse delay-75" />
              <div className="absolute inset-8 bg-gradient-to-tr from-orange-500/40 to-transparent rounded-full animate-pulse delay-150" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[80%] h-[80%]">
                  <Image
                    src="/robot.png"
                    alt="AI Interview Robot"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              emoji={feature.emoji}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready for your interview?</span>
            <span className="block text-orange-400">
              Start now and showcase your best self.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Button variant="white" onClick={startInterview}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
