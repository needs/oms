import { roomSchema } from '@oms-monorepo/shared';
import { useNavigation } from '@react-navigation/native';
import {
  ArrowBackIcon,
  AspectRatio,
  Heading,
  HStack,
  IconButton,
  InfoIcon,
  Spacer,
  VStack,
} from 'native-base';
import { ImageBackground } from 'react-native';
import z from 'zod';

const RoomHeader = ({
  room,
  onBack,
}: {
  room: z.infer<typeof roomSchema>;
  onBack: () => void;
}) => {
  const navigation = useNavigation();

  return (
    <AspectRatio ratio={16 / 9}>
      <ImageBackground
        source={{
          uri: room.pictures[0] ?? 'https://picsum.photos/201',
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
              onPress={() => onBack()}
              icon={<ArrowBackIcon color="black" size="md" />}
            />
            <VStack alignItems="flex-start" flexGrow="1">
              <Heading>{room.name}</Heading>
              <Heading size="sm" color="gray.500">
                Groslier
              </Heading>
            </VStack>
            <IconButton
              onPress={() => navigation.navigate('RoomInfo', { room })}
              icon={<InfoIcon color="blue" size="md" />}
            />
          </HStack>
        </VStack>
      </ImageBackground>
    </AspectRatio>
  );
};

export default RoomHeader;
