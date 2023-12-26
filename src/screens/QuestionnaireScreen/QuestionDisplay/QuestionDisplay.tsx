import { Card, Text } from 'react-native-paper';

type Props = {
  text: string | undefined;
};

export const QuestionDisplay = ({ text = '' }: Props) => {
  return (
    <Card>
      <Card.Content>
        <Text variant="bodyLarge">{text}</Text>
      </Card.Content>
    </Card>
  );
};
