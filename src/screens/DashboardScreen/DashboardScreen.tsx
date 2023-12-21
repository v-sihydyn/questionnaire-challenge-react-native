import { StyleSheet, View } from 'react-native';
import { List, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { DashboardNavigationProp } from '../../navigation/types';

export const DashboardScreen = () => {
  const navigation = useNavigation<DashboardNavigationProp>();

  return (
    <View style={styles.root}>
      <Text
        variant="titleLarge"
        style={styles.title}
      >
        Questionnaires
      </Text>
      {QUESTIONNAIRES.map((name, index) => (
        <List.Item
          key={index}
          title={name}
          right={props => (
            <List.Icon
              {...props}
              icon="arrow-right-thin-circle-outline"
            />
          )}
          onPress={() => {
            navigation.navigate('Questionnaire', { name });
          }}
        />
      ))}
    </View>
  );
};

const QUESTIONNAIRES = ['Questionnaire1', 'Questionnaire2', 'Questionnaire3'];

const styles = StyleSheet.create({
  root: {
    padding: 20,
  },
  title: {
    marginBottom: 12,
  },
});
