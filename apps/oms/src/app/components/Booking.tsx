import { bookingFullSchema } from "@oms-monorepo/shared";
import { Avatar, HStack, Pressable, Text, VStack } from "native-base";
import z from "zod";

const Booking = ({
  booking,
  onPress,
}: {
  booking: z.infer<typeof bookingFullSchema>;
  onPress: () => void;
}) => {
  const bookingStatus = booking.approved ? "approved" : "pending";

  const statusColor = {
    approved: 'green.300',
    pending: 'yellow.300',
    refused: 'red.300',
  }[bookingStatus];

  const statusText = {
    approved: 'Approuvé',
    pending: 'En attente',
    refused: 'Refusé',
  }[bookingStatus];

  return (
    <Pressable onPress={onPress}>
      <HStack bg="white" py="2" px="4" space="4">
        <Avatar source={{ uri: booking.collective.logo ?? "https://picsum.photos/200" }} />
        <VStack flexGrow="1">
          <HStack flexGrow="1">
            <Text flexGrow="1">{booking.collective.shortName}</Text>
            <Text color={statusColor}>{statusText}</Text>
          </HStack>
          <HStack flexGrow="1">
            <Text color="coolGray.500" flexGrow="1">
              {booking.description}
            </Text>
            <Text color="coolGray.500">18h - 20h</Text>
          </HStack>
        </VStack>
      </HStack>
    </Pressable>
  );
};

export default Booking;
