import Main from "./Main";

import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import store from "./redux/store";

import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import Icon1 from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import colors from "./Constant";

const toastConfig = {
  error: ({ text1 }) => (
    <View style={styles.toast}>
      <Icon1 name="circle-with-cross" size={20} color="red" />
      <Text style={styles.text}>{text1}</Text>
    </View>
  ),

  success: ({ text1 }) => (
    <View style={styles.toast}>
      <Icon2 name="check-circle" size={20} color="green" />
      <Text style={styles.text}>{text1}</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  toast: {
    flexDirection: "row",
    // height: 40,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
    elevation: 10,
    shadowColor: `${colors.shadowColor}`,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    paddingHorizontal: 5,
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Main />
        <Toast config={toastConfig} />
      </PaperProvider>
    </Provider>
  );
}
