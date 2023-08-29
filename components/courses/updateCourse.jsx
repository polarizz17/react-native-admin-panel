import * as DocumentPicker from "expo-document-picker";
// import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Button,
  IconButton,
  Modal,
  Portal,
  TextInput,
} from "react-native-paper";
import { useDispatch } from "react-redux";
import { updateCourse } from "../../redux/actions/admin";

const UpdateCourse = ({
  id,
  title: prevTitle,
  description: prevDescription,
  category: prevCategory,
  courseLink: prevCourseLink,
  createdBy: prevCreatedBy,
}) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState(prevTitle);
  const [description, setDescription] = useState(prevDescription);
  const [courseLink, setCourseLink] = useState(prevCourseLink);
  const [category, setCategory] = useState(prevCategory);
  const [createdBy, setCreatedBy] = useState(prevCreatedBy);
  const [image, setImage] = useState();
  const [disable, setDisable] = useState(true);

  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    setDisable(true);
    setImage(undefined);
  };

  const pickImage = async () => {
    try {
      const img = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        multiple: false,
      });
      if (!img.canceled) {
        setImage(img.assets[0]);
        setDisable(false);
      }
    } catch (error) {
      alert(error);
    }
  };

  const dispatch = useDispatch();

  const submitHandler = () => {
    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("courseLink", courseLink);
    myForm.append("category", category);
    myForm.append("createdBy", createdBy);
    myForm.append("file", {
      uri: image.uri,
      name: image.name,
      type: image.mimeType,
    });
    dispatch(updateCourse(id, myForm));
    hideModal();
  };
  return (
    <View>
      <IconButton icon="pencil" size={20} onPress={showModal} />

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}
          style={styles.modalContainer}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalHeader}>Add Course!</Text>
            <TextInput
              style={styles.TextInput}
              mode="outlined"
              label="Title"
              value={`${title}`}
              placeholder="Enter Course Title"
              onChangeText={(title) => setTitle(title)}
            />
            <TextInput
              style={styles.TextInput}
              mode="outlined"
              label="Description"
              value={`${description}`}
              placeholder="Enter Course Description"
              onChangeText={(description) => setDescription(description)}
            />
            <TextInput
              style={styles.TextInput}
              mode="outlined"
              label="Course Link"
              value={`${courseLink}`}
              placeholder="Enter Course Link"
              onChangeText={(courseLink) => setCourseLink(courseLink)}
            />
            <TextInput
              style={styles.TextInput}
              mode="outlined"
              label="Category"
              value={`${category}`}
              placeholder="Enter Course Category"
              onChangeText={(category) => setCategory(category)}
            />
            <TextInput
              style={styles.TextInput}
              mode="outlined"
              label="Created By"
              value={`${createdBy}`}
              placeholder="Enter Created By"
              onChangeText={(createdBy) => setCreatedBy(createdBy)}
            />
            <Button
              style={styles.documetPick}
              mode="contained-tonal"
              onPress={pickImage}
            >
              {image !== undefined ? `${image.name}` : "Choose Thumnail"}
            </Button>
            <Button
              style={styles.modalBtn}
              mode="elevated"
              onPress={submitHandler}
              disabled={disable}
            >
              Submit
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};
const styles = StyleSheet.create({
  btn: {
    width: "30%",
  },
  modalContainer: {
    marginHorizontal: 10,
  },
  containerStyle: {
    backgroundColor: "white",
    padding: 40,
    borderRadius: 10,
  },
  modalCard: {
    borderRadius: 10,
  },
  modalHeader: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  TextInput: {
    marginBottom: 10,
    overflow: "hidden",
  },
  documetPick: {
    marginBottom: 20,
    marginTop: 5,
  },
  modalBtn: {
    width: "50%",
    alignSelf: "center",
    marginTop: 20,
  },
});
export default UpdateCourse;
