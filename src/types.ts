import { QuestionnaireItem } from 'fhir/r5';

export type Answer = {
  question: QuestionnaireItem;
  value: Option | string | null;
  isValid: (value: any) => string | undefined;
};

export type Option = {
  label: string;
  value: string;
};
