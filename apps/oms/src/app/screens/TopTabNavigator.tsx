import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProfilScreen from "./Profil";
import RequestsScreen from "./Requests";
import TimelineScreen from "./Timeline";

export type TopTabNavigatorParamList = {
  Timeline: undefined;
  Requests: undefined;
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
      initialRouteName="Timeline"
      screenOptions={{ tabBarStyle: { paddingTop: insets.top } }}
    >
      <TopTab.Screen
        name="Timeline"
        component={TimelineScreen}
        options={{ title: 'Agenda' }}
      />
      <TopTab.Screen
        name="Requests"
        component={RequestsScreen}
        options={{ title: 'Demandes' }}
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
