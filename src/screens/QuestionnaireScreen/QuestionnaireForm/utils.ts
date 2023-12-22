import { v4 as uuidv4 } from 'uuid';
import { QuestionnaireItem } from 'fhir/r5';
import { Answer } from '../../../types.ts';

export const mapQuestions = (
  questions: QuestionnaireItem[]
): QuestionnaireItem[] =>
  questions.map(q => ({
    ...q,
    linkId: q.linkId || uuidv4(),
    text: q.text?.replace(/\<br \/>/gm, '\n'),
  }));

export const createAnswersMap = (questions: QuestionnaireItem[]) =>
  questions
    .filter(x => x.type !== 'display')
    .reduce<Record<string, Answer>>((acc, question) => {
      acc[question.linkId] = {
        question: question,
        value: question.type === 'coding' ? null : '',
        isValid: (value: any) => {
          if (question.required) {
            if (value === '' || value === null) {
              return 'This field is required';
            }
          }

          if (question.type === 'integer' || question.type === 'quantity') {
            // Values 0 and 10 are hardcoded since there are no such constraints in questionnaire configs
            if (value < 0) {
              return 'Value should be greater than or equal to 0';
            }

            if (value >= 10) {
              return 'Value should be less than or equal to 10';
            }
          }
        },
      };

      return acc;
    }, {});

export const createErrorsMap = (answers: Record<string, Answer>) =>
  Object.keys(answers).reduce<{ [key: string]: string | undefined }>(
    (acc, current) => {
      acc[current] = answers[current].isValid(answers[current].value);
      return acc;
    },
    {}
  );

export const createTouchedMap = (answers: Record<string, Answer>) =>
  Object.keys(answers).reduce<{ [key: string]: boolean }>((acc, current) => {
    acc[current] = false;
    return acc;
  }, {});

export const validateAnswers = (answers: Record<string, Answer>) =>
  Object.keys(answers).reduce<{
    [key: string]: string | undefined;
  }>((acc, current) => {
    const message = answers[current].isValid(answers[current].value);
    if (message) {
      acc[current] = message;
    }

    return acc;
  }, {});
