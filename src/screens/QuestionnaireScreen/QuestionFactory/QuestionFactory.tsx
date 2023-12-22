import { QuestionText } from '../QuestionText/QuestionText';
import { QuestionNumber } from '../QuestionNumber/QuestionNumber';
import { QuestionChoice } from '../QuestionChoice/QuestionChoice';
import { Option } from '../../../types.ts';
import { QuestionDisplay } from '../QuestionDisplay/QuestionDisplay';
import { Card } from 'react-native-paper';
import { QuestionnaireItem } from 'fhir/r5';

type Props = {
  question: QuestionnaireItem;
  value: string | Option | null;
  onChange: (value: string | Option | null) => void;
  error?: string;
  touched: boolean;
};

export const QuestionFactory = ({
  question,
  value,
  onChange,
  error,
  touched,
}: Props) => {
  switch (question.type) {
    case 'text':
      return (
        <QuestionText
          title={question.text}
          value={value as string}
          onChange={onChange}
          required={question.required}
          error={error}
          touched={touched}
        />
      );
    case 'integer':
      return (
        <QuestionNumber
          title={question.text}
          value={value as string}
          onChange={onChange}
          required={question.required}
          error={error}
          touched={touched}
        />
      );
    case 'quantity':
      const unitType = question.extension?.find(
        x => x.url === 'unitType'
      )?.valueString;
      return (
        <QuestionNumber
          title={question.text}
          value={value as string}
          onChange={onChange}
          required={question.required}
          unitType={unitType}
          error={error}
          touched={touched}
        />
      );
    case 'coding':
      const options = (question.answerOption ?? []).map(option => ({
        label: option.valueCoding?.display ?? '',
        value: option.valueCoding?.code ?? '',
      }));
      return (
        <QuestionChoice
          title={question.text}
          options={options}
          value={(value as Option)?.value ?? ''}
          onChange={onChange}
          required={question.required}
          error={error}
          touched={touched}
        />
      );
    case 'display':
      return <QuestionDisplay text={question.text} />;

    default:
      return (
        <Card>
          <Card.Title title={`Type ${question.type} is not supported`} />
        </Card>
      );
  }
};
