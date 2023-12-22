import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Answer, Option } from '../../../types';
import { Questionnaire } from 'fhir/r5';
import { QuestionText } from '../QuestionText/QuestionText';
import { QuestionNumber } from '../QuestionNumber/QuestionNumber';
import { QuestionChoice } from '../QuestionChoice/QuestionChoice';
import { QuestionDisplay } from '../QuestionDisplay/QuestionDisplay';
import { Button, HelperText, ProgressBar } from 'react-native-paper';
import { StackActions, useNavigation } from '@react-navigation/native';
import { QuestionnaireNavigationProp } from '../../../navigation/types';

type Props = {
  questionnaireConfig: Questionnaire;
};

export const QuestionnaireForm = ({ questionnaireConfig }: Props) => {
  const navigation = useNavigation<QuestionnaireNavigationProp>();
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
          isValid: (value: any) => {
            if (question.required) {
              if (value === '' || value === null) {
                return 'This field is required';
              }
            }

            if (question.type === 'integer' || question.type === 'quantity') {
              // Values 0 and 10 are hardcoded since there are no such constraints in questionnaire configs
              if (value < 0) {
                return 'Value should be greater or equal 0';
              }

              if (value >= 10) {
                return 'Value should be lesser or equal 10';
              }
            }
          },
        };

        return acc;
      }, {});
  });
  const [errors, setErrors] = useState(() =>
    Object.keys(answers).reduce<{ [key: string]: string | undefined }>(
      (acc, current) => {
        acc[current] = answers[current].isValid(answers[current].value);
        return acc;
      },
      {}
    )
  );
  const [touched, setTouched] = useState(() =>
    Object.keys(answers).reduce<{ [key: string]: boolean }>((acc, current) => {
      acc[current] = false;
      return acc;
    }, {})
  );
  const currentAnswer = answers[step.linkId];

  const updateCurrentAnswer = (value: string | Option | null) => {
    if (!touched[step.linkId]) {
      setTouched(prev => ({
        ...prev,
        [step.linkId]: true,
      }));
    }

    setAnswers(prev => ({
      ...prev,
      [step.linkId]: {
        ...prev[step.linkId],
        value,
      },
    }));

    setErrors(prev => ({
      ...prev,
      [step.linkId]: answers[step.linkId].isValid(value),
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
          error={errors[step.linkId]}
          touched={touched[step.linkId]}
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
          error={errors[step.linkId]}
          touched={touched[step.linkId]}
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
          error={errors[step.linkId]}
          touched={touched[step.linkId]}
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
          error={errors[step.linkId]}
          touched={touched[step.linkId]}
        />
      );
      break;
    case 'display':
      stepComponent = <QuestionDisplay text={step.text} />;
      break;
    default:
      stepComponent = null;
  }

  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === questions.length - 1;
  const progress = stepIndex / (questions.length - 1);
  const hasErrors = Object.keys(errors).some(
    errorKey => Boolean(errors[errorKey]) && touched[errorKey]
  );

  if (!step) return null;

  return (
    <View style={styles.root}>
      <ProgressBar progress={progress} />
      <View style={styles.content}>
        <View style={{ marginBottom: 'auto' }}>{stepComponent}</View>
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
              onPress={() => {
                navigation.goBack();
              }}
            >
              Back
            </Button>
          ) : (
            <Button
              icon="arrow-left-thin"
              mode="outlined"
              onPress={() => {
                if (stepIndex > 0) {
                  setStepIndex(i => i - 1);
                }
              }}
            >
              Previous
            </Button>
          )}
          {isLastStep ? (
            <Button
              mode="contained"
              onPress={() => {
                setTouched(prev =>
                  Object.keys(prev).reduce<Record<string, boolean>>(
                    (acc, key) => {
                      acc[key] = true;
                      return acc;
                    },
                    {}
                  )
                );
                const validationErrors = Object.keys(answers).reduce<{
                  [key: string]: string | undefined;
                }>((acc, current) => {
                  const message = answers[current].isValid(
                    answers[current].value
                  );
                  if (message) {
                    acc[current] = message;
                  }

                  return acc;
                }, {});

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
              }}
            >
              Submit
            </Button>
          ) : (
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
