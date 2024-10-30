import { TextInput, View } from "react-native";
import { LucideIcon, Phone } from 'lucide-react-native';
import { styles } from "./styles";
import { ComponentProps, PropsWithChildren } from "react";

interface InputProps extends ComponentProps<typeof TextInput> {
    placeholder: string;
    Icon: LucideIcon;
}

export function InputWithIcon({ placeholder, Icon, ...props }: PropsWithChildren<InputProps>) {
    return <View style={styles.container}>
        <Icon color={'#000000'}/>
        <TextInput placeholder={placeholder} style={styles.inputText} {...props}></TextInput>
    </View>
}