export interface InterviewMessage {
  content: Array<{
    type: string;
    text: string;
  }>;
}

export interface Interview {
  id: string;
  date: string;
  audioUrl: string | null;
}
