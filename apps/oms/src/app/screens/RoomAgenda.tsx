import { apiBookingsResponseSchema } from '@oms-monorepo/shared';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Box, Button, VStack } from 'native-base';
import { useState, useEffect } from 'react';
import { Agenda, AgendaSchedule } from 'react-native-calendars';
import Request from '../components/Request';
import RoomHeader from '../components/RoomHeader';
import { getServerUrl } from '../settings';
import { StackNavigatorParamList } from './StackNavigator';

type AgendaEntry = Request | 'add button';

type AgendaEntries = {
  [key: string]: AgendaEntry[];
};

const RoomAgendaScreen = () => {
  const route = useRoute<RouteProp<StackNavigatorParamList, 'RoomAgenda'>>();
  const { room } = route.params;

  const navigation = useNavigation();

  const [agendaEntries, setAgendaEntries] = useState<undefined | AgendaEntries>(
    undefined
  );

  useEffect(() => {
    fetch(
      `${getServerUrl()}/bookings?${new URLSearchParams({
        roomId: room.id.toString(),
      })}`
    )
      .then((response) => response.json())
      .then((data) => apiBookingsResponseSchema.parse(data))
      .then((data) => {
        const agendaEntries: AgendaEntries = {};

        data.forEach((booking) => {
          const date = booking.start.toISOString().split('T')[0];

          if (agendaEntries[date] === undefined) {
            agendaEntries[date] = [];
          }

          agendaEntries[date].push({
            club: booking.collective.shortName,
            logo: booking.collective.logo,
            startDate: booking.start,
            endDate: booking.end,
            room: booking.room.name,
            status: booking.approved ? 'approved' : 'pending',
          });
        });

        for (const date in agendaEntries) {
          agendaEntries[date].push('add button');
        }

        setAgendaEntries(agendaEntries);
      });
  });

  return (
    <VStack minHeight="100%" safeAreaBottom>
      <RoomHeader room={room} onBack={() => navigation.goBack()} />
      <Box w="100%" flexGrow={1}>
        <Agenda
          items={agendaEntries as unknown as AgendaSchedule}
          firstDay={1}
          refreshing={agendaEntries === undefined}
          renderItem={(item, firstItemInDay) => {
            const agendaEntry = item as unknown as AgendaEntry;
            if (agendaEntry === 'add button') {
              return (
                <Button
                  onPress={() => navigation.navigate('CreateRequest')}
                  variant="outline"
                  size="sm"
                  alignSelf="center"
                  width="100%"
                >
                  Demander un créneau
                </Button>
              );
            } else {
              return (
                <Box marginBottom={firstItemInDay ? 0 : 2}>
                  <Request
                    request={agendaEntry}
                    onPress={() => navigation.navigate('ShowRequest')}
                  />
                </Box>
              );
            }
          }}
          renderEmptyData={() => (
            <Button
              onPress={() => navigation.navigate('CreateRequest')}
              variant="outline"
              size="sm"
              alignSelf="center"
              width="100%"
            >
              Demander un créneau
            </Button>
          )}
        />
      </Box>
    </VStack>
  );
};

export default RoomAgendaScreen;
