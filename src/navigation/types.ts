import { NavigationProp, RouteProp } from '@react-navigation/native';
import { Answer } from '../types';

export type RootStackParamList = {
  Dashboard: undefined;
  Questionnaire: {
    name: string;
  };
  Summary: {
    answers: Answer[];
  };
};

export type DashboardNavigationProp = NavigationProp<
  RootStackParamList,
  'Dashboard'
>;

export type QuestionnaireNavigationProp = NavigationProp<
  RootStackParamList,
  'Questionnaire'
>;

export type QuestionnaireRouteProp = RouteProp<
  RootStackParamList,
  'Questionnaire'
>;

export type SummaryRouteProp = RouteProp<RootStackParamList, 'Summary'>;
