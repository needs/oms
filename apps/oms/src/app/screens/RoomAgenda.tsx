import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Box, VStack } from "native-base";
import { Agenda } from "react-native-calendars";
import Request from "../components/Request";
import RoomHeader from "../components/RoomHeader";
import { StackNavigatorParamList } from "./StackNavigator";

const RoomAgendaScreen = () => {
  const route = useRoute<RouteProp<StackNavigatorParamList, 'RoomAgenda'>>();
  const { room } = route.params;

  const navigation = useNavigation();

  return (
    <VStack minHeight="100%" safeAreaBottom>
      <RoomHeader room={room} onBack={() => navigation.goBack()} />
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
      </VStack>
  );
};

export default RoomAgendaScreen;
