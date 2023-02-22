import { apiBookingsResponseSchema } from '@oms-monorepo/shared';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Box, Button, VStack } from 'native-base';
import { useState, useEffect } from 'react';
import { z } from 'zod';
import BookingsList from '../components/BookingsList';
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
      <Box flexGrow={1}>
        {bookings !== undefined && <BookingsList bookings={bookings} />}
      </Box>
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
