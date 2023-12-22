import { Card, Text, TextInput } from 'react-native-paper';

type Props = {
  title: string | undefined;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  unitType?: string;
};

export const QuestionNumber = ({
  title = '',
  value,
  onChange,
  required,
  unitType,
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
        />
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
