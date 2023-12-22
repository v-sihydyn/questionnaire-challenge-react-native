import { View, StyleSheet, ScrollView } from 'react-native';
import { SummaryRouteProp } from '../../navigation/types';
import { Text } from 'react-native-paper';
import { Option } from '../../types';

type Props = {
  route: SummaryRouteProp;
};

export const SummaryScreen = ({ route }: Props) => {
  const answers = route.params.answers;

  return (
    <ScrollView>
      <View style={styles.root}>
        {answers.map(a => (
          <View style={{ marginBottom: 12 }}>
            <Text
              variant="bodyLarge"
              style={{ fontWeight: 'bold' }}
            >
              {a.question.text}
            </Text>
            <Text variant="bodyLarge">
              {a.question.type === 'coding'
                ? (a.value as Option)?.label
                : (a.value as string)}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 20,
  },
});
