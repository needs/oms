import { apiBookingsResponseSchema } from '@oms-monorepo/shared';
import { useNavigation } from '@react-navigation/native';
import { Box, Divider, Text, VStack } from 'native-base';
import { useMemo } from 'react';
import { z } from 'zod';
import Booking from './Booking';

const BookingsList = ({
  bookings,
}: {
  bookings: z.infer<typeof apiBookingsResponseSchema>;
}) => {
  const navigation = useNavigation();

  const bookingsGroupedByDay = useMemo(() => {
    const bookingsGroupedByDay: Record<string, typeof bookings> = {};

    bookings.forEach((booking) => {
      const day = booking.start.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      if (bookingsGroupedByDay[day] === undefined) {
        bookingsGroupedByDay[day] = [];
      }

      bookingsGroupedByDay[day].push(booking);
    });

    return bookingsGroupedByDay;
  }, [bookings]);

  return (
    <VStack w="100%" space={2} padding={2}>
      {Object.entries(bookingsGroupedByDay).map(([day, bookings], index) => (
        <VStack
          w="100%"
          key={index}
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          backgroundColor="white"
          divider={<Divider />}
        >
          <Box backgroundColor="white" paddingX={4} paddingY={2}>
            <Text color="gray.700" textAlign="center">
              {day}
            </Text>
          </Box>
          {bookings.map((booking, index) => (
            <Booking
              key={index}
              booking={booking}
              onPress={() => navigation.navigate('ShowRequest')}
            />
          ))}
        </VStack>
      ))}
    </VStack>
  );
};

export default BookingsList;
