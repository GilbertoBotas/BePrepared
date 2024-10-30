import {
  Bell,
  MessageCircleWarning,
  OctagonAlert,
  SendHorizonal,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { FlatList, Modal, Pressable, Text, View } from "react-native";
import { AlertListItem } from "../../components/AlertListItem";
import { styles } from "./styles";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { fetchData, postData } from "../../services/api";
import { useAuth } from "../../contexts/auth";

interface NotificationProps {
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

export function SentAlerts() {
  const [alerts, setAlerts] = useState<NotificationProps[]>([]);
  const [openAlertItemId, setOpenAlertItemId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const { subscriber } = useAuth();

  useEffect(() => {
    fetchAlerts();
  }, []);

  function fetchAlerts() {
    fetchData<NotificationProps[]>(`/notifications/${subscriber?.phone}`)
      .then((alerts) => {
        setAlerts(alerts);
      })
      .catch((error) => alert(error));
  }

  function handleSetOpenAlertItemId(id: string) {
    setOpenAlertItemId(id);
  }

  function handleOpenModal() {
    setModalOpen(true);
  }

  function handleCloseModal() {
    setModalOpen(false);
  }

  function handleSendAlert() {
    postData(`/notifications`, { message })
      .then((_response) => {
        alert("Alerta criado com sucesso!");
        handleCloseModal();
        setMessage('');
        fetchAlerts();
      })
      .catch((_error) => alert("Erro ao enviar um alerta"));
  }

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <View style={styles.header}>
          <Bell size={24} color={"#000000"} />
          <Text style={styles.headerTitle}>Alertas enviados</Text>
          <View style={styles.headerCount}>
            <Text style={styles.headerCountText}>3</Text>
          </View>
        </View>

        <FlatList
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
          style={styles.alertsList}
        />
      </View>

      <Pressable style={styles.floatingButton} onPress={handleOpenModal}>
        <MessageCircleWarning size={24} color={"#fff"} />
      </Pressable>

      <Modal
        transparent
        visible={modalOpen}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <Pressable
          // activeOpacity={0.9}
          style={styles.modalContainer}
          // onPress={handleCloseModal}
        >
          <TouchableOpacity activeOpacity={1} style={{ width: "100%" }}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <OctagonAlert color={"#000"} size={24} />
                <Text style={styles.modalTitle}>Escreva a mensagem</Text>
              </View>
              <View style={styles.modalInputContainer}>
                <TextInput
                  multiline
                  numberOfLines={6}
                  style={styles.modalInput}
                  value={message}
                  onChangeText={setMessage}
                ></TextInput>
                <Pressable
                  style={styles.modalButton}
                  onPress={handleSendAlert}
                >
                  <Text style={styles.modalButtonText}>Enviar</Text>
                  <SendHorizonal size={20} color={"#DB2B51"} />
                </Pressable>
              </View>
            </View>
          </TouchableOpacity>
        </Pressable>
      </Modal>
    </View>
  );
}
