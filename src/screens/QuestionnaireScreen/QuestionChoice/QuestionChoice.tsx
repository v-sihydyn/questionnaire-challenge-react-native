import { Card, HelperText, RadioButton, Text } from 'react-native-paper';
import { Option } from '../../../types';
import { StyleSheet, View } from 'react-native';

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
          onValueChange={val => {
            onChange(options.find(o => o.value === val) ?? null);
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
        <View style={styles.helperTextWrapper}>
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
            style={styles.requiredMessage}
          >
            *Required
          </Text>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  helperTextWrapper: {
    height: 30,
  },
  requiredMessage: {
    marginTop: 12,
  },
});
