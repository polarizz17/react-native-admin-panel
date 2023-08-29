import React from "react";
import { StyleSheet, View } from "react-native";

const PreLoader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.rect2}></View>
      <View style={styles.rect5}></View>
      <View style={styles.rect7}></View>
      <View style={styles.rect8}></View>
      <View style={styles.rect9}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000000",
  },
  rect2: {
    width: 260,
    height: 171,
    backgroundColor: "#E6E6E6",
    marginTop: 150,
    marginLeft: 50,
    borderRadius: 10,
  },
  rect5: {
    width: 375,
    height: 91,
    backgroundColor: "#E6E6E6",
    marginTop: 400,
    borderRadius: 10,
  },
  rect7: {
    width: 330,
    height: 68,
    backgroundColor: "#E6E6E6",
    marginTop: -760,
    marginLeft: 15,
    borderRadius: 10,
  },
  rect8: {
    width: 260,
    height: 171,
    backgroundColor: "#E6E6E6",
    marginTop: 223,
    marginLeft: 50,
    borderRadius: 10,
  },
  rect9: {
    width: 260,
    height: 171,
    backgroundColor: "#E6E6E6",
    marginTop: 21,
    marginLeft: 50,
    borderRadius: 10,
  },
});

export default PreLoader;
