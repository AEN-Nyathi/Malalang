export type QuestionOption = {
  value: string;
  label: string;
};

export interface Question {
  id: string;
  text: string;
  description?: string;
  type:
    | 'text'
    | 'email'
    | 'tel'
    | 'textarea'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'file-upload'
    | 'color-picker';
  options?: string[] | QuestionOption[] | { [key: string]: string[] };
  placeholder?: string;
  required?: boolean;
  subQuestions?: Question[];
  dependsOn?: string;
  showIf?: (value: any) => boolean;
  aiSupport?: 'suggestion' | 'enhancement';
  default?: any;
}

export interface Step {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export interface FormData {
  [key: string]: any;
}
