import { apiBookingsResponseSchema } from '@oms-monorepo/shared';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Box, VStack } from 'native-base';
import { useState, useEffect } from 'react';
import { Agenda } from 'react-native-calendars';
import Request from '../components/Request';
import RoomHeader from '../components/RoomHeader';
import { getServerUrl } from '../settings';
import { StackNavigatorParamList } from './StackNavigator';

type Requests = {
  [key: string]: Request[];
};

const RoomAgendaScreen = () => {
  const route = useRoute<RouteProp<StackNavigatorParamList, 'RoomAgenda'>>();
  const { room } = route.params;

  const navigation = useNavigation();

  const [requests, setRequests] = useState<undefined | Requests>(undefined);
  console.log(room.id)

  useEffect(() => {
    fetch(
      `${getServerUrl()}/bookings?${new URLSearchParams({
        roomId: room.id.toString(),
      })}`
    )
      .then((response) => response.json())
      .then((data) => apiBookingsResponseSchema.parse(data))
      .then((data) => {
        const requests: Requests = {};

        data.forEach((booking) => {
          const date = booking.start.toISOString().split('T')[0];

          if (requests[date] === undefined) {
            requests[date] = [];
          }

          requests[date].push({
            club: booking.collective.shortName,
            logo: booking.collective.logo,
            startDate: booking.start,
            endDate: booking.end,
            room: booking.room.name,
            status: booking.approved ? 'approved' : 'pending',
          });
        });

        setRequests(requests);
      });
  });

  return (
    <VStack minHeight="100%" safeAreaBottom>
      <RoomHeader room={room} onBack={() => navigation.goBack()} />
      <Box w="100%" flexGrow={1}>
        <Agenda
          items={requests as unknown as { [key: string]: any[] }}
          firstDay={1}
          renderItem={(item, firstItemInDay) => {
            return (
              <Box marginTop={firstItemInDay ? 2 : 2}>
                <Request
                  request={item as unknown as Request}
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
