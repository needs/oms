import { Select } from "native-base";
import { ComponentProps } from "react";

const RoomSelector = (props: ComponentProps<typeof Select>) => {
  return (
    <Select placeholder="Salle" {...props}>
      <Select.Item label="Grolier - Gymnase" value="1" />
      <Select.Item label="LEP - Gymnase" value="2" />
      <Select.Item label="Grand-champs - Multisport" value="2" />
      <Select.Item label="Grand-champs - Gym" value="2" />
      <Select.Item label="Grand-champs - Escalade" value="2" />
      <Select.Item label="Grand-champs - Réunion" value="2" />
    </Select>
  );
};

export default RoomSelector;
