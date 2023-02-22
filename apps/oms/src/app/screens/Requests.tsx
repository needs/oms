import {
  apiRequestsResponseSchema,
} from '@oms-monorepo/shared';
import { ScrollView } from 'native-base';
import { useState, useEffect } from 'react';
import { z } from 'zod';
import BookingsPerRoom from '../components/BookingsPerRoom';
import { getServerUrl } from '../settings';

const RequestsScreen = () => {
  const [bookings, setBookings] = useState<
    undefined | z.infer<typeof apiRequestsResponseSchema>
  >(undefined);

  useEffect(() => {
    fetch(`${getServerUrl()}/requests`)
      .then((response) => response.json())
      .then((data) => apiRequestsResponseSchema.parse(data))
      .then((data) => setBookings(data));
  });

  return (
    <ScrollView backgroundColor="gray.400">
      { bookings !== undefined && <BookingsPerRoom bookings={bookings} />}
    </ScrollView>
  );
};

export default RequestsScreen;
