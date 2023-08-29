import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../Constant";
import Courses from "../../components/courses/Courses";
import Dashboard from "../../components/dashboard/Dashboard";
import PreLoader from "../../components/loaders/PreLoader";
import Messages from "../../components/messages/Messages";
import Users from "../../components/users/Users";
import { logout } from "../../redux/actions/user";
import { clearErrors, clearMessage } from "../../redux/reducers/userReducers";

const Tab = createMaterialBottomTabNavigator();

const Admin = () => {
  const { message, error, loading } = useSelector((state) => state.user);

  const showToastSuccess = () => {
    Toast.show({
      type: "success",
      text1: `${message}`,
    });
  };
  const showToastError = () => {
    Toast.show({
      type: "error",
      text1: `${error}`,
    });
  };

  useEffect(() => {
    if (error) {
      showToastError();
      dispatch(clearErrors());
    }

    if (message) {
      showToastSuccess();
      dispatch(clearMessage());
    }
  }, [dispatch, error, message]);

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };

  return loading ? (
    <PreLoader />
  ) : (
    <>
      <Appbar.Header mode="center-aligned">
        <Appbar.Content
          title="Admin Panel"
          titleStyle={{ fontWeight: "bold", color: "#1abebe" }}
        />
        <Appbar.Action icon="logout" onPress={logoutHandler} />
      </Appbar.Header>
      <Tab.Navigator
        initialRouteName="Dashboard"
        shifting={true}
        activeColor={`${colors.baseColor}`}
        inactiveColor="black"
        barStyle={styles.barStyle}
      >
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarLabel: "Dashboard",
            tabBarIcon: ({ color }) => {
              return <Icon name="view-dashboard" size={25} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Users"
          component={Users}
          options={{
            tabBarLabel: "Users",
            tabBarIcon: ({ color }) => {
              return <Icon name="account" size={25} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Courses"
          component={Courses}
          options={{
            tabBarLabel: "Courses",
            tabBarIcon: ({ color }) => {
              return <Icon name="book-education" size={25} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Messages"
          component={Messages}
          options={{
            tabBarLabel: "Messages",
            tabBarIcon: ({ color }) => {
              return <Icon name="android-messages" size={25} color={color} />;
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  barStyle: {},
});

export default Admin;
