import { serverTimestamp } from "firebase/database";

export interface Transcription {
  id: string;
  title: string;
  transcript: string;
  audioURL: string;
  userId: string;
  createdAt: string | number;
}
