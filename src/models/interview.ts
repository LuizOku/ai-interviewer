export interface InterviewMessage {
  content: Array<{
    type: string;
    text: string;
  }>;
}

export interface Interview {
  id: string;
  date: string;
  messages: InterviewMessage[];
  audioUrl: string | null;
  duration: number;
}
