import React from "react";
import { View, StyleSheet, Text, Button, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import Boutton from "../../components/Button";
import { NavigationProps } from "../../navigation/stackNavigators";
// import { Asso } from "../../services/firebase.service";

export default class Menu extends React.Component<NavigationProps, {}> {
  render() {
      
    return (
      <View style={styles.main_container}>
        <Boutton
          text="Boîte à questions"
          onPress={() =>
            this.props.navigation.navigate("BoiteQuestions")}
        />
        <Boutton
          text="Gérer mes posts"
          onPress={() =>
            this.props.navigation.navigate("GererMesPosts")}
        />
        <Boutton
          text="Mon bureau"
          onPress={() =>
            this.props.navigation.navigate("Asso")}
        />
        <Boutton
          text="Partenariats"
          onPress={() =>
            this.props.navigation.navigate("Partenariats")}
        />
        <Boutton
          text="Clubs"
          onPress={() =>
            this.props.navigation.navigate("Clubs")}
        />
        <Boutton
          text="Cartes d'adhésions"
          onPress={() =>
            this.props.navigation.navigate("CartesAdhesions")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
