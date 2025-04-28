
export type QuestionType = 'text' | 'multipleChoice' | 'checkbox' | 'rating';

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  title: string;
  type: QuestionType;
  required: boolean;
  options: Option[];
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
}

export interface AppState {
  surveys: Survey[];
}
