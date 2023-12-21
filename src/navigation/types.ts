import { NavigationProp, RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Dashboard: undefined;
  Questionnaire: {
    name: string;
  };
};

export type DashboardNavigationProp = NavigationProp<
  RootStackParamList,
  'Dashboard'
>;

export type QuestionnaireRouteProp = RouteProp<
  RootStackParamList,
  'Questionnaire'
>;
