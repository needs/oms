import { apiBookingsLightResponseSchema } from '@oms-monorepo/shared';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Box, VStack } from 'native-base';
import { useState, useEffect } from 'react';
import { CalendarList } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';
import RoomHeader from '../components/RoomHeader';
import { getServerUrl } from '../settings';
import { StackNavigatorParamList } from './StackNavigator';

const RoomAgendaScreen = () => {
  const route = useRoute<RouteProp<StackNavigatorParamList, 'RoomAgenda'>>();
  const { room } = route.params;

  const navigation = useNavigation();

  const [markedDates, setMarkedDates] = useState<undefined | MarkedDates>(
    undefined
  );

  useEffect(() => {
    fetch(
      `${getServerUrl()}/bookingsLight?${new URLSearchParams({
        roomId: room.id.toString(),
      })}`
    )
      .then((response) => response.json())
      .then((data) => apiBookingsLightResponseSchema.parse(data))
      .then((data) => {
        const markedDatesNew: MarkedDates = {};

        Object.keys(data).forEach((date) => {
          markedDatesNew[date] = {
            marked: true,
          };
        });

        setMarkedDates(markedDatesNew);
      });
  }, [room.id]);

  return (
    <VStack minHeight="100%" safeAreaBottom>
      <RoomHeader room={room} onBack={() => navigation.goBack()} />
      <Box w="100%" flexGrow={1}>
        <CalendarList
          markedDates={markedDates}
          firstDay={1}
          onDayPress={(day) => {
            navigation.navigate('RoomAgendaEntry', {
              room,
              day: day.dateString,
            });
          }}
        />
      </Box>
    </VStack>
  );
};

export default RoomAgendaScreen;
