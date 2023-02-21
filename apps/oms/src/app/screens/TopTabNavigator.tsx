import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProfilScreen from "./Profil";
import RequestsScreen from "./Requests";
import RoomsScreen from "./Rooms";
import VotesScreen from "./Votes";

export type TopTabNavigatorParamList = {
  Rooms: undefined;
  Requests: undefined;
  Votes: undefined;
  Club: undefined;
  Halls: undefined;
  Settings: undefined;
  Profil: undefined;
};

const TopTab = createMaterialTopTabNavigator<TopTabNavigatorParamList>();

const TopTabNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <TopTab.Navigator
      initialRouteName="Rooms"
      screenOptions={{ tabBarStyle: { paddingTop: insets.top } }}
    >
      <TopTab.Screen
        name="Rooms"
        component={RoomsScreen}
        options={{ title: 'Salles' }}
      />
      <TopTab.Screen
        name="Requests"
        component={RequestsScreen}
        options={{ title: 'Demandes' }}
      />
      <TopTab.Screen
        name="Votes"
        component={VotesScreen}
        options={{ title: 'Votes' }}
      />
      <TopTab.Screen
        name="Profil"
        component={ProfilScreen}
        options={{ title: 'Profil' }}
      />
    </TopTab.Navigator>
  );
};

export default TopTabNavigator;
