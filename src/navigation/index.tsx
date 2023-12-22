import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { DashboardScreen } from '../screens/DashboardScreen/DashboardScreen';
import { QuestionnaireScreen } from '../screens/QuestionnaireScreen/QuestionnaireScreen';
import { SummaryScreen } from '../screens/SummaryScreen/SummaryScreen.tsx';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
        />
        <Stack.Screen
          name="Questionnaire"
          component={QuestionnaireScreen}
          options={{
            title: '',
          }}
        />
        <Stack.Screen
          name="Summary"
          component={SummaryScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
