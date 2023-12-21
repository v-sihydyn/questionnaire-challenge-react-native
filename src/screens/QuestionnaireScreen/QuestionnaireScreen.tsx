import { View, Text } from 'react-native';
import {
  QuestionnaireNavigationProp,
  QuestionnaireRouteProp,
} from '../../navigation/types';
import Questionnaire1 from '../../data/Questionnaire1.json';
import Questionnaire2 from '../../data/Questionnaire2.json';
import Questionnaire3 from '../../data/Questionnaire3.json';
import { Questionnaire } from 'fhir/r5';
import { useEffect } from 'react';

export const QuestionnaireScreen = ({
  navigation,
  route,
}: {
  navigation: QuestionnaireNavigationProp;
  route: QuestionnaireRouteProp;
}) => {
  const { name } = route.params;
  const questionnaireConfig = QUESTIONNAIRES[name];

  console.log(questionnaireConfig.item);

  useEffect(() => {
    navigation.setOptions({
      title: questionnaireConfig.title,
    });
  }, []);

  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
};

const QUESTIONNAIRES: { [key: string]: Questionnaire } = {
  Questionnaire1: Questionnaire1.questionnaire as Questionnaire,
  Questionnaire2: Questionnaire2.questionnaire as Questionnaire,
  Questionnaire3: Questionnaire3.questionnaire as Questionnaire,
};
