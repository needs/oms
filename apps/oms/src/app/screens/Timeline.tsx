import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button, VStack } from 'native-base';
import { Agenda } from 'react-native-calendars';
import Request from '../components/Request';
import RoomSelector from '../components/RoomSelector';
import { TopTabNavigatorParamList } from './TopTabNavigator';
import type { CompositeScreenProps } from '@react-navigation/native';
import { StackNavigatorParamList } from './StackNavigator';

const TimelineScreen = ({
  navigation,
}: CompositeScreenProps<
  NativeStackScreenProps<TopTabNavigatorParamList, 'Timeline'>,
  NativeStackScreenProps<StackNavigatorParamList>
>) => {
  return (
    <VStack flexGrow="1" safeAreaBottom>
      <RoomSelector w="100%" bg="white" margin={4} />
      <Box w="100%" flexGrow={1}>
        <Agenda
          items={{
            '2023-01-08': [
              { name: 'item 1 - any js object', height: 1, day: '2023-01-08' },
              { name: 'item 1 - any js object', height: 2, day: '2023-01-08' },
            ],
          }}
          firstDay={1}
          renderItem={(item, firstItemInDay) => {
            return (
              <Box marginTop={firstItemInDay ? 2 : 0}>
                <Request
                  request={{
                    club: 'BCA',
                    logo: 'https://picsum.photos/200',
                    startDate: new Date(),
                    endDate: new Date(),
                    room: 'Grolier - Gymnase',
                    status: 'approved',
                  }}
                  onPress={() => navigation.navigate('ShowRequest')}
                />
              </Box>
            );
          }}
        />
      </Box>

      <Box p="4">
        <Button onPress={() => navigation.navigate('CreateRequest')}>
          Demander un créneau
        </Button>
      </Box>
    </VStack>
  );
};

export default TimelineScreen;
