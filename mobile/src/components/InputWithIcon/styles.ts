import { Inter_700Bold } from '@expo-google-fonts/inter';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#969696',
        width: '100%',
        padding: 15,
        borderRadius: 6,
        gap: 10
    },
    inputText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
        flex: 1,
        minHeight: 24
    }
});