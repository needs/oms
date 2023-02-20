import { roomSchema } from '@oms-monorepo/shared';
import {
  ArrowBackIcon,
  AspectRatio,
  Heading,
  HStack,
  IconButton,
  Spacer,
  VStack,
} from 'native-base';
import { ImageBackground } from 'react-native';
import z from "zod";

const RoomHeader = ({ room, onBack }: { room: z.infer<typeof roomSchema>; onBack: () => void }) => {
  return (
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
              onPress={() => onBack()}
              icon={<ArrowBackIcon color="black" size="md" />}
            />
            <Heading>{room.name} - Grolier</Heading>
          </HStack>
        </VStack>
      </ImageBackground>
    </AspectRatio>
  );
};

export default RoomHeader;
