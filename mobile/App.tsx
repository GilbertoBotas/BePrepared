import { StatusBar } from "expo-status-bar";
import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import { StyleSheet, AppRegistry, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import {
  Inter_400Regular,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { useEffect, useState } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { AppStack } from "./src/routes/AppStack";
import { AuthProvider } from "./src/contexts/auth";
import { PermissionsAndroid } from "react-native";
import { AlertModal } from "./src/components/AlertModal";

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#FFFFFF",
    },
  };

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    messaging().setBackgroundMessageHandler(handleNotification);
    const unsubscribe = messaging().onMessage(handleNotification);

    return unsubscribe;
  }, []);

  if (!loaded && !error) {
    return null;
  }

  function closeModal() {
    setModalOpen(false);
  }

  async function handleNotification(
    remoteMessage: FirebaseMessagingTypes.RemoteMessage
  ) {
    setModalOpen(true);
    setAlertMessage(remoteMessage.notification?.body + "");
  }

  return (
    <AuthProvider>
      <NavigationContainer theme={theme}>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar style="auto" />
          <AppStack></AppStack>
        </SafeAreaView>
      </NavigationContainer>
      <AlertModal
        onCloseModal={closeModal}
        modalOpen={modalOpen}
        alertMessage={alertMessage}
      ></AlertModal>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 32,
    paddingBottom: 32,
  },
});

AppRegistry.registerComponent("app", () => App);
