import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { VStack } from 'native-base';
import Request from '../components/Request';
import { StackNavigatorParamList } from './StackNavigator';
import { TopTabNavigatorParamList } from './TopTabNavigator';

const VotesScreen = ({
  navigation,
}: CompositeScreenProps<
  NativeStackScreenProps<TopTabNavigatorParamList, 'Votes'>,
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
    <VStack space="2" p="2" flexGrow="1" safeAreaBottom>
      {requests.map((request, index) => (
        <Request
          request={request}
          key={index}
          onPress={() => navigation.navigate('ShowRequest')}
        />
      ))}
    </VStack>
  );
};

export default VotesScreen;
