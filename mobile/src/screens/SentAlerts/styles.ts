import { Inter_700Bold } from '@expo-google-fonts/inter';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    marginTop: 24,
    padding: 12,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#00000040",
    gap: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontFamily: "Inter_700Bold",
  },
  countContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerCount: {
    borderWidth: 1,
    borderBlockColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    borderRadius: 4,
  },
  headerCountText: {
    fontSize: 12,
  },
  alertsList: {
    gap: 10,
  },
  floatingButton: {
    backgroundColor: "#DB2B51",
    height: 60,
    width: 60,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000030",
    padding: 32,
    paddingVertical: 64,
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 12,
    gap: 12,
  },
  modalHeader: {
    flexDirection: "row",
    gap: 10,
  },
  modalTitle: {
    fontSize: 14,
    fontFamily: "Inter_700Bold",
  },
  modalInputContainer: {
    borderWidth: 1,
    borderColor: "#DADADA",
    borderRadius: 6,
    padding: 6,
    gap: 12,
  },
  modalInput: {
    textAlignVertical: "top",
  },
  modalButton: { 
    flexDirection: "row",
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 6,
    paddingHorizontal: 15,
    paddingVertical: 6,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalButtonText: {
    fontFamily: 'Inter_700Bold',
    color: '#DB2B51'
  },
});
