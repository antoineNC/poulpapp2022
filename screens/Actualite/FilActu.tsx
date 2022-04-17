import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { Icon } from "react-native-elements";
//import firestoreService, { PostData } from "../../Services/firestore.service";
import { NavigationProps } from "../../Navigation/stackNavigators";
import { LogBox } from "react-native";

export default class FilActuScreen extends Component<NavigationProps, {}> {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.text}>
          Partie codée sur un projet PII Poulpapp 2021
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
