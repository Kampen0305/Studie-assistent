export interface ChatMessage {
  role: 'user' | 'assistant' | 'error';
  content: string;
}

export interface Idea {
  titel: string;
  beschrijving: string;
}
