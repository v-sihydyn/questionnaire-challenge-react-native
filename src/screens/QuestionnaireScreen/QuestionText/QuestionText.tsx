import { View } from 'react-native';
import { Card, HelperText, Text, TextInput } from 'react-native-paper';

type Props = {
  title: string | undefined;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error: string | undefined;
  touched: boolean;
};

export const QuestionText = ({
  title = '',
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
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder="Enter text"
          returnKeyType="done"
          error={Boolean(error && touched)}
        />
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
