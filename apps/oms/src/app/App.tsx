import { ComponentProps, useState } from 'react';

import {
  HStack,
  NativeBaseProvider,
  Text,
  View,
  Select,
  VStack,
  Box,
  Button,
  FormControl,
  Avatar,
  Switch,
  Input,
  Pressable,
  ScrollView,
  Divider,
  Image,
  ChevronRightIcon,
} from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Agenda } from 'react-native-calendars';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import { LocaleConfig } from 'react-native-calendars';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

interface Room {
  id: number;
  name: string;
  description: string;
  image: string;
  capacity: number;
}

interface Building {
  id: number;
  name: string;
  address: string;
  rooms: Room[];
}

const Building = ({ building }: { building: Building }) => {
  return (
    <VStack
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
      backgroundColor="gray.50"
      divider={<Divider />}
    >
      <HStack padding={4}>
        <Text fontWeight="bold" flexGrow="1">
          {building.name}
        </Text>
        <Text color="coolGray.400">{building.address}</Text>
      </HStack>
      <VStack divider={<Divider />}>
        {building.rooms.map((room) => (
          <HStack space={4} key={room.id} alignItems="center">
            <Image source={{ uri: room.image }} alt="Room" size="sm" />
            <VStack justifyContent="center" flexGrow="1">
              <Text>{room.name}</Text>
              <Text color="coolGray.400">Capacity: {room.capacity}</Text>
            </VStack>
            <Box padding={4}>
              <ChevronRightIcon />
            </Box>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};

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

const ShowRequestScreen = () => {
  const date = new Date();
  const startTime = new Date();
  const endTime = new Date();

  return (
    <VStack safeAreaBottom minHeight="100%">
      <FormControl padding={4} flexGrow="1">
        <VStack space={4}>
          <VStack>
            <FormControl.Label>Salle</FormControl.Label>
            <Text>Grolier - Gymnase</Text>
          </VStack>
          <VStack>
            <FormControl.Label>Objet de la demande</FormControl.Label>
            <Text>Interclub D2</Text>
          </VStack>
          <VStack>
            <FormControl.Label>Jour</FormControl.Label>
            <Text>{date.toLocaleDateString()}</Text>
          </VStack>
          <VStack>
            <FormControl.Label>Heure de début</FormControl.Label>
            <Text>{startTime.toLocaleTimeString()}</Text>
          </VStack>
          <VStack>
            <FormControl.Label>Heure de fin</FormControl.Label>
            <Text>{endTime.toLocaleTimeString()}</Text>
          </VStack>
          <VStack>
            <FormControl.Label>Nombre de personnes</FormControl.Label>
            <Text>100</Text>
          </VStack>
          <VStack>
            <FormControl.Label>Susceptible d'annulation</FormControl.Label>
            <Text>Non</Text>
          </VStack>
        </VStack>
      </FormControl>

      <Box p="4">
        <HStack space={2}>
          <Button flexGrow="1" colorScheme="green">
            Aprouver
          </Button>
          <Button flexGrow="1" colorScheme="red">
            Refuser
          </Button>
        </HStack>
      </Box>
    </VStack>
  );
};

const RoomsScreen = () => {
  const buildings = [
    {
      id: 1,
      name: 'Grolier',
      address: "Rue de la Paix, 69210 L'Arbresle",
      rooms: [
        {
          id: 1,
          name: 'Gymnase',
          description: 'Salle multi-sport',
          image: 'https://picsum.photos/200',
          capacity: 100,
        },
        {
          id: 2,
          name: 'Dojo',
          description: 'Art-martiaux',
          image: 'https://picsum.photos/201',
          capacity: 20,
        },
      ],
    },
    {
      id: 2,
      name: 'Grand-champs',
      address: 'Rue de la Paix, 69210 Sain-bel',
      rooms: [
        {
          id: 3,
          name: "Salle d'escalade",
          description: 'Escalade uniquement',
          image: 'https://picsum.photos/202',
          capacity: 20,
        },
        {
          id: 4,
          name: "Salle de réunion",
          description: '10 tables, 20 chaises',
          image: 'https://picsum.photos/203',
          capacity: 20,
        },
        {
          id: 5,
          name: "Gymnase multi-sports",
          description: 'Hauteur de plafond: 13m',
          image: 'https://picsum.photos/204',
          capacity: 100,
        },
      ],
    },
  ];

  return (
    <ScrollView>
      <VStack safeAreaBottom minHeight="100%" padding={4} space={4}>
        {buildings.map((building) => (
          <Building building={building} key={building.id} />
        ))}
      </VStack>
    </ScrollView>
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
              <Box marginTop={firstItemInDay ? 2 : 0}>
                <Request
                  request={{
                    club: 'BCA',
                    logo: 'https://picsum.photos/200',
                    startDate: new Date(),
                    endDate: new Date(),
                    room: 'Grolier - Gymnase',
                    status: 'approved',
                  }}
                  onPress={() => navigation.navigate('ShowRequest')}
                />
              </Box>
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

interface Request {
  club: string;
  logo: string;
  startDate: Date;
  endDate: Date;
  room: string;
  status: 'approved' | 'pending' | 'refused';
}

const Request = ({
  request,
  onPress,
}: {
  request: Request;
  onPress: () => void;
}) => {
  const statusColor = {
    approved: 'green.300',
    pending: 'yellow.300',
    refused: 'red.300',
  }[request.status];

  const statusText = {
    approved: 'Approuvé',
    pending: 'En attente',
    refused: 'Refusé',
  }[request.status];

  return (
    <Pressable onPress={onPress}>
      <HStack bg="white" py="2" px="4" space="4" rounded="lg">
        <Avatar source={{ uri: request.logo }} />
        <VStack flexGrow="1">
          <HStack flexGrow="1">
            <Text flexGrow="1">{request.club}</Text>
            <Text color={statusColor}>{statusText}</Text>
          </HStack>
          <HStack flexGrow="1">
            <Text color="coolGray.500" flexGrow="1">
              {request.room}
            </Text>
            <Text color="coolGray.500">18h - 20h</Text>
          </HStack>
        </VStack>
      </HStack>
    </Pressable>
  );
};

const RequestsScreen = ({
  navigation,
}: NativeStackScreenProps<TopTabNavigatorParamList, 'Requests'>) => {
  // A list of all request with club logo, name, hours, room as well as the request statu (approved, pending, refused)
  const requests: Request[] = [
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
          <Request
            request={request}
            key={index}
            onPress={() => navigation.navigate('ShowRequest')}
          />
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

const ProfilScreen = ({
  navigation,
}: NativeStackScreenProps<TopTabNavigatorParamList, 'Profil'>) => {
  return (
    <View>
      <FormControl padding={4} flexGrow="1">
        <VStack space={4}>
          <VStack>
            <FormControl.Label>Prénom</FormControl.Label>
            <Input bg="white" value="Timothée" />
          </VStack>
          <VStack>
            <FormControl.Label>Nom</FormControl.Label>
            <Input bg="white" value="Vialatoux" />
          </VStack>
          <VStack>
            <FormControl.Label>Email</FormControl.Label>
            <Input bg="white" value="timothee.vialatoux@gmail.com" />
          </VStack>
        </VStack>
      </FormControl>
      <Button
        onPress={() => navigation.navigate('Rooms')}
        variant="outline"
        colorScheme="primary"
        margin="4"
        backgroundColor="white"
      >
        Salles
      </Button>
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
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};

export default App;
