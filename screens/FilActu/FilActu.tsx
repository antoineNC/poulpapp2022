import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { Icon } from "react-native-elements";
//import firestoreService, { PostData } from "../../Services/firestore.service";
import { NavigationProps } from "../../Navigation/stackNavigators";
import { LogBox } from "react-native";



export default class FilActuScreen extends Component<NavigationProps,{}>{
  render(){
      return(
          <View style={styles.mainContainer}>
              <Text style={styles.text}>
                  Partie codée sur l'autre projet PII Poulpapp 👌
              </Text>
          </View>
          )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    alignItems: "center",
    justifyContent: "center"
  },

  buttonCalendar: {
    margin: 20,
    backgroundColor: "#52234E",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 0,
  },
  text: {
    fontWeight:"bold",
    textAlign:"center"
  },
  calendarView: {
    flexDirection: "row",
    alignItems: "center",
  },

  floatingButton: {
    width: 60,
    height: 60,
    backgroundColor: "#52234E",
    position: "absolute",
    bottom: 30,
    right: 30,
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  textFloatingButton: {
    color: "white",
    fontSize: 32,
    marginLeft: 2,
    marginBottom: 2,
  },
});
