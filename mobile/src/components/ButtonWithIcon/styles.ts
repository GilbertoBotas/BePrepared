import { Inter_700Bold } from '@expo-google-fonts/inter';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DB2B51',
        flexDirection: 'row',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 18,
        gap: 12,
        width: 192,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'Inter_700Bold'
    }

});