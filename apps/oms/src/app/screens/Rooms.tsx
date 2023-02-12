import { ScrollView, VStack } from "native-base";
import Building from "../components/Building";

const RoomsScreen = () => {
  const buildings = [
    {
      id: 1,
      name: 'Grolier',
      address: "Rue de la Paix, 69210 L'Arbresle",
      rooms: [
        {
          id: 1,
          name: 'Gymnase',
          description: 'Salle multi-sport',
          image: 'https://picsum.photos/200',
          capacity: 100,
        },
        {
          id: 2,
          name: 'Dojo',
          description: 'Art-martiaux',
          image: 'https://picsum.photos/201',
          capacity: 20,
        },
      ],
    },
    {
      id: 2,
      name: 'Grand-champs',
      address: 'Rue de la Paix, 69210 Sain-bel',
      rooms: [
        {
          id: 3,
          name: "Salle d'escalade",
          description: 'Escalade uniquement',
          image: 'https://picsum.photos/202',
          capacity: 20,
        },
        {
          id: 4,
          name: 'Salle de réunion',
          description: '10 tables, 20 chaises',
          image: 'https://picsum.photos/203',
          capacity: 20,
        },
        {
          id: 5,
          name: 'Gymnase multi-sports',
          description: 'Hauteur de plafond: 13m',
          image: 'https://picsum.photos/204',
          capacity: 100,
        },
      ],
    },
  ];

  return (
    <ScrollView>
      <VStack safeAreaBottom minHeight="100%" padding={4} space={4}>
        {buildings.map((building) => (
          <Building building={building} key={building.id} />
        ))}
      </VStack>
    </ScrollView>
  );
};

export default RoomsScreen;
