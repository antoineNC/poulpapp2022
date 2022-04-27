import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Constants from "expo-constants";
import { NavigationProps } from "../navigation/stackNavigators";
// import { Asso } from "../../services/firebase.service";

export default class Menu extends React.Component<NavigationProps, {}> {
  render() {
    return (
      <View style={styles.main_container}>
        <Text style={styles.text}>
          Partie codée sur un projet PII Poulpapp 2021
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
