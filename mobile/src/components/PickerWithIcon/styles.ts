import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 1,
        alignItems: 'center',
        borderColor: '#969696',
        width: '100%',
        paddingLeft: 15,
        borderRadius: 6,
        gap: 10
    },
    picker: {
        flex: 1,
        // fontFamily: 'Inter_700Bold',
        fontSize: 14,
        // minHeight: 24
    }
});