import { useNavigation } from "@react-navigation/native";
import { Box, ChevronRightIcon, Divider, HStack, Image, Pressable, Text, VStack } from "native-base";

export interface Room {
  id: number;
  name: string;
  description: string;
  image: string;
  capacity: number;
}

export interface Building {
  id: number;
  name: string;
  address: string;
  rooms: Room[];
}

const Building = ({ building }: { building: Building }) => {
  const navigation = useNavigation();

  return (
    <VStack
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
      backgroundColor="white"
      divider={<Divider />}
    >
      <HStack padding={4}>
        <Text fontWeight="bold" flexGrow="1">
          {building.name}
        </Text>
        <Text color="coolGray.400">{building.address}</Text>
      </HStack>
      <VStack divider={<Divider />}>
        {building.rooms.map((room) => (
          <Pressable
            key={room.id}
            onPress={() => navigation.navigate('Room', { room })}
          >
            <HStack space={4} alignItems="center">
              <Image source={{ uri: room.image }} alt="Room" size="sm" />
              <VStack justifyContent="center" flexGrow="1">
                <Text>{room.name}</Text>
                <Text color="coolGray.400">{room.capacity} personnes</Text>
              </VStack>
              <Box padding={4}>
                <ChevronRightIcon />
              </Box>
            </HStack>
          </Pressable>
        ))}
      </VStack>
    </VStack>
  );
};

export default Building;
