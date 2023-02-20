import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  Divider,
  HStack,
  Image,
  InfoIcon,
  Text,
  VStack,
} from 'native-base';
import RoomHeader from '../components/RoomHeader';
import { StackNavigatorParamList } from './StackNavigator';

const RoomInfoScreen = () => {
  const route = useRoute<RouteProp<StackNavigatorParamList, 'RoomInfo'>>();
  const { room } = route.params;

  const navigation = useNavigation();

  return (
    <VStack minHeight="100%">
      <RoomHeader room={room} onBack={() => navigation.goBack()} />
      <VStack padding={4} space={4}>
        <VStack
          rounded="lg"
          borderColor="coolGray.200"
          borderWidth="1"
          backgroundColor="white"
          divider={<Divider />}
        >
          <HStack space={4} padding={4}>
            <Text>{room.description}</Text>
          </HStack>
          <HStack space={4} padding={4}>
            <Text fontWeight="bold" flexGrow="1">
              Capacité
            </Text>
            <Text>{room.capacity}</Text>
          </HStack>
        </VStack>
        <VStack
          rounded="lg"
          borderColor="coolGray.200"
          borderWidth="1"
          backgroundColor="white"
          divider={<Divider />}
        >
          <HStack space={4} padding={4} alignItems="center">
            <Text flexGrow="1" fontWeight="bold">
              Clubs prioritaires
            </Text>
            <InfoIcon color="blue" />
          </HStack>
          <VStack divider={<Divider />}>
            <HStack space={4} padding={4} justifyContent="center">
              <Image
                source={{
                  uri: 'https://picsum.photos/200',
                }}
                size={12}
                alt="BCA"
                rounded="full"
              />
              <VStack flexGrow="1">
                <HStack>
                  <Text fontWeight="bold" flexGrow="1">
                    BCA
                  </Text>
                  <Text color="coolGray.500">Lentilly</Text>
                </HStack>
                <Text>Basket</Text>
              </VStack>
            </HStack>
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default RoomInfoScreen;
