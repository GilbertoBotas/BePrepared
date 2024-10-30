import { Phone } from "lucide-react-native";
import { ButtonWithIcon } from "../ButtonWithIcon";
import { InputWithIcon } from "../InputWithIcon";
import { useState } from "react";
import { postData } from "../../services/api";

interface LoginFormProps {
  onNavigate: (phone: string) => void
}

export function LoginForm({ onNavigate } : LoginFormProps) {
  const [phone, setPhone] = useState('');

  function handleSubmitForm() {
    postData("/auth/subscribers", {
      phone,
    })
      .then((_response) => {
        onNavigate(phone);
      })
      .catch((_error) => {
        alert("Numero de telefone inexistente!");
      });
  }

  return (
    <>
      <InputWithIcon placeholder="Contacto" Icon={Phone} keyboardType="phone-pad" value={phone} onChangeText={setPhone}/>
      <ButtonWithIcon placeholder="Entrar" onPress={handleSubmitForm}/>
    </>
  );
}
