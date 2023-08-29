import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import DropDownLoader from "../../components/loaders/DropDownLoader";
import { addCourseToPlaylist } from "../../redux/actions/admin";
import { getAllCourses } from "../../redux/actions/course";

const DropdownComponent = ({ id }) => {
  const [courseId, setCourseId] = useState();
  const dispatch = useDispatch();
  const { courses, loading } = useSelector((state) => state.course);

  const [clicked, setClicked] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  return loading ? (
    <DropDownLoader />
  ) : (
    <View style={styles.dropDownContainer}>
      <View style={styles.dropDown}>
        <View>
          <TouchableOpacity
            style={{
              width: "100%",
              height: 50,
              borderRadius: 10,
              borderWidth: 0.5,
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 15,
            }}
            onPress={() => {
              setClicked(!clicked);
            }}
          >
            <Text style={{ fontWeight: "600" }}>
              {selectedCourse == "" ? "Select Course" : selectedCourse}
            </Text>
            {clicked ? (
              <Image
                source={require("../../assets/up.png")}
                style={{ width: 20, height: 20 }}
              />
            ) : (
              <Image
                source={require("../../assets/down.png")}
                style={{ width: 20, height: 20 }}
              />
            )}
          </TouchableOpacity>
          {clicked ? (
            <View
              style={{
                elevation: 5,
                marginTop: 20,
                height: 300,
                paddingHorizontal: 10,
                alignSelf: "center",
                width: "90%",
                backgroundColor: "#fff",
                borderRadius: 20,
              }}
            >
              <FlatList
                nestedScrollEnabled={true}
                data={courses}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={{
                        width: "85%",
                        alignSelf: "center",
                        height: 50,
                        justifyContent: "center",
                        borderBottomWidth: 0.5,
                        borderColor: "#8e8e8e",
                      }}
                      onPress={() => {
                        setSelectedCourse(item.title);
                        setClicked(!clicked);
                        setCourseId(item._id);
                      }}
                    >
                      <Text style={{ fontWeight: "600" }}>{item.title}</Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          ) : null}
        </View>
      </View>
      <IconButton
        icon="playlist-plus"
        size={40}
        style={styles.dropDownIcon}
        onPress={() => {
          dispatch(addCourseToPlaylist(id, courseId));
          setSelectedCourse("");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownContainer: {
    width: "90%",
    height: 70,
    // borderWidth: 1,
    position: "relative",
  },
  dropDown: {
    width: "80%",
    position: "absolute",
    top: 20,
    zIndex: 100,
    left: 0,
  },
  dropDownIcon: {
    position: "absolute",
    top: 10,
    zIndex: 100,
    right: -10,
  },
});

export default DropdownComponent;
