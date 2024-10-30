import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "../screens/Login";
import { Otp } from "../screens/Otp";
import { HomeDrawer } from "./HomeDrawer";
import { useAuth } from "../contexts/auth";

export type StackParamsList = {
  Login: undefined;
  Otp: { phone: string };
  HomeDrawer: undefined;
};

const Stack = createStackNavigator<StackParamsList>();

export function AppStack() {
  const { loggedIn } = useAuth();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      { loggedIn ? (
        <Stack.Screen name="HomeDrawer" component={HomeDrawer} />
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Otp" component={Otp} />
        </>
      ) }
    </Stack.Navigator>
  );
}
