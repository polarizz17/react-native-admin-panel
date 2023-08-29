import React, { useEffect, useState } from "react";
import {
  Button as Buttonr,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, Card, Dialog, Portal } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../Constant";
import { deleteMessage, getAllMessages } from "../../redux/actions/admin";
import { clearErrors, clearMessage } from "../../redux/reducers/adminReducers";
import Loader from "../loaders/Loader";

const Messages = () => {
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const { error, loading, contact, message } = useSelector(
    (state) => state.admin
  );

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

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      showToastError();
      dispatch(clearErrors());
    }
    if (message) {
      showToastSuccess();
      dispatch(clearMessage());
    }
    dispatch(getAllMessages());
  }, [dispatch, error, message]);

  return loading ? (
    <Loader />
  ) : (
    <View style={styles.main}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={contact}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title
              title={item.name}
              subtitle={item.email}
              titleStyle={styles.name}
              subtitleStyle={styles.email}
            />
            <Card.Content style={{ paddingTop: 10 }}>
              <FlatList
                data={item.message}
                renderItem={({ item }) => (
                  <Text style={styles.message}>{item}</Text>
                )}
                keyExtractor={(item, index) => index}
              />
            </Card.Content>
            <Card.Actions>
              <Button
                mode="elevated"
                style={styles.btn}
                icon="delete"
                onPress={showDialog}
              >
                Delete
              </Button>
              <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                  <Dialog.Icon icon="alert-circle-outline" size={50} />
                  <Dialog.Content
                    style={{ alignItems: "center", paddingVertical: 5 }}
                  >
                    <Text variant="bodyMedium">
                      Are you sure you want to delete this message?
                    </Text>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button
                      textColor="red"
                      onPress={() => {
                        dispatch(deleteMessage(item._id));
                        hideDialog();
                      }}
                    >
                      Yes
                    </Button>
                    <Button onPress={hideDialog}> Cancel</Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            </Card.Actions>
          </Card>
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  header: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1abebe",
    marginVertical: 20,
  },

  card: {
    width: 300,
    marginVertical: 15,
    marginHorizontal: 10,
    backgroundColor: "white",
    elevation: 20,
    shadowColor: `${colors.shadowColor}`,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 5,
  },
  email: {
    color: "gray",
  },
  btn: {
    marginBottom: 10,
    marginRight: 10,
  },
  message: {
    marginBottom: 5,
  },
});

export default Messages;
