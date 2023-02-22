import { apiBookingsToBeVotedResponseSchema } from '@oms-monorepo/shared';
import { useState, useEffect } from 'react';
import { ScrollView } from 'native-base';
import { z } from 'zod';
import BookingsPerRoom from '../components/BookingsPerRoom';
import { getServerUrl } from '../settings';

const VotesScreen = () => {
  const [bookings, setBookings] = useState<
    undefined | z.infer<typeof apiBookingsToBeVotedResponseSchema>
  >(undefined);

  useEffect(() => {
    fetch(`${getServerUrl()}/bookingsToBeVoted`)
      .then((response) => response.json())
      .then((data) => apiBookingsToBeVotedResponseSchema.parse(data))
      .then((data) => setBookings(data));
  });

  return (
    <ScrollView backgroundColor="gray.400">
      { bookings !== undefined && <BookingsPerRoom bookings={bookings} />}
    </ScrollView>
  );
};

export default VotesScreen;
