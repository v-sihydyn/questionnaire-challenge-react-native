import { Card, Text, TextInput } from 'react-native-paper';

type Props = {
  title: string | undefined;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
};

export const QuestionText = ({
  title = '',
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
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder="Enter text"
          returnKeyType="done"
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
