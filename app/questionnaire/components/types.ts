export interface Question {
  id: string;
  text: string;
  type?: 'text' | 'radio';
  options?: string[];
}

export interface Step {
  id: string;
  title: string;
  questions?: Question[];
}

export interface FormData {
  [key: string]: any;
}
