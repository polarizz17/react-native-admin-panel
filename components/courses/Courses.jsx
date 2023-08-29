import React, { useEffect } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Chip, IconButton } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../Constant";
import { getAllCourses } from "../../redux/actions/course";
import { clearErrors, clearMessage } from "../../redux/reducers/adminReducers";
import PortalModule from "../general/Portal";
import Loader from "../loaders/Loader";
import AddCourse from "./AddCourse";
import PriceModal from "./PriceModal";
import UpdateCourse from "./updateCourse";

const Courses = () => {
  const { courses: courseData, loading } = useSelector((state) => state.course);
  const {
    message,
    error,
    loading: adminLoading,
  } = useSelector((state) => state.admin);

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
    dispatch(getAllCourses());
  }, [dispatch, error, message]);
  return loading || adminLoading ? (
    <Loader />
  ) : (
    <View style={styles.main}>
      <View style={styles.section1}>
        <AddCourse />
      </View>
      <View style={styles.section2}>
        <FlatList
          data={courseData}
          showsVerticalScrollIndicator={false}
          style={{ marginHorizontal: 10 }}
          renderItem={({ item }) => {
            return (
              <View style={styles.card}>
                <Image source={{ uri: item.poster.url }} style={styles.img} />
                <View style={styles.tetxtContainer}>
                  <View style={styles.header}>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.iconContainer}>
                      {/* <IconButton icon="pencil" size={20} /> */}
                      <UpdateCourse
                        id={item._id}
                        title={item.title}
                        description={item.description}
                        category={item.category}
                        courseLink={item.courseLink}
                        createdBy={item.createdBy}
                      />
                      <PortalModule
                        id={item._id}
                        students={item.students}
                        type={"course"}
                      />
                    </View>
                  </View>
                  <View style={styles.chipContainer}>
                    <Chip
                      icon="layers"
                      style={{ marginRight: 5 }}
                      textStyle={{ fontSize: 10 }}
                    >
                      {item.category}
                    </Chip>
                    <Chip icon="account" textStyle={{ fontSize: 10 }}>
                      {item.createdBy}
                    </Chip>
                  </View>
                  <View style={styles.priceContainer}>
                    <PriceModal type="base" price={item.price} id={item._id} />
                    {}
                    <PriceModal
                      type="discounted"
                      price={item.price}
                      id={item._id}
                    />
                    <PriceModal
                      type="todays"
                      price={item.price}
                      id={item._id}
                    />
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  section1: {
    width: "100%",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: "center",
  },

  section2: {
    width: "100%",
    paddingBottom: 80,
  },
  card: {
    width: "90%",
    height: 350,
    alignItems: "center",
    elevation: 20,
    backgroundColor: "white",
    borderRadius: 10,
    // paddingVertical: 20,
    // paddingHorizontal: 10,
    paddingBottom: 20,
    marginVertical: 15,
    marginHorizontal: 20,
    justifyContent: "space-between",
    shadowColor: `${colors.shadowColor}`,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  img: {
    width: "100%",
    // height: 200,
    height: "50%",
    borderRadius: 10,
  },
  tetxtContainer: {
    width: "90%",
    // padding: 10,
    paddingVertical: 10,
    // borderWidth: 1,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    // borderWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    // borderWidth: 1,
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  chipContainer: {
    flexDirection: "row",
  },
  priceContainer: {
    flexDirection: "row",
    // borderWidth: 1,
    justifyContent: "space-between",
    paddingTop: 10,
  },
});

export default Courses;
