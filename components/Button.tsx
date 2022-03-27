import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  text: string;
  onPress: (any: any) => void
}

export default class Button extends Component<ButtonProps, {}> {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={styles.appButtonContainer}
      >
        <Text style={styles.appButtonText}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
//   onPress=()=>{ 
//       const navigationTitle=this.props.navigationTitle;
//       this.props.onPress(navigationTitle)
//   }
}

const styles = StyleSheet.create({
  appButtonContainer: {
    margin: 10,
    backgroundColor: "#52234E",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
});
