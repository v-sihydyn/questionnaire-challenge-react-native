import { Card, RadioButton } from 'react-native-paper';

type Option = {
  label: string;
  value: string;
};
type Props = {
  title: string | undefined;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

export const QuestionChoice = ({
  title = '',
  options,
  value,
  onChange,
}: Props) => {
  return (
    <Card>
      <Card.Title
        title={title.replace(/\<br \/>/gm, '\n')}
        titleVariant="titleMedium"
        titleNumberOfLines={4}
      />
      <Card.Content>
        <RadioButton.Group
          onValueChange={onChange}
          value={value}
        >
          {options.map(option => (
            <RadioButton.Item
              label={option.label}
              value={option.value}
            />
          ))}
        </RadioButton.Group>
      </Card.Content>
    </Card>
  );
};
