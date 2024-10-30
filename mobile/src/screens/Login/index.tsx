import React, { useState } from "react";
import Logo from "../../assets/logo.svg";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { LoginForm } from "../../components/LoginForm";
import { CreateAccountForm } from "../../components/CreateAccountForm";
import type { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { StackParamsList } from "../../routes/AppStack";
import { useAuth } from "../../contexts/auth";

export function Login({ navigation }: NativeStackScreenProps<StackParamsList , 'Login'>) {
  const [activeForm, setActiveForm] = useState<'login' | 'createAccount'>('login');
  // const auth = useAuth();
  // console.log(auth);

  function navigate(phone: string) {
    navigation.navigate("Otp", { phone });
  }

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.welcomeText}>
        Bem-vindo(a) ao BePrepared, introduza o seu contacto cadastrado para
        aceder ao sistema
      </Text>
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={styles.tabButton} onPress={() => setActiveForm('login')}>
          <Text style={activeForm === 'login' ? styles.activeTabButtonText : styles.tabButtonText}>Entrar</Text>
        </TouchableOpacity>
        <View style={styles.tabSeparator} />
        <TouchableOpacity style={styles.tabButton} onPress={() => setActiveForm('createAccount')}>
          <Text style={activeForm === 'createAccount' ? styles.activeTabButtonText : styles.tabButtonText}>Criar Conta</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        { activeForm === 'login' ? <LoginForm onNavigate={navigate} /> : <CreateAccountForm onNavigate={navigate} /> }
      </View>
    </View>
  );
}
