import React, { Component, useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Text,
} from "react-native";
import PostListCDF from "../components/PostListCDF";
import { NavigationProps } from "../navigation/stackNavigators";

export default class CoupeFamilles extends Component<NavigationProps, {}> {
  render() {
    return (
      <View>
        <PostListCDF />
      </View>
    );
  }
}
