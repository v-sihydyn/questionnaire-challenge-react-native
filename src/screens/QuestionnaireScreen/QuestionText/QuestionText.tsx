import { Card, TextInput } from 'react-native-paper';
import { useState } from 'react';

type Props = {
  title: string | undefined;
  value: string;
  onChange: (value: string) => void;
};

export const QuestionText = ({ title = '', value, onChange }: Props) => {
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
      </Card.Content>
    </Card>
  );
};
