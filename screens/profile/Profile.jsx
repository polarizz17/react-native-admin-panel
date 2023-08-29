import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Appbar,
  Avatar,
  Button,
  Chip,
  IconButton,
  Modal,
  Portal,
  TextInput,
} from "react-native-paper";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../Constant";
import Loader from "../../components/loaders/Loader";
import {
  deleteCourseFromPlaylist,
  getSingleUser,
  updateUserEarning,
} from "../../redux/actions/admin";
import { clearErrors, clearMessage } from "../../redux/reducers/adminReducers";
import DropdownComponent from "./DropDown";

const Profile = ({ navigation, route }) => {
  const { error, loading, user, message } = useSelector((state) => state.admin);
  // const { loading: courseLoading } = useSelector((state) => state.course);

  const [visible, setVisible] = useState(false);
  const [earning, setEarning] = useState(0);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [loading2, setloading2] = useState(true);

  const loadHandler = () => {
    setloading2(false);
  };

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
    dispatch(getSingleUser(route.params.id));
    loadHandler();
  }, [dispatch, error, message]);

  return loading || loading2 ? (
    <Loader />
  ) : (
    <View style={styles.main}>
      <Appbar.Header mode="center-aligned">
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate("Admin");
          }}
        />
        <Appbar.Content title={`${user.name.split(" ")[0]}'s Profile`} />
      </Appbar.Header>
      <View style={styles.container}>
        <View style={styles.profile}>
          <Avatar.Image
            size={100}
            source={{ uri: user.avatar.url }}
            style={styles.avatar}
          />
          <View style={styles.header}>
            <Text style={styles.headerName}>{user.name}</Text>
            <Text style={styles.headerEmail}>{user.email}</Text>
            <View style={styles.headerChipContainer}>
              <Chip style={styles.adminChip}>{user.role}</Chip>
              <Chip style={styles.subscriptionChip}>
                {user.subscription.status}
              </Chip>
            </View>
          </View>
        </View>
        <View style={styles.course}>
          <Text style={styles.courseText}>{`${
            user.name.split(" ")[0]
          }'s Courses`}</Text>
          <DropdownComponent id={user._id} />

          <FlatList
            horizontal={true}
            data={user.playlist}
            style={{ marginLeft: 5, marginRight: 20 }}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.courseCard}>
                  <Text>{item.name}</Text>
                  <IconButton
                    icon="playlist-remove"
                    style={{ padding: 0 }}
                    onPress={() => {
                      dispatch(
                        deleteCourseFromPlaylist(route.params.id, item.course)
                      );
                    }}
                  />
                </View>
              );
            }}
            keyExtractor={(item) => item._id}
          />
        </View>
        <View style={styles.earning}>
          <Text style={styles.earningText}>{`${
            user.name.split(" ")[0]
          }'s Earning`}</Text>
          <TouchableOpacity onPress={showModal} style={styles.card}>
            <IconButton
              style={styles.icon}
              icon={"account-cash"}
              iconColor={`${colors.baseColor}`}
              size={60}
            />
            <Text style={styles.text}>{user.earning}</Text>
          </TouchableOpacity>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={styles.containerStyle}
              style={styles.modalContainer}
            >
              <View style={styles.modalCard}>
                <Text style={styles.modalHeader}>Update Earning!</Text>
                <TextInput
                  mode="outlined"
                  keyboardType="numeric"
                  label="Earning"
                  value={`${earning}`}
                  placeholder="Enter Earning"
                  onChangeText={(earning) => setEarning(earning)}
                />
                <Button
                  style={styles.modalBtn}
                  mode="elevated"
                  onPress={() => {
                    dispatch(updateUserEarning(route.params.id, earning));
                    // console.log(route.params.id, earning);
                    hideModal();
                  }}
                >
                  Submit
                </Button>
              </View>
            </Modal>
          </Portal>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    alignItems: "center",
    // paddingVertical: 20,
    justifyContent: "space-evenly",
  },
  profile: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  header: {
    justifyContent: "space-evenly",
  },
  headerName: {
    fontSize: 20,
    fontWeight: "bold",
    // marginBottom: 2,
  },
  headerEmail: {
    color: "gray",
  },
  headerChipContainer: {
    flexDirection: "row",
  },
  adminChip: {
    fontSize: 10,
    // backgroundColor: "red",
    marginRight: 5,
  },
  subscriptionChip: {
    fontSize: 10,
  },

  course: {
    width: "100%",
    alignItems: "center",
    // paddingVertical: 20,
    // borderWidth: 1,
  },
  courseText: {
    fontSize: 30,
    fontWeight: "bold",
    color: `${colors.baseColor}`,
  },
  courseCard: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white",
    elevation: 10,
    marginVertical: 30,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: `${colors.shadowColor}`,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  earning: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  earningText: {
    fontSize: 30,
    fontWeight: "bold",
    color: `${colors.baseColor}`,
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 40,
    paddingVertical: 40,
    width: "90%",
    elevation: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: `${colors.shadowColor}`,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  icon: {
    // borderWidth: 1,
    // width: "50%",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
  modalContainer: {
    marginHorizontal: 10,
    // borderWidth: 1,
  },
  containerStyle: {
    backgroundColor: "white",
    // paddingHorizontal: 40,
    // paddingVertical: 40,
    padding: 40,
    borderRadius: 10,
    // borderWidth: 1,
  },
  modalCard: {
    borderRadius: 10,
    // borderWidth: 1,
  },
  modalHeader: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  modalBtn: {
    width: "50%",
    alignSelf: "center",
    marginTop: 20,
  },
});

export default Profile;
