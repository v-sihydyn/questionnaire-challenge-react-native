import { View, StyleSheet, FlatList } from 'react-native';
import { SummaryRouteProp } from '../../navigation/types';
import { Text } from 'react-native-paper';
import { Option } from '../../types';

type Props = {
  route: SummaryRouteProp;
};

export const SummaryScreen = ({ route }: Props) => {
  const answers = route.params.answers;

  return (
    <FlatList
      data={answers}
      renderItem={({ item }) => {
        const value =
          item.question.type === 'coding'
            ? (item.value as Option)?.label
            : (item.value as string);

        return (
          <View style={styles.answer}>
            <Text
              variant="bodyLarge"
              style={styles.question}
            >
              {item.question.text}
            </Text>
            <Text variant="bodyLarge">{value || '--'}</Text>
          </View>
        );
      }}
      contentContainerStyle={styles.root}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 20,
  },
  answer: {
    marginBottom: 12,
  },
  question: {
    fontWeight: 'bold',
  },
});
