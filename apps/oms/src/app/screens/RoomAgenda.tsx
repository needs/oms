import { apiBookingsResponseSchema, bookingSchema } from '@oms-monorepo/shared';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Box, VStack } from 'native-base';
import { useState, useEffect } from 'react';
import { CalendarList } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';
import RoomHeader from '../components/RoomHeader';
import { getServerUrl } from '../settings';
import { StackNavigatorParamList } from './StackNavigator';
import z from 'zod';

type BookingsBydate = {
  [key: string]: z.infer<typeof bookingSchema>[];
};

const RoomAgendaScreen = () => {
  const route = useRoute<RouteProp<StackNavigatorParamList, 'RoomAgenda'>>();
  const { room } = route.params;

  const navigation = useNavigation();

  const [markedDates, setMarkedDates] = useState<undefined | MarkedDates>(
    undefined
  );
  const [bookingsByDate, setBookingsByDate] = useState<
    undefined | BookingsBydate
  >(undefined);

  useEffect(() => {
    fetch(
      `${getServerUrl()}/bookings?${new URLSearchParams({
        roomId: room.id.toString(),
      })}`
    )
      .then((response) => response.json())
      .then((data) => apiBookingsResponseSchema.parse(data))
      .then((data) => {
        const markedDatesNew: MarkedDates = {};
        const bookingsByDatesNew: BookingsBydate = {};

        data.forEach((booking) => {
          const date = booking.start.toISOString().split('T')[0];

          if (markedDatesNew[date] === undefined) {
            markedDatesNew[date] = {
              marked: true,
            };
          }

          if (bookingsByDatesNew[date] === undefined) {
            bookingsByDatesNew[date] = [];
          }

          bookingsByDatesNew[date].push(booking);
        });

        setMarkedDates(markedDatesNew);
        setBookingsByDate(bookingsByDatesNew);
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
            console.log('Pressed');

            if (bookingsByDate !== undefined) {
              const bookings = bookingsByDate[day.dateString] ?? [];

              navigation.navigate('RoomAgendaEntry', {
                room,
                bookings: bookings,
              });
            }
          }}
        />
      </Box>
    </VStack>
  );
};

export default RoomAgendaScreen;
