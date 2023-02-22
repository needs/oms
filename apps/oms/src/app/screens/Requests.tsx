import {
  apiRequestsResponseSchema,
  bookingFullSchema,
  roomFullSchema,
} from '@oms-monorepo/shared';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button, Divider, ScrollView, VStack } from 'native-base';
import { useState, useEffect } from 'react';
import { z } from 'zod';
import BookingsList from '../components/BookingsList';
import { RoomHeaderInline } from '../components/RoomHeader';
import { getServerUrl } from '../settings';
import { StackNavigatorParamList } from './StackNavigator';
import { TopTabNavigatorParamList } from './TopTabNavigator';

type RequestsPerRoom = {
  room: z.infer<typeof roomFullSchema>;
  requests: z.infer<typeof bookingFullSchema>[];
};

const RequestsScreen = ({
  navigation,
}: CompositeScreenProps<
  NativeStackScreenProps<TopTabNavigatorParamList, 'Requests'>,
  NativeStackScreenProps<StackNavigatorParamList>
>) => {
  const [requestsPerRoom, setRequestsPerRoom] = useState<
    undefined | RequestsPerRoom[]
  >(undefined);

  useEffect(() => {
    fetch(`${getServerUrl()}/requests`)
      .then((response) => response.json())
      .then((data) => apiRequestsResponseSchema.parse(data))
      .then((data) => {
        const requestsPerRoom: { [k: string]: RequestsPerRoom } = {};

        data.forEach((request) => {
          if (requestsPerRoom[request.room.id] === undefined) {
            requestsPerRoom[request.room.id] = {
              room: request.room,
              requests: [],
            };
          }

          requestsPerRoom[request.room.id].requests.push(request);
        });

        setRequestsPerRoom(Object.values(requestsPerRoom));
      });
  });

  return (
    <ScrollView backgroundColor="gray.400">
      <VStack flexGrow="1" safeAreaBottom>
        <VStack space={8} flexGrow="1" padding={4}>
          {requestsPerRoom !== undefined &&
            requestsPerRoom.map((requestsPerRoom) => (
              <VStack
                key={requestsPerRoom.room.id}
                borderColor="coolGray.200"
                rounded="lg"
                borderWidth="0"
                overflow="hidden"
                backgroundColor="gray.200"
                divider={<Divider />}
              >
                <RoomHeaderInline room={requestsPerRoom.room} />
                <BookingsList bookings={requestsPerRoom.requests} />
              </VStack>
            ))}
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default RequestsScreen;
