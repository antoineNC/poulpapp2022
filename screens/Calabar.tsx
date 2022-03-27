import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Switch } from "react-native";
import Constants from "expo-constants";

export default class CalabarScreen extends Component{
    render(){

        return(
            <View style={styles.main_container}>
                <Text style={styles.textStyle}>
                Partie codée sur le projet transpromo Poulpapp 2019/2020 👌
                </Text>
            </View>
            )
    }
}
const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: Constants.statusBarHeight,
      },

      textStyle:{
        fontWeight:"bold",
        textAlign:"center"
      },
});