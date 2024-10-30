import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    padding: 14,
    gap: 32,
    borderRadius: 8,
    alignItems: 'center'
  },
  modalHeader: {
    alignItems: 'center',
    gap: 10,
  },
  modalTitle: {
    fontSize: 14,
    fontFamily: "Inter_700Bold",
  },
  modalText: {
    textAlign: 'justify',
  },
  modalButton: {
    backgroundColor: '#DB2B51',
    borderColor: "#DADADA",
    borderRadius: 6,
    paddingHorizontal: 15,
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center"
  },
  modalButtonText: {
    fontFamily: "Inter_700Bold",
    color: "#FFF",
  },
});
