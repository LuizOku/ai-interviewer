export interface Message {
  content: Array<{
    type: string;
    text: string;
  }>;
}
