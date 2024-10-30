import { MapPin, Phone } from "lucide-react-native";
import { InputWithIcon } from "../InputWithIcon";
import { ButtonWithIcon } from "../ButtonWithIcon";
import { PickerWithIcon } from "../PickerWithIcon";
import { useEffect, useState } from "react";
import { fetchData, postData } from "../../services/api";

interface FormProps {
  onNavigate: (phone: string) => void;
}

interface LocationProps {
  id: string;
  designation: string;
}

export function CreateAccountForm({ onNavigate }: FormProps) {
  const [provinces, setProvinces] = useState<LocationProps[]>([]);
  const [districts, setDistricts] = useState<LocationProps[]>([]);
  const [provinceId, setProvinceId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    fetchData<LocationProps[]>("/provinces").then((provinces) => {
      setProvinces(provinces);
    });
  }, []);

  useEffect(() => {
    fetchData<LocationProps[]>(`/districts/${provinceId}`).then((response) => {
      setDistricts(response);
    });
  }, [provinceId]);

  function handleSubmitForm() {
    postData("/subscribers", {
      phone,
      provinceId,
      districtId,
    })
      .then((response) => {
        onNavigate(phone);
      })
      .catch((_error) => {
        alert("Erro ao criar conta!");
      });
  }

  return (
    <>
      <InputWithIcon
        placeholder="Contacto"
        Icon={Phone}
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <PickerWithIcon
        title="Província"
        Icon={MapPin}
        options={provinces}
        selectedValue={provinceId}
        onValueChange={(value) => setProvinceId(value)}
      />
      <PickerWithIcon
        title="Distríto"
        Icon={MapPin}
        options={districts}
        selectedValue={districtId}
        onValueChange={(value) => setDistrictId(value)}
      />
      <ButtonWithIcon placeholder="Criar conta" onPress={handleSubmitForm} />
    </>
  );
}
