import { KeySquare, Lock } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { InputWithIcon } from "../../components/InputWithIcon";
import { ButtonWithIcon } from "../../components/ButtonWithIcon";
import { styles } from "./styles";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { StackParamsList } from "../../routes/AppStack";
import { postData } from "../../services/api";
import { SubscriberData, useAuth } from "../../contexts/auth";
import messaging from "@react-native-firebase/messaging";

export function Otp({
  navigation,
  route,
}: NativeStackScreenProps<StackParamsList, "Otp">) {
  const phone = route.params;
  const [otp, setOpt] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const { updateSubscriber } = useAuth();

  useEffect(() => {
    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        messaging().getToken().then((token) => {
          setDeviceId(token);
          console.log(token);
        })
      }
    }
    requestUserPermission();
  }, []);

  function handleSubmitOtp() {
    postData<SubscriberData>("/auth/subscribers/otp", {
      otp: Number(otp),
      deviceId: deviceId,
      phone: phone.phone,
    })
      .then((response) => {
        updateSubscriber(response);
        navigation.navigate("HomeDrawer");
      })
      .catch((error) => {
        alert("Erro ao verificar codigo otp!");
      });
  }

  return (
    <View style={styles.container}>
      <KeySquare color={"#000000"} size={84} />
      <Text style={styles.descriptionText}>
        Introduza o código enviado para {phone.phone} isso serve para confirmar
        o acesso ao contacto.
      </Text>
      <InputWithIcon
        Icon={Lock}
        placeholder="OTP"
        value={otp}
        onChangeText={setOpt}
        keyboardType="number-pad"
      />
      <ButtonWithIcon placeholder="Confirmar" onPress={handleSubmitOtp} />
    </View>
  );
}
