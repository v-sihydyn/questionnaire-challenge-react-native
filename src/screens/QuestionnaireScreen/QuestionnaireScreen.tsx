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
import { QuestionChoice } from './QuestionChoice/QuestionChoice';
import { QuestionDisplay } from './QuestionDisplay/QuestionDisplay';
import { v4 as uuidv4 } from 'uuid';
import { Button, ProgressBar } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';
import { Answer, Option } from '../../types';

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
  const [questions] = useState(() =>
    (questionnaireConfig.item ?? []).map(q => ({
      ...q,
      linkId: q.linkId || uuidv4(),
      text: q.text?.replace(/\<br \/>/gm, '\n'),
    }))
  );
  const step = questions[stepIndex];
  const [answers, setAnswers] = useState(() => {
    return questions
      .filter(x => x.type !== 'display')
      .reduce<Record<string, Answer>>((acc, question) => {
        acc[question.linkId] = {
          question: question,
          value: question.type === 'coding' ? null : '',
        };

        return acc;
      }, {});
  });
  const currentAnswer = answers[step.linkId];

  useEffect(() => {
    navigation.setOptions({
      title: questionnaireConfig.title,
    });
  }, [questionnaireConfig.title]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!step) return null;

  const updateCurrentAnswer = (value: string | Option | null) => {
    setAnswers(prev => ({
      ...prev,
      [step.linkId]: {
        ...prev[step.linkId],
        value,
      },
    }));
  };

  let stepComponent;
  switch (step.type) {
    case 'text':
      stepComponent = (
        <QuestionText
          title={step.text}
          value={currentAnswer.value as string}
          onChange={updateCurrentAnswer}
          required={step.required}
        />
      );
      break;
    case 'integer':
      stepComponent = (
        <QuestionNumber
          title={step.text}
          value={currentAnswer.value as string}
          onChange={updateCurrentAnswer}
          required={step.required}
        />
      );
      break;
    case 'quantity':
      const unitType = step.extension?.find(
        x => x.url === 'unitType'
      )?.valueString;
      stepComponent = (
        <QuestionNumber
          title={step.text}
          value={currentAnswer.value as string}
          onChange={updateCurrentAnswer}
          required={step.required}
          unitType={unitType}
        />
      );
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
          value={(currentAnswer?.value as Option)?.value ?? ''}
          onChange={updateCurrentAnswer}
          required={step.required}
        />
      );
      break;
    case 'display':
      stepComponent = <QuestionDisplay text={step.text} />;
      break;
    default:
      stepComponent = null;
  }

  const isLastStep = stepIndex === questions.length - 1;
  const isSomeRequiredAnswerInvalid = Object.values(answers).some(
    a => !a.value
  );
  const progress = stepIndex / (questions.length - 1);

  return (
    <View style={styles.root}>
      <ProgressBar progress={progress} />
      <View style={styles.content}>
        <View style={{ marginBottom: 'auto' }}>{stepComponent}</View>
        <View style={styles.actionBar}>
          <Button
            icon="arrow-left-thin"
            mode="outlined"
            onPress={() => {
              if (stepIndex > 0) {
                setStepIndex(i => i - 1);
              } else {
                navigation.goBack();
              }
            }}
          >
            Back
          </Button>
          {!isLastStep && (
            <Button
              icon="arrow-right-thin"
              mode="contained"
              onPress={() => {
                if (stepIndex < questions.length - 1) setStepIndex(i => i + 1);
              }}
            >
              Next
            </Button>
          )}
          {isLastStep && (
            <Button
              mode="contained"
              onPress={() => {
                if (!isSomeRequiredAnswerInvalid) {
                  navigation.dispatch(
                    StackActions.replace('Summary', {
                      answers: Object.values(answers),
                    })
                  );
                }
              }}
              disabled={isSomeRequiredAnswerInvalid}
            >
              Submit
            </Button>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
    flexGrow: 1,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const QUESTIONNAIRES: { [key: string]: Questionnaire } = {
  Questionnaire1: Questionnaire1.questionnaire as Questionnaire,
  Questionnaire2: Questionnaire2.questionnaire as Questionnaire,
  Questionnaire3: Questionnaire3.questionnaire as Questionnaire,
};
