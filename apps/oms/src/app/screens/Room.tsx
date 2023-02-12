import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ArrowBackIcon, AspectRatio, Divider, Heading, HStack, IconButton, Image, InfoIcon, Spacer, Text, VStack } from "native-base";
import { ImageBackground } from "react-native";
import { StackNavigatorParamList } from "./StackNavigator";

const RoomScreen = () => {
  const route = useRoute<RouteProp<StackNavigatorParamList, 'Room'>>();
  const { room } = route.params;

  const navigation = useNavigation();

  return (
    <VStack minHeight="100%">
      <AspectRatio ratio={16 / 9}>
        <ImageBackground
          source={{
            uri: room.image,
          }}
          resizeMode="cover"
        >
          <VStack flexGrow="1">
            <Spacer flexGrow="1" />
            <HStack
              space={4}
              padding={4}
              backgroundColor="rgba(255, 255, 255, 0.8)"
              alignItems="center"
            >
              <IconButton
                onPress={() => navigation.goBack()}
                icon={<ArrowBackIcon color="black" size="md" />}
              />
              <Heading>{room.name} - Grolier</Heading>
            </HStack>
          </VStack>
        </ImageBackground>
      </AspectRatio>
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

export default RoomScreen;
