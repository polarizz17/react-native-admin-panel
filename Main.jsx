import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PreLoader from "./components/loaders/PreLoader";
import { loadUser } from "./redux/actions/user";
import Admin from "./screens/admin/Admin";
import Login from "./screens/login/Login";
import Profile from "./screens/profile/Profile";

const Stack = createNativeStackNavigator();
const Main = () => {
  const { user, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return loading ? (
    <PreLoader />
  ) : (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user.role === "admin" ? "Admin" : "Login"}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Admin"
          component={Admin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
