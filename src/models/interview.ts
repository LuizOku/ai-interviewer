import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    audioId: String,
    audioUrl: String,
    filename: String,
  },
  {
    timestamps: true,
  }
);

export const Interview =
  mongoose.models.Interview || mongoose.model("Interview", interviewSchema);

export interface InterviewMessage {
  content: Array<{
    type: string;
    text: string;
  }>;
}

export interface Interview {
  _id: string;
  createdAt: string;
  updatedAt: string;
  audioUrl: string | null;
  audioId: string | null;
  filename: string;
}
