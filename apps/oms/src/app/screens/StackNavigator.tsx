import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateRequestScreen from './CreateRequest';
import RoomAgendaScreen from './RoomAgenda';
import RoomInfoScreen from './RoomInfo';
import RoomsScreen from './Rooms';
import ShowRequestScreen from './ShowRequest';
import TopTabNavigator, { TopTabNavigatorParamList } from './TopTabNavigator';
import z from "zod";
import { roomSchema } from '@oms-monorepo/shared';

export type StackNavigatorParamList = {
  TopTabNavigator: NavigatorScreenParams<TopTabNavigatorParamList>;
  CreateRequest: undefined;
  ShowRequest: undefined;
  Rooms: undefined;
  RoomAgenda: { room: z.infer<typeof roomSchema> };
  RoomInfo: { room: z.infer<typeof roomSchema> };
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends StackNavigatorParamList {}
  }
}

const Stack = createNativeStackNavigator<StackNavigatorParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TopTabNavigator"
        component={TopTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateRequest"
        component={CreateRequestScreen}
        options={{ title: 'Demander un créneau', presentation: 'modal' }}
      />
      <Stack.Screen
        name="ShowRequest"
        component={ShowRequestScreen}
        options={{ title: 'Demande de créneau', presentation: 'modal' }}
      />
      <Stack.Screen
        name="Rooms"
        component={RoomsScreen}
        options={{ title: 'Salles' }}
      />
      <Stack.Screen
        name="RoomAgenda"
        component={RoomAgendaScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RoomInfo"
        component={RoomInfoScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
