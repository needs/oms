import { Text, View } from "native-base";
import NativeDateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import { LocaleConfig } from 'react-native-calendars';
import { ComponentProps } from "react";
import { Platform } from "react-native";

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr';

const DateTimePicker = (
  props: ComponentProps<typeof NativeDateTimePicker>
) => {
  const mode = 'mode' in props ? props.mode : 'date';

  return Platform.OS === 'android' ? (
    <View>
      <Text
        bg="coolGray.200"
        p={2}
        borderRadius={4}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onPress={() => DateTimePickerAndroid.open(props as any)}
      >
        {mode === 'date'
          ? props.value.toLocaleDateString()
          : props.value.toLocaleTimeString()}
      </Text>
    </View>
  ) : (
    <NativeDateTimePicker {...props} />
  );
};

export default DateTimePicker;
