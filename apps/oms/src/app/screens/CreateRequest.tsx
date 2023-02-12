import { Box, Button, FormControl, HStack, Input, Switch, VStack } from "native-base";
import { useState } from "react";
import DateTimePicker from "../components/DateTimePicker";
import RoomSelector from "../components/RoomSelector";

const CreateRequestScreen = () => {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  return (
    <VStack safeAreaBottom minHeight="100%">
      <FormControl padding={4} flexGrow="1">
        <VStack space={4}>
          <RoomSelector w="100%" bg="white" />
          <VStack>
            <FormControl.Label>Objet de la demande</FormControl.Label>
            <Input bg="white" />
          </VStack>
          <VStack>
            <FormControl.Label>Jour</FormControl.Label>
            <DateTimePicker
              value={date}
              style={{ width: '100%' }}
              onChange={(_, newDate) => {
                if (newDate !== undefined) {
                  setDate(newDate);
                }
              }}
              mode="date"
            />
          </VStack>
          <VStack>
            <FormControl.Label>Heure de début</FormControl.Label>
            <DateTimePicker
              value={startTime}
              style={{ width: '100%' }}
              onChange={(_, newDate) => {
                if (newDate !== undefined) {
                  setStartTime(newDate);
                }
              }}
              mode="time"
            />
          </VStack>
          <VStack>
            <FormControl.Label>Heure de fin</FormControl.Label>
            <DateTimePicker
              value={endTime}
              style={{ width: '100%' }}
              onChange={(_, newDate) => {
                if (newDate !== undefined) {
                  setEndTime(newDate);
                }
              }}
              mode="time"
            />
          </VStack>
          <VStack>
            <FormControl.Label>Nombre de personnes</FormControl.Label>
            <Input defaultValue="100" bg="white" />
          </VStack>
          <HStack>
            <FormControl.Label flexGrow="1">
              Susceptible d'annulation
            </FormControl.Label>
            <Switch />
          </HStack>
        </VStack>
      </FormControl>

      <Box p="4">
        <Button>Envoyer la demande</Button>
      </Box>
    </VStack>
  );
};

export default CreateRequestScreen;
