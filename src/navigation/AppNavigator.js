
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginPage from '../../src/components/LoginPage';
import HomePage from '../../src/components/HomePage';
import UserAttendanceReportPage from '../../src/components/UserAttendanceReportPage';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer independent={true}>
    <Stack.Navigator initialRouteName="LoginPage">
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="UserAttendanceReportPage" component={UserAttendanceReportPage} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
