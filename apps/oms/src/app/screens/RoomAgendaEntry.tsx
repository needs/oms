import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Box, Button, VStack } from 'native-base';
import Request from '../components/Request';
import RoomHeader from '../components/RoomHeader';
import { StackNavigatorParamList } from './StackNavigator';

const RoomAgendaEntryScreen = () => {
  const route =
    useRoute<RouteProp<StackNavigatorParamList, 'RoomAgendaEntry'>>();
  const { room, bookings } = route.params;

  const navigation = useNavigation();

  return (
    <VStack minHeight="100%" safeAreaBottom>
      <RoomHeader room={room} onBack={() => navigation.goBack()} />
      <Box w="100%" flexGrow={1}>
        {bookings.map((booking) => (
          <Request
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
      </Box>
      <Button
        onPress={() => navigation.navigate('CreateRequest')}
        size="sm"
        alignSelf="center"
        width="100%"
      >
        Demander un créneau
      </Button>
    </VStack>
  );
};

export default RoomAgendaEntryScreen;
