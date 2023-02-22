import { roomFullSchema, bookingFullSchema } from '@oms-monorepo/shared';
import { VStack, Divider } from 'native-base';
import { useMemo } from 'react';
import { z } from 'zod';
import BookingsList from './BookingsList';
import { RoomHeaderInline } from './RoomHeader';

type BookingsPerRoom = {
  room: z.infer<typeof roomFullSchema>;
  bookings: z.infer<typeof bookingFullSchema>[];
};

const BookingsPerRoom = ({
  bookings,
}: {
  bookings: z.infer<typeof bookingFullSchema>[];
}) => {
  const bookingsPerRooms = useMemo(() => {
    const bookingsPerRooms: { [k: string]: BookingsPerRoom } = {};

    bookings.forEach((request) => {
      if (bookingsPerRooms[request.room.id] === undefined) {
        bookingsPerRooms[request.room.id] = {
          room: request.room,
          bookings: [],
        };
      }

      bookingsPerRooms[request.room.id].bookings.push(request);
    });

    return Object.values(bookingsPerRooms);
  }, [bookings]);

  return (
    <VStack flexGrow="1" safeAreaBottom>
      <VStack space={8} flexGrow="1" padding={4}>
        {bookingsPerRooms !== undefined &&
          bookingsPerRooms.map((bookingsPerRoom) => (
            <VStack
              key={bookingsPerRoom.room.id}
              borderColor="coolGray.200"
              rounded="lg"
              borderWidth="0"
              overflow="hidden"
              backgroundColor="gray.200"
              divider={<Divider />}
            >
              <RoomHeaderInline room={bookingsPerRoom.room} />
              <BookingsList bookings={bookingsPerRoom.bookings} />
            </VStack>
          ))}
      </VStack>
    </VStack>
  );
};

export default BookingsPerRoom;
