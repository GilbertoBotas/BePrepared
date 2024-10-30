import { Bell } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { AlertListItem } from "../../components/AlertListItem";
import { styles } from "./styles";
import { fetchData } from "../../services/api";
import { useAuth } from "../../contexts/auth";

interface AlertsProps {
  id: string;
  title: string;
  message: string;
  districtId: string;
  provinceId: string;
  createdAt: Date;
  province: {
    id: string;
    designation: string;
  };
  district: {
    id: string;
    designation: string;
  };
}

export function Home() {
  const [alerts, setAlerts] = useState<AlertsProps[]>([]);
  const [openAlertItemId, setOpenAlertItemId] = useState('');

  const { subscriber } = useAuth();

  useEffect(() => {
    fetchData<AlertsProps[]>(
      `/alerts?provinceId=${subscriber?.provinceId}&districtId=${subscriber?.districtId}`
    )
      .then((alerts) => setAlerts(alerts))
  }, []);

  function handleSetOpenAlertItemId(id: string) {
    setOpenAlertItemId(id);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Bell size={24} color={"#000000"} />
        <Text style={styles.headerTitle}>Alertas</Text>
        <View style={styles.headerCount}>
          <Text style={styles.headerCountText}>3</Text>
        </View>
      </View>

      <FlatList
        style={styles.alertsList}
        data={alerts}
        renderItem={({ item }) => (
          <AlertListItem
            id={item.id}
            message={item.message}
            isOpen={openAlertItemId === item.id}
            onSetOpenItem={handleSetOpenAlertItemId}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
