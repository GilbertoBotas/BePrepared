import { ArrowRight } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { ComponentProps, PropsWithChildren } from "react";

interface ButtonProps extends ComponentProps<typeof TouchableOpacity> {
  placeholder: string;
}

export function ButtonWithIcon({placeholder, ...props}: PropsWithChildren<ButtonProps>) {
  return (
    <>
      <TouchableOpacity style={styles.container} {...props}>
        <Text style={styles.buttonText}>{placeholder}</Text>
        <ArrowRight color={"white"}></ArrowRight>
      </TouchableOpacity>
    </>
  );
}
