import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Answer, Option } from '../../../types';
import { Questionnaire } from 'fhir/r5';
import { Button, HelperText, ProgressBar } from 'react-native-paper';
import { StackActions, useNavigation } from '@react-navigation/native';
import { QuestionnaireNavigationProp } from '../../../navigation/types';
import {
  createAnswersMap,
  createErrorsMap,
  createTouchedMap,
  mapQuestions,
  validateAnswers,
} from './utils';
import { QuestionFactory } from '../QuestionFactory/QuestionFactory';

type Props = {
  questionnaireConfig: Questionnaire;
};

export const QuestionnaireForm = ({ questionnaireConfig }: Props) => {
  const navigation = useNavigation<QuestionnaireNavigationProp>();
  const [stepIndex, setStepIndex] = useState(0);
  const [questions] = useState(() =>
    mapQuestions(questionnaireConfig.item ?? [])
  );
  const step = questions[stepIndex];
  const [answers, setAnswers] = useState<Record<string, Answer>>(() =>
    createAnswersMap(questions)
  );
  const [errors, setErrors] = useState(() => createErrorsMap(answers));
  const [touched, setTouched] = useState(() => createTouchedMap(answers));
  const currentAnswer = answers[step.linkId];

  const updateCurrentAnswer = (value: string | Option | null) => {
    setAnswers(prev => ({
      ...prev,
      [step.linkId]: {
        ...prev[step.linkId],
        value,
      },
    }));

    if (!touched[step.linkId]) {
      setTouched(prev => ({
        ...prev,
        [step.linkId]: true,
      }));
    }

    setErrors(prev => ({
      ...prev,
      [step.linkId]: answers[step.linkId].isValid(value),
    }));
  };

  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === questions.length - 1;
  const progress = stepIndex / (questions.length - 1);
  const hasErrors = Object.keys(errors).some(
    errorKey => Boolean(errors[errorKey]) && touched[errorKey]
  );

  if (!step) return null;

  const handleGoToPreviousStep = () => {
    if (stepIndex > 0) {
      setStepIndex(i => i - 1);
    }
  };

  const handleGoToNextStep = () => {
    if (stepIndex < questions.length - 1) setStepIndex(i => i + 1);
  };

  const handleSubmit = () => {
    setTouched(prev =>
      Object.keys(prev).reduce<Record<string, boolean>>((acc, key) => {
        acc[key] = true;
        return acc;
      }, {})
    );
    const validationErrors = validateAnswers(answers);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(prev => ({
        ...prev,
        ...validationErrors,
      }));
    } else {
      navigation.dispatch(
        StackActions.replace('Summary', {
          answers: Object.values(answers),
        })
      );
    }
  };

  return (
    <View style={styles.root}>
      <ProgressBar progress={progress} />
      <View style={styles.content}>
        <View style={{ marginBottom: 'auto' }}>
          <QuestionFactory
            question={step}
            value={currentAnswer?.value}
            onChange={updateCurrentAnswer}
            error={errors[step.linkId]}
            touched={touched[step.linkId]}
          />
        </View>
        <HelperText
          type="error"
          visible={hasErrors}
          style={{ marginBottom: 12 }}
        >
          Some answers are invalid
        </HelperText>
        <View style={styles.actionBar}>
          {isFirstStep ? (
            <Button
              icon="arrow-left-thin"
              mode="outlined"
              onPress={() => navigation.goBack()}
            >
              Back
            </Button>
          ) : (
            <Button
              icon="arrow-left-thin"
              mode="outlined"
              onPress={handleGoToPreviousStep}
            >
              Previous
            </Button>
          )}
          {isLastStep ? (
            <Button
              mode="contained"
              onPress={handleSubmit}
            >
              Submit
            </Button>
          ) : (
            <Button
              icon="arrow-right-thin"
              mode="contained"
              onPress={handleGoToNextStep}
            >
              Next
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
    alignItems: 'center',
  },
});
