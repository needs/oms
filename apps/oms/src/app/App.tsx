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
  Avatar,
  Switch,
  Input,
} from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Agenda } from 'react-native-calendars';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import { LocaleConfig } from 'react-native-calendars';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr';

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
            <FormControl.Label>Objet de la demande</FormControl.Label>
            <Input bg="white" />
          </VStack>
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
            <FormControl.Label>Nombre de personnes</FormControl.Label>
            <Input defaultValue="100" bg="white" />
          </VStack>
          <HStack>
            <FormControl.Label flexGrow="1">
              Susceptible d'annulation
            </FormControl.Label>
            <Switch />
          </HStack>
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
}: NativeStackScreenProps<TopTabNavigatorParamList, 'Timeline'>) => {
  return (
    <VStack flexGrow="1" safeAreaBottom>
      <RoomSelector w="100%" bg="white" margin={4} />
      <Box w="100%" flexGrow={1}>
        <Agenda
          items={{
            '2023-01-08': [
              { name: 'item 1 - any js object', height: 1, day: '2023-01-08' },
              { name: 'item 1 - any js object', height: 2, day: '2023-01-08' },
            ],
          }}
          firstDay={1}
          renderItem={(item, firstItemInDay) => {
            return (
              <HStack
                bg="white"
                py="2"
                px="4"
                space="4"
                rounded="lg"
                marginTop={firstItemInDay ? 2 : 0}
                marginRight={2}
              >
                <Avatar source={{ uri: 'https://picsum.photos/200' }} />
                <VStack flexGrow="1">
                  <HStack flexGrow="1">
                    <Text flexGrow="1">BCA</Text>
                    <Text color="green.300">Approuvé</Text>
                  </HStack>
                  <Text color="coolGray.500">18h - 20h</Text>
                </VStack>
              </HStack>
            );
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

const RequestsScreen = ({
  navigation,
}: NativeStackScreenProps<TopTabNavigatorParamList, 'Requests'>) => {
  // A list of all request with club logo, name, hours, room as well as the request statu (approved, pending, refused)
  const requests = [
    {
      club: 'BCA',
      logo: 'https://picsum.photos/200',
      startDate: new Date(),
      endDate: new Date(),
      room: 'Grolier - Gymnase',
      status: 'approved',
    },
    {
      club: 'ABC69',
      logo: 'https://picsum.photos/200',
      startDate: new Date(),
      endDate: new Date(),
      room: 'Gymnase',
      status: 'pending',
    },
  ];

  return (
    <VStack flexGrow="1" safeAreaBottom>
      <VStack space="2" p="2" flexGrow="1">
        {requests.map((request, index) => (
          <HStack key={index} bg="white" py="2" px="4" space="4" rounded="lg">
            <Avatar source={{ uri: request.logo }} />
            <VStack flexGrow="1">
              <HStack flexGrow="1">
                <Text flexGrow="1">{request.club}</Text>
                <Text color="green.300">Approuvé</Text>
              </HStack>
              <HStack flexGrow="1">
                <Text color="coolGray.500" flexGrow="1">
                  Grolier - Gymnase
                </Text>
                <Text color="coolGray.500">18h - 20h</Text>
              </HStack>
            </VStack>
          </HStack>
        ))}
      </VStack>
      <Box p="4">
        <Button onPress={() => navigation.navigate('CreateRequest')}>
          Demander un créneau
        </Button>
      </Box>
    </VStack>
  );
};

const ProfilScreen = () => {
  return (
    <View>
      <AppBar title="Profil" />
    </View>
  );
};

type TopTabNavigatorParamList = {
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

type StackNavigatorParamList = {
  TopTabNavigator: undefined;
  TimelineDetail: undefined;
};

const Stack = createNativeStackNavigator<StackNavigatorParamList>();

export const App = () => {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <NavigationContainer>
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
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};

export default App;
