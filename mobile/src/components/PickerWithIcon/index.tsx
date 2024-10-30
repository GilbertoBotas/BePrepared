import { TextInput, View } from "react-native";
import { LucideIcon, Phone } from "lucide-react-native";
import { styles } from "./styles";
import { ComponentProps, PropsWithChildren, useState } from "react";
import { Picker } from "@react-native-picker/picker";

interface Option {
  id: string;
  designation: string;
}

interface InputProps extends ComponentProps<typeof Picker<string>> {
  title: string;
  options: Option[];
  Icon: LucideIcon;
}

export function PickerWithIcon({
  title,
  options,
  Icon,
  ...props
}: PropsWithChildren<InputProps>) {
  return (
    <View style={styles.container}>
      <Icon color={"#000000"} />
      <Picker prompt={title} style={styles.picker} {...props}>
        <Picker.Item label={`Selecione ${title}`} value={title} enabled={false} />
        {options.map((option) => (
          <Picker.Item label={option.designation} value={option.id} />
        ))}
      </Picker>
    </View>
  );
}
