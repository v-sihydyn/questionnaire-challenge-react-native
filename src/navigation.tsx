import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DashboardScreen } from './screens/DashboardScreen/DashboardScreen.tsx';
import { QuestionnaireScreen } from './screens/QuestionnaireScreen/QuestionnaireScreen.tsx';

type RootStackParamList = {
  Dashboard: undefined;
  Questionnaire: undefined;
};

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
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
