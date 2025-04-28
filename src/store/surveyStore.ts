
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, Survey, Question } from '@/types';

const useStore = create<AppState & {
  addSurvey: (survey: Survey) => void;
  updateSurvey: (survey: Survey) => void;
  deleteSurvey: (id: string) => void;
}>()(
  persist(
    (set) => ({
      surveys: [],
      addSurvey: (survey: Survey) => set((state) => ({ 
        surveys: [...state.surveys, survey] 
      })),
      updateSurvey: (survey: Survey) => set((state) => ({ 
        surveys: state.surveys.map(s => s.id === survey.id ? survey : s) 
      })),
      deleteSurvey: (id: string) => set((state) => ({ 
        surveys: state.surveys.filter(s => s.id !== id) 
      })),
    }),
    {
      name: 'survey-store',
    }
  )
);

export default useStore;
