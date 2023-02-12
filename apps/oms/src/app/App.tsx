import {
  NativeBaseProvider,
} from 'native-base';
import {
  NavigationContainer,
} from '@react-navigation/native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import StackNavigator from './screens/StackNavigator';

export const App = () => {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};

export default App;
