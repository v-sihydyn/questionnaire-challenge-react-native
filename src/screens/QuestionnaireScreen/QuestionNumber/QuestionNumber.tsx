import { Card, HelperText, Text, TextInput } from 'react-native-paper';

type Props = {
  title: string | undefined;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  unitType?: string;
  error: string | undefined;
  touched: boolean;
};

export const QuestionNumber = ({
  title = '',
  value,
  onChange,
  required,
  unitType,
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
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder="Enter a number"
          keyboardType="numeric"
          returnKeyType="done"
          right={unitType && <TextInput.Affix text={unitType} />}
          error={Boolean(error && touched)}
        />
        <HelperText
          type="error"
          visible={Boolean(error && touched)}
        >
          {error}
        </HelperText>
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
