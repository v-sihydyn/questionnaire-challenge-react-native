import { Card, RadioButton, Text } from 'react-native-paper';

type Option = {
  label: string;
  value: string;
};
type Props = {
  title: string | undefined;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
};

export const QuestionChoice = ({
  title = '',
  options,
  value,
  onChange,
  required,
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
        {required && (
          <Text
            variant="bodyMedium"
            style={{ marginTop: 12 }}
          >
            *Required
          </Text>
        )}
      </Card.Content>
    </Card>
  );
};
