import { Text, View } from "react-native";
import { InputWithIcon } from "../../components/InputWithIcon";
import { MapPin, Phone } from "lucide-react-native";
import { PickerWithIcon } from "../../components/PickerWithIcon";
import { ButtonWithIcon } from "../../components/ButtonWithIcon";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { fetchData, updateData } from "../../services/api";
import { SubscriberData, useAuth } from "../../contexts/auth";

interface LocationProps {
  id: string;
  designation: string;
}

export function Profile() {
  const { subscriber } = useAuth();
  const { updateSubscriber } = useAuth();

  const [phone, setPhone] = useState(subscriber?.phone);
  const [provinces, setProvinces] = useState<LocationProps[]>([]);
  const [districts, setDistricts] = useState<LocationProps[]>([]);
  const [provinceId, setProvinceId] = useState(subscriber?.provinceId);
  const [districtId, setDistrictId] = useState(subscriber?.districtId);

  useEffect(() => {
    fetchData<LocationProps[]>("/provinces").then((provinces) => {
      setProvinces(provinces);
    });
    getDistricts();
  }, []);

  useEffect(() => {
    getDistricts();
  }, [provinceId]);

  function getDistricts() {
    fetchData<LocationProps[]>(`/districts/${provinceId}`).then((response) => {
      setDistricts(response);
    });
  }

  function handleUpdateSubscriber() {
    updateData<SubscriberData>("/subscribers", {
      phone,
      provinceId,
      districtId,
    })
      .then((response) => {
        updateSubscriber(response);
        alert("Dados actualizados com sucesso!");
      })
      .catch((error) => alert("Erro ao actualizar dados!"));
  }

  function handleChangeProvince(value: string) {
    setDistrictId("");
    setProvinceId(value);
  }

  return (
    <View style={styles.container}>
      <InputWithIcon
        placeholder="Celular"
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
        onValueChange={(value) => handleChangeProvince(value)}
      />
      <PickerWithIcon
        title="Distríto"
        Icon={MapPin}
        options={districts}
        selectedValue={districtId}
        onValueChange={(value) => setDistrictId(value)}
      />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleUpdateSubscriber}
      >
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}
