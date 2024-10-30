import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { Home } from "../screens/Home";
import { Profile } from "../screens/Profile";
import { SentAlerts } from "../screens/SentAlerts";
import { useAuth } from "../contexts/auth";

export function HomeDrawer() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitle: "",
        drawerActiveTintColor: "#DB2B51",
        drawerStyle: { width: "70%" },
        headerStatusBarHeight: 12,
        headerLeftContainerStyle: {
          borderWidth: 1,
          borderColor: "#000000",
          borderRadius: 6,
        },
      }}
      initialRouteName="Alertas"
      drawerContent={(props) => CustomDrawerContent(props)}
    >
      <Drawer.Screen name="Alertas" component={Home} />
      <Drawer.Screen name="Minha Conta" component={Profile} />
      <Drawer.Screen name="Alertas Enviados" component={SentAlerts} />
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { logout } = useAuth();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sair"
        onPress={logout}
        labelStyle={{ color: "red" }}
      />
    </DrawerContentScrollView>
  );
}
