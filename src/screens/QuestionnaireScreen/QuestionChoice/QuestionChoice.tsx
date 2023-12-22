import { Card, HelperText, RadioButton, Text } from 'react-native-paper';
import { Option } from '../../../types';
import { View } from 'react-native';

type Props = {
  title: string | undefined;
  options: Option[];
  value: string;
  onChange: (value: Option | null) => void;
  required?: boolean;
  error: string | undefined;
  touched: boolean;
};

export const QuestionChoice = ({
  title = '',
  options,
  value,
  onChange,
  required,
  error,
  touched,
}: Props) => {
  return (
    <Card>
      <Card.Title
        title={title}
        titleVariant="titleMedium"
        titleNumberOfLines={4}
      />
      <Card.Content>
        <RadioButton.Group
          onValueChange={value => {
            onChange(options.find(o => o.value === value) ?? null);
          }}
          value={value}
        >
          {options.map(option => (
            <RadioButton.Item
              label={option.label}
              value={option.value}
            />
          ))}
        </RadioButton.Group>
        <View style={{ height: 30 }}>
          <HelperText
            type="error"
            visible={Boolean(error && touched)}
          >
            {error}
          </HelperText>
        </View>
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
