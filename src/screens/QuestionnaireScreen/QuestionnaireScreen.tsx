import {
  QuestionnaireNavigationProp,
  QuestionnaireRouteProp,
} from '../../navigation/types';
import { Questionnaire } from 'fhir/r5';
import { useEffect, useState } from 'react';

import { fetchQuestionnaireConfig } from '../../api/questionnaireApi';
import { QuestionnaireForm } from './QuestionnaireForm/QuestionnaireForm';

export const QuestionnaireScreen = ({
  navigation,
  route,
}: {
  navigation: QuestionnaireNavigationProp;
  route: QuestionnaireRouteProp;
}) => {
  const { name } = route.params;
  const [questionnaireConfig, setQuestionnaireConfig] =
    useState<Questionnaire | null>(null);

  useEffect(() => {
    fetchQuestionnaireConfig(name).then(config => {
      if (config) {
        setQuestionnaireConfig(config);
      }
    });
  }, [name]);

  useEffect(() => {
    if (questionnaireConfig?.title) {
      navigation.setOptions({
        title: questionnaireConfig.title,
      });
    }
  }, [questionnaireConfig?.title]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!questionnaireConfig) return null;

  return <QuestionnaireForm questionnaireConfig={questionnaireConfig} />;
};
