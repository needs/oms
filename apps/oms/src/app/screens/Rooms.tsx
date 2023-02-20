import { apiRoomsResponseSchema } from '@oms-monorepo/shared';
import { ScrollView, VStack } from 'native-base';
import Building from '../components/Building';
import z from 'zod';
import { useState, useEffect } from 'react';
import { getServerUrl } from '../settings';

const RoomsScreen = () => {
  const [buildings, setBuildings] = useState<
    z.infer<typeof apiRoomsResponseSchema> | undefined
  >(undefined);

  useEffect(() => {
    fetch(`${getServerUrl()}/rooms`)
      .then((response) => response.json())
      .then((data) => setBuildings(data));
  });

  return (
    <ScrollView>
      <VStack safeAreaBottom minHeight="100%" padding={4} space={4}>
        {buildings !== undefined &&
          buildings.map((building) => (
            <Building building={building} key={building.id} />
          ))}
      </VStack>
    </ScrollView>
  );
};

export default RoomsScreen;
