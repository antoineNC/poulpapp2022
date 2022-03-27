import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

interface TagProps {
  tag: string;
  removeTag: (tag: string) => void;
}

export default class Tag extends Component<TagProps, {}> {
  removeTag = () => {
    this.props.removeTag(this.props.tag);
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.removeTag}
          style={{ flexDirection: "row" }}
        >
          <Text>{this.props.tag}</Text>
          <Text style={{ fontWeight: "bold" }}> &times; </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8AC8CE",
    borderRadius: 10,
    padding: 5,
    paddingLeft: 10,
    flexDirection: "row",
    margin: 5,
  },
});
