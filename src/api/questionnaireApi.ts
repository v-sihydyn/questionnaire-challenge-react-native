import { Questionnaire } from 'fhir/r5';
import Questionnaire1 from '../data/Questionnaire1.json';
import Questionnaire2 from '../data/Questionnaire2.json';
import Questionnaire3 from '../data/Questionnaire3.json';

export const fetchQuestionnaireConfig = async (name: string) => {
  return QUESTIONNAIRES[name] ?? null;
};

const QUESTIONNAIRES: { [key: string]: Questionnaire } = {
  Questionnaire1: Questionnaire1.questionnaire as Questionnaire,
  Questionnaire2: Questionnaire2.questionnaire as Questionnaire,
  Questionnaire3: Questionnaire3.questionnaire as Questionnaire,
};
