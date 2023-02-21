import { Avatar, HStack, Pressable, Text, VStack } from "native-base";

interface Request {
  club: string;
  logo?: string;
  startDate: Date;
  endDate: Date;
  room: string;
  status: 'approved' | 'pending' | 'refused';
}

const Request = ({
  request,
  onPress,
}: {
  request: Request;
  onPress: () => void;
}) => {
  const statusColor = {
    approved: 'green.300',
    pending: 'yellow.300',
    refused: 'red.300',
  }[request.status];

  const statusText = {
    approved: 'Approuvé',
    pending: 'En attente',
    refused: 'Refusé',
  }[request.status];

  return (
    <Pressable onPress={onPress}>
      <HStack bg="white" py="2" px="4" space="4" rounded="lg">
        <Avatar source={{ uri: request.logo ?? "https://picsum.photos/200" }} />
        <VStack flexGrow="1">
          <HStack flexGrow="1">
            <Text flexGrow="1">{request.club}</Text>
            <Text color={statusColor}>{statusText}</Text>
          </HStack>
          <HStack flexGrow="1">
            <Text color="coolGray.500" flexGrow="1">
              {request.room}
            </Text>
            <Text color="coolGray.500">18h - 20h</Text>
          </HStack>
        </VStack>
      </HStack>
    </Pressable>
  );
};

export default Request;
