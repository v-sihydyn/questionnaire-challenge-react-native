import { Card, Text } from 'react-native-paper';

type Props = {
  text: string | undefined;
};

export const QuestionDisplay = ({ text = '' }: Props) => {
  return (
    <Card>
      <Card.Content style={{ minHeight: 100 }}>
        <Text variant="bodyLarge">{text.replace(/\<br \/>/gm, '\n')}</Text>
      </Card.Content>
    </Card>
  );
};
