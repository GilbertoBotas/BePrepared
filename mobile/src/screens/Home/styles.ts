import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
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
    fontSize: 12
  },
  alertsList: {
    gap: 10
  }
});
