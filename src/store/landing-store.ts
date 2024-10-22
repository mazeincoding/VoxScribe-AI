import { create } from "zustand";

interface LandingStore {
  active_transcript: "formatted" | "unformatted";
  set_active_transcript: (transcript: "formatted" | "unformatted") => void;
}

export const useLandingStore = create<LandingStore>()(() => ({
  active_transcript: "formatted" as const,
  set_active_transcript: (transcript: "formatted" | "unformatted") => {
    useLandingStore.setState({ active_transcript: transcript });
  },
}));
