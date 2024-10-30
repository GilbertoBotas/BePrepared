import { ChevronRight } from "lucide-react-native";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

interface AlertProps {
  id: string;
  message: string;
  isOpen: boolean;
  onSetOpenItem: (id: string) => void;
}

export function AlertListItem({ id, message, isOpen, onSetOpenItem }: AlertProps) {
  const rotate = useSharedValue('0deg');

  if(!isOpen) rotate.value = withSpring('0deg');
  
  function handleOpenItem() {
    rotate.value = withSpring('90deg');
    onSetOpenItem(id);
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleOpenItem}
      activeOpacity={0.5}
    >
      <View style={styles.circle}></View>
      <Text style={styles.message} numberOfLines={isOpen ? undefined : 2}>
        {message}
      </Text>
      <Animated.View style={{ transform: [{
        rotate: rotate
      }] }}>
        <ChevronRight size={12} color="#000000" />
      </Animated.View>
    </TouchableOpacity>
  );
}
