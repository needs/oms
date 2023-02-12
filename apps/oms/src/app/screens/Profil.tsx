import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ChevronRightIcon, Divider, FormControl, HStack, Input, Pressable, Text, VStack } from "native-base";
import { StackNavigatorParamList } from "./StackNavigator";
import { TopTabNavigatorParamList } from "./TopTabNavigator";

const ProfilScreen = ({
  navigation,
}: CompositeScreenProps<
NativeStackScreenProps<TopTabNavigatorParamList, 'Profil'>,
NativeStackScreenProps<StackNavigatorParamList>
>) => {
  return (
    <VStack padding={4} space={4}>
      <FormControl>
        <VStack space={4}>
          <VStack>
            <FormControl.Label>Prénom</FormControl.Label>
            <Input bg="white" value="Timothée" />
          </VStack>
          <VStack>
            <FormControl.Label>Nom</FormControl.Label>
            <Input bg="white" value="Vialatoux" />
          </VStack>
          <VStack>
            <FormControl.Label>Email</FormControl.Label>
            <Input bg="white" value="timothee.vialatoux@gmail.com" />
          </VStack>
        </VStack>
      </FormControl>
      <VStack
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        backgroundColor="white"
        divider={<Divider />}
      >
        <Pressable onPress={() => navigation.navigate('Rooms')}>
          <HStack space={4} padding={4} alignItems="center">
            <FontAwesome5 name="building" size={18} color="black" />
            <Text flexGrow="1">Salles</Text>
            <ChevronRightIcon />
          </HStack>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Rooms')}>
          <HStack space={4} padding={4} alignItems="center">
          <MaterialIcons name="groups" size={18} color="black" />
            <Text flexGrow="1">Groupes</Text>
            <ChevronRightIcon />
          </HStack>
        </Pressable>
      </VStack>
    </VStack>
  );
};

export default ProfilScreen;
