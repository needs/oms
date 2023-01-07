import { ComponentProps, useState } from 'react';

import {
  HamburgerIcon,
  HStack,
  IconButton,
  NativeBaseProvider,
  Text,
  View,
  Select,
  VStack,
  Box,
  Button,
  FormControl,
  TextArea,
} from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Agenda } from 'react-native-calendars';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

const AppBar = ({ title }: { title: string }) => {
  return (
    <HStack
      bg="violet.800"
      px="1"
      py="3"
      justifyContent="space-between"
      alignItems="center"
      w="100%"
    >
      <HStack alignItems="center">
        <IconButton
          icon={<HamburgerIcon size="sm" name="menu" color="white" />}
        />
        <Text color="white" fontSize="20" fontWeight="bold">
          {title}
        </Text>
      </HStack>
    </HStack>
  );
};

const CrossPlatformDateTimePicker = (
  props: ComponentProps<typeof DateTimePicker>
) => {
  const mode = 'mode' in props ? props.mode : 'date';

  return Platform.OS === 'android' ? (
    <View>
      <Text
        bg="coolGray.200"
        p={2}
        borderRadius={4}
        onPress={() => DateTimePickerAndroid.open(props as any)}
      >
        {mode === 'date'
          ? props.value.toLocaleDateString()
          : props.value.toLocaleTimeString()}
      </Text>
    </View>
  ) : (
    <DateTimePicker {...props} />
  );
};

const CreateRequestScreen = () => {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  return (
    <VStack safeAreaBottom minHeight="100%">
      <FormControl padding={4} flexGrow="1">
        <VStack space={4}>
          <RoomSelector w="100%" bg="white" />
          <VStack>
            <FormControl.Label>Jour</FormControl.Label>
            <CrossPlatformDateTimePicker
              value={date}
              style={{ width: '100%' }}
              onChange={(_, newDate) => {
                if (newDate !== undefined) {
                  setDate(newDate);
                }
              }}
              mode="date"
            />
          </VStack>
          <VStack>
            <FormControl.Label>Heure de début</FormControl.Label>
            <CrossPlatformDateTimePicker
              value={startTime}
              style={{ width: '100%' }}
              onChange={(_, newDate) => {
                if (newDate !== undefined) {
                  setStartTime(newDate);
                }
              }}
              mode="time"
            />
          </VStack>
          <VStack>
            <FormControl.Label>Heure de fin</FormControl.Label>
            <CrossPlatformDateTimePicker
              value={endTime}
              style={{ width: '100%' }}
              onChange={(_, newDate) => {
                if (newDate !== undefined) {
                  setEndTime(newDate);
                }
              }}
              mode="time"
            />
          </VStack>
          <VStack>
            <FormControl.Label>Notes</FormControl.Label>
            <TextArea
              placeholder="Type d'évevement, raisons particulières, ..."
              autoCompleteType=""
            />
          </VStack>
        </VStack>
      </FormControl>

      <Box p="4">
        <Button>Envoyer la demande</Button>
      </Box>
    </VStack>
  );
};

const RoomSelector = (props: ComponentProps<typeof Select>) => {
  return (
    <Select placeholder="Salle" {...props}>
      <Select.Item label="Grolier - Gymnase" value="1" />
      <Select.Item label="LEP - Gymnase" value="2" />
      <Select.Item label="Grand-champs - Multisport" value="2" />
      <Select.Item label="Grand-champs - Gym" value="2" />
      <Select.Item label="Grand-champs - Escalade" value="2" />
      <Select.Item label="Grand-champs - Réunion" value="2" />
    </Select>
  );
};

const TimelineScreen = ({
  navigation,
}: NativeStackScreenProps<DrawerNavigatorParamList, 'Timeline'>) => {
  return (
    <VStack flexGrow="1" safeAreaBottom>
      <RoomSelector w="100%" bg="white" margin={4} />
      <Box w="100%" flexGrow={1}>
        <Agenda
          items={{
            '2023-01-08': [
              { name: 'item 1 - any js object', height: 1, day: '2023-01-08' },
            ],
          }}
        />
      </Box>

      <Box p="4">
        <Button onPress={() => navigation.navigate('CreateRequest')}>
          Demander un créneau
        </Button>
      </Box>
    </VStack>
  );
};

const RequestsScreen = () => {
  return (
    <View>
      <AppBar title="Demande" />
    </View>
  );
};

const ClubScreen = () => {
  return (
    <View>
      <AppBar title="Club" />
    </View>
  );
};

const HallsScreen = () => {
  return (
    <View>
      <AppBar title="Salles" />
    </View>
  );
};

const SettingsScreen = () => {
  return (
    <View>
      <AppBar title="Paramètres" />
    </View>
  );
};

const ProfilScreen = () => {
  return (
    <View>
      <AppBar title="Profil" />
    </View>
  );
};

type DrawerNavigatorParamList = {
  Timeline: undefined;
  Requests: undefined;
  Club: undefined;
  Halls: undefined;
  Settings: undefined;
  Profil: undefined;
};

const Drawer = createDrawerNavigator<DrawerNavigatorParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Timeline">
      <Drawer.Screen
        name="Timeline"
        component={TimelineScreen}
        options={{ title: 'Échéancier' }}
      />
      <Drawer.Screen
        name="Requests"
        component={RequestsScreen}
        options={{ title: 'Demandes' }}
      />
      <Drawer.Screen
        name="Club"
        component={ClubScreen}
        options={{ title: 'Club' }}
      />
      <Drawer.Screen
        name="Halls"
        component={HallsScreen}
        options={{ title: 'Salles' }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Paramètres' }}
      />
      <Drawer.Screen
        name="Profil"
        component={ProfilScreen}
        options={{ title: 'Profil' }}
      />
    </Drawer.Navigator>
  );
};

type StackNavigatorParamList = {
  DrawerNavigator: undefined;
  TimelineDetail: undefined;
};

const Stack = createNativeStackNavigator<StackNavigatorParamList>();

export const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="DrawerNavigator"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateRequest"
            component={CreateRequestScreen}
            options={{ title: 'Demander un créneau', presentation: 'modal' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
