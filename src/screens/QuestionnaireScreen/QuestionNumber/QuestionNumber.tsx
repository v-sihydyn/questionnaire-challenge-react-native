import { Card, TextInput } from 'react-native-paper';
import { useState } from 'react';

type Props = {
  title: string | undefined;
};

export const QuestionNumber = ({ title = '' }: Props) => {
  const [text, setText] = useState('');

  return (
    <Card>
      <Card.Title
        title={title.replace(/\<br \/>/gm, '\n')}
        titleVariant="titleMedium"
        titleNumberOfLines={4}
      />
      <Card.Content>
        <TextInput
          value={text}
          onChangeText={text => setText(text)}
          placeholder="Enter a number"
          keyboardType="numeric"
        />
      </Card.Content>
    </Card>
  );
};
