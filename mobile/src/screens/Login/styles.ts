import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginTop: 110,
    alignItems: "center",
    gap: 24,
  },
  welcomeText: {
    maxWidth: 300,
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  tabsContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 4,
  },
  tabButton: {
    padding: 4,
  },
  tabButtonText: {
    fontFamily: "Inter_400Regular",
  },
  activeTabButtonText: {
    fontFamily: "Inter_700Bold",
  },
  tabSeparator: {
    width: 1,
    height: 14,
    backgroundColor: "#D9D9D9",
  },
  formContainer: {
    width: '100%',
    gap: 24
  }
});
