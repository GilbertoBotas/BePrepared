import { OctagonAlert } from "lucide-react-native";
import { Modal, TouchableOpacity, Text, View, Pressable } from "react-native";
import { styles } from "./styles";

interface AlertModalProps {
  modalOpen: boolean;
  onCloseModal: () => void;
  alertMessage: string;
}

export function AlertModal({ modalOpen, onCloseModal, alertMessage }: AlertModalProps) {
  function handleCloseModal() {
    onCloseModal();
  }

  return (
    <Modal
      transparent
      visible={modalOpen}
      animationType="fade"
      onRequestClose={handleCloseModal}
    >
      <Pressable style={styles.modalContainer}>
        <TouchableOpacity activeOpacity={1} style={{ width: "100%" }}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <OctagonAlert color={"#DB2B51"} size={45} />
              <Text style={styles.modalTitle}>Alerta de Emergência</Text>
            </View>
            <Text style={styles.modalText}>
              {alertMessage}
            </Text>
            <Pressable style={styles.modalButton} onPress={handleCloseModal}>
              <Text style={styles.modalButtonText}>Confirmar</Text>
            </Pressable>
          </View>
        </TouchableOpacity>
      </Pressable>
    </Modal>
  );
}
