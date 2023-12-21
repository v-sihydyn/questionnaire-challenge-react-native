import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { QuestionnaireRouteProp } from '../../navigation/types';

export const QuestionnaireScreen = () => {
  const route = useRoute<QuestionnaireRouteProp>();
  const { name } = route.params;

  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
};
