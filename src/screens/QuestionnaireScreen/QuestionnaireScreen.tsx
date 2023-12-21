import { View, StyleSheet } from 'react-native';
import {
  QuestionnaireNavigationProp,
  QuestionnaireRouteProp,
} from '../../navigation/types';
import Questionnaire1 from '../../data/Questionnaire1.json';
import Questionnaire2 from '../../data/Questionnaire2.json';
import Questionnaire3 from '../../data/Questionnaire3.json';
import { Questionnaire } from 'fhir/r5';
import { useEffect, useState } from 'react';
import { QuestionText } from './QuestionText/QuestionText';
import { QuestionNumber } from './QuestionNumber/QuestionNumber';
import { QuestionChoice } from './QuestionChoice/QuestionChoice.tsx';
import { QuestionDisplay } from './QuestionDisplay/QuestionDisplay.tsx';
import { ActionBar } from './ActionBar/ActionBar.tsx';

export const QuestionnaireScreen = ({
  navigation,
  route,
}: {
  navigation: QuestionnaireNavigationProp;
  route: QuestionnaireRouteProp;
}) => {
  const { name } = route.params;
  const questionnaireConfig = QUESTIONNAIRES[name];
  const [stepIndex, setStepIndex] = useState(0);

  console.log(questionnaireConfig.item);
  const step = questionnaireConfig.item?.[stepIndex];

  useEffect(() => {
    navigation.setOptions({
      title: questionnaireConfig.title,
    });
  }, [questionnaireConfig.title]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!step) return null;

  let stepComponent;
  switch (step.type) {
    case 'text':
      stepComponent = <QuestionText title={step.text} />;
      break;
    case 'quantity':
    case 'integer':
      stepComponent = <QuestionNumber title={step.text} />;
      break;
    case 'coding':
      const options = (step.answerOption ?? []).map(option => ({
        label: option.valueCoding?.display ?? '',
        value: option.valueCoding?.code ?? '',
      }));
      stepComponent = (
        <QuestionChoice
          title={step.text}
          options={options}
        />
      );
      break;
    case 'display':
      stepComponent = <QuestionDisplay text={step.text} />;
      break;
    default:
      stepComponent = null;
  }

  return (
    <View style={styles.root}>
      <View style={{ marginBottom: 'auto' }}>{stepComponent}</View>
      <ActionBar
        onGoBack={() => {
          if (stepIndex > 0) {
            setStepIndex(i => i - 1);
          } else {
            navigation.goBack();
          }
        }}
        onGoNext={() => {
          if (stepIndex < (questionnaireConfig.item?.length ?? 0) - 1)
            setStepIndex(i => i + 1);
        }}
      />
    </View>
  );
};

const QUESTIONNAIRES: { [key: string]: Questionnaire } = {
  Questionnaire1: Questionnaire1.questionnaire as Questionnaire,
  Questionnaire2: Questionnaire2.questionnaire as Questionnaire,
  Questionnaire3: Questionnaire3.questionnaire as Questionnaire,
};

const styles = StyleSheet.create({
  root: {
    padding: 20,
    flexGrow: 1,
  },
});
