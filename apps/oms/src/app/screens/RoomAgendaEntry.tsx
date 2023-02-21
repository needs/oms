import { apiBookingsResponseSchema } from '@oms-monorepo/shared';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Box, Button, VStack } from 'native-base';
import { useState, useEffect } from 'react';
import { z } from 'zod';
import Request from '../components/Request';
import RoomHeader from '../components/RoomHeader';
import { getServerUrl } from '../settings';
import { StackNavigatorParamList } from './StackNavigator';

const RoomAgendaEntryScreen = () => {
  const route =
    useRoute<RouteProp<StackNavigatorParamList, 'RoomAgendaEntry'>>();
  const { room, day } = route.params;

  const navigation = useNavigation();

  const [bookings, setBookings] = useState<
    undefined | z.infer<typeof apiBookingsResponseSchema>
  >(undefined);

  useEffect(() => {
    fetch(
      `${getServerUrl()}/bookings?${new URLSearchParams({
        roomId: room.id.toString(),
        day,
      })}`
    )
      .then((response) => response.json())
      .then((data) => apiBookingsResponseSchema.parse(data))
      .then((data) => {
        setBookings(data);
      });
  }, [room.id, day]);

  return (
    <VStack minHeight="100%" safeAreaBottom>
      <RoomHeader room={room} onBack={() => navigation.goBack()} />
      <VStack w="100%" flexGrow={1} padding={2} space={2}>
        {bookings !== undefined &&
          bookings.map((booking, index) => (
            <Request
              key={index}
              request={{
                club: booking.collective.shortName,
                startDate: booking.start,
                endDate: booking.end,
                logo: booking.collective.logo,
                room: booking.room.name,
                status: booking.approved ? 'approved' : 'pending',
              }}
              onPress={() => navigation.navigate('ShowRequest')}
            />
          ))}
      </VStack>
      <Box padding={2}>
        <Button
          onPress={() => navigation.navigate('CreateRequest')}
          alignSelf="center"
          width="100%"
        >
          Demander un créneau
        </Button>
      </Box>
    </VStack>
  );
};

export default RoomAgendaEntryScreen;
