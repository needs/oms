import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button, VStack } from 'native-base';
import Request from '../components/Request';
import { StackNavigatorParamList } from './StackNavigator';
import { TopTabNavigatorParamList } from './TopTabNavigator';

const RequestsScreen = ({
  navigation,
}: CompositeScreenProps<
  NativeStackScreenProps<TopTabNavigatorParamList, 'Requests'>,
  NativeStackScreenProps<StackNavigatorParamList>
>) => {
  // A list of all request with club logo, name, hours, room as well as the request statu (approved, pending, refused)
  const requests: Request[] = [
    {
      club: 'BCA',
      logo: 'https://picsum.photos/200',
      startDate: new Date(),
      endDate: new Date(),
      room: 'Grolier - Gymnase',
      status: 'approved',
    },
    {
      club: 'ABC69',
      logo: 'https://picsum.photos/200',
      startDate: new Date(),
      endDate: new Date(),
      room: 'Gymnase',
      status: 'pending',
    },
  ];

  return (
    <VStack flexGrow="1" safeAreaBottom>
      <VStack space="2" p="2" flexGrow="1">
        {requests.map((request, index) => (
          <Request
            request={request}
            key={index}
            onPress={() => navigation.navigate('ShowRequest')}
          />
        ))}
      </VStack>
      <Box p="4">
        <Button onPress={() => navigation.navigate('CreateRequest')}>
          Demander un créneau
        </Button>
      </Box>
    </VStack>
  );
};

export default RequestsScreen;
