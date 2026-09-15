import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ProgressState = 'not_started' | 'in_progress' | 'completed';

interface StoreState {
  progress: Record<string, ProgressState>;
  theme: 'light' | 'dark';
  setProgress: (lessonId: string, state: ProgressState) => void;
  toggleTheme: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      progress: {},
      theme: 'light',
      setProgress: (lessonId, state) => 
        set((prev) => ({
          progress: { ...prev.progress, [lessonId]: state }
        })),
      toggleTheme: () =>
        set((prev) => ({ theme: prev.theme === 'light' ? 'dark' : 'light' })),
    }),
    {
      name: 'curriculum-storage',
    }
  )
);
