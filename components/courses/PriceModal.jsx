import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, Modal, Portal, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { updateCoursePrice } from "../../redux/actions/admin";

const PriceModal = ({ type, price, id }) => {
  const [visible, setVisible] = useState(false);
  const [basePrice, setBasePrice] = useState(price.basePrice);
  const [discountedPrice, setDiscountedPrice] = useState(price.discountedPrice);
  const [todaysPrice, setTodaysPrice] = useState(price.todaysPrice);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const dispatch = useDispatch();

  return (
    <View>
      <TouchableOpacity style={styles.price} onPress={showModal}>
        <Text style={styles.dynamicText}>
          {type === "base"
            ? `${price.basePrice}`
            : type === "discounted"
            ? `${price.discountedPrice}`
            : `${price.todaysPrice}`}
        </Text>
        <Text style={styles.staticText}>
          {type === "base"
            ? `Base Price`
            : type === "discounted"
            ? `Discounted Price`
            : `Today's Price`}
        </Text>
      </TouchableOpacity>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}
          style={styles.modalContainer}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalHeader}>Update Pricing!</Text>
            <TextInput
              keyboardType="number-pad"
              mode="outlined"
              label={
                type === "base"
                  ? `Base Price`
                  : type === "discounted"
                  ? `Discounted Price`
                  : `Today's Price`
              }
              value={
                type === "base"
                  ? `${basePrice}`
                  : type === "discounted"
                  ? `${discountedPrice}`
                  : `${todaysPrice}`
              }
              placeholder="Enter Pricing"
              onChangeText={(price) => {
                type === "base"
                  ? setBasePrice(price)
                  : type === "discounted"
                  ? setDiscountedPrice(price)
                  : setTodaysPrice(price);
              }}
            />
            <Button
              style={styles.modalBtn}
              mode="elevated"
              onPress={() => {
                dispatch(
                  updateCoursePrice(id, basePrice, discountedPrice, todaysPrice)
                );
                // console.log(id, basePrice, discountedPrice, todaysPrice);
                hideModal();
              }}
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
  price: {
    alignItems: "center",
  },
  dynamicText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  staticText: {
    color: "gray",
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
  modalBtn: {
    width: "50%",
    alignSelf: "center",
    marginTop: 20,
  },
});

export default PriceModal;
