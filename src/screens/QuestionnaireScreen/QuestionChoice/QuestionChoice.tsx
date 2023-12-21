import { Card, RadioButton } from 'react-native-paper';
import { useState } from 'react';

type Option = {
  label: string;
  value: string;
};
type Props = {
  title: string | undefined;
  options: Option[];
};

export const QuestionChoice = ({ title = '', options }: Props) => {
  const [value, setValue] = useState('');

  return (
    <Card>
      <Card.Title
        title={title.replace(/\<br \/>/gm, '\n')}
        titleVariant="titleMedium"
        titleNumberOfLines={4}
      />
      <Card.Content>
        <RadioButton.Group
          onValueChange={newValue => setValue(newValue)}
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
