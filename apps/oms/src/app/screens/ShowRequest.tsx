import { Box, Button, FormControl, HStack, Text, VStack } from "native-base";

const ShowRequestScreen = () => {
  const date = new Date();
  const startTime = new Date();
  const endTime = new Date();

  return (
    <VStack safeAreaBottom minHeight="100%">
      <FormControl padding={4} flexGrow="1">
        <VStack space={4}>
          <VStack>
            <FormControl.Label>Salle</FormControl.Label>
            <Text>Grolier - Gymnase</Text>
          </VStack>
          <VStack>
            <FormControl.Label>Objet de la demande</FormControl.Label>
            <Text>Interclub D2</Text>
          </VStack>
          <VStack>
            <FormControl.Label>Jour</FormControl.Label>
            <Text>{date.toLocaleDateString()}</Text>
          </VStack>
          <VStack>
            <FormControl.Label>Heure de début</FormControl.Label>
            <Text>{startTime.toLocaleTimeString()}</Text>
          </VStack>
          <VStack>
            <FormControl.Label>Heure de fin</FormControl.Label>
            <Text>{endTime.toLocaleTimeString()}</Text>
          </VStack>
          <VStack>
            <FormControl.Label>Nombre de personnes</FormControl.Label>
            <Text>100</Text>
          </VStack>
          <VStack>
            <FormControl.Label>Susceptible d'annulation</FormControl.Label>
            <Text>Non</Text>
          </VStack>
        </VStack>
      </FormControl>

      <Box p="4">
        <HStack space={2}>
          <Button flexGrow="1" colorScheme="green">
            Aprouver
          </Button>
          <Button flexGrow="1" colorScheme="red">
            Refuser
          </Button>
        </HStack>
      </Box>
    </VStack>
  );
};

export default ShowRequestScreen;
