"use client";

import { useEffect, useState } from "react";
import { Interview } from "@/models/interview";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { InterviewCard } from "@/components/InterviewCard";

export default function HistoryPage() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await fetch("/api/interviews");
        const data = await response.json();
        setInterviews(data);
      } catch (error) {
        console.error("Failed to fetch interviews:", error);
      }
    };

    fetchInterviews();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch("/api/interviews", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      setInterviews(interviews.filter((interview) => interview.id !== id));
    } catch (error) {
      console.error("Failed to delete interview:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#202124] text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-orange-500/10 via-transparent to-transparent" />
      <div className="absolute top-1/4 right-1/4 w-24 h-24 rounded-full bg-orange-500/20 blur-xl" />
      <div className="absolute bottom-1/4 left-1/4 w-32 h-32 rounded-full bg-orange-500/10 blur-xl" />

      <div className="relative">
        <Header
          started={false}
          completed={false}
          onFinish={() => {}}
          onBackHome={() => router.push("/")}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8 text-white">
            Interview History
          </h1>

          <div className="grid gap-6">
            {interviews.map((interview) => (
              <InterviewCard
                key={interview.id}
                interview={interview}
                onDelete={handleDelete}
              />
            ))}

            {interviews.length === 0 && (
              <div className="text-center text-gray-400 py-12">
                No interviews found. Complete an interview to see it here.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
