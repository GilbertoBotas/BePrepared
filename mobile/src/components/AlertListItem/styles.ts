import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#DADADA",
    borderRadius: 4,
    padding: 8,
    gap: 6,
    marginVertical: 2,
  },
  circle: {
    width: 6,
    height: 6,
    backgroundColor: "#4A4B52",
    borderRadius: 6,
  },
  message: {
    fontSize: 12,
    lineHeight: 14,
    textAlign: "justify",
    flex: 1
  },
});
