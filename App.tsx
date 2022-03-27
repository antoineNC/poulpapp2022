import * as React from "react";
import { ConnexionStackNavigator } from "./navigation/connexionNavigator";
import { NavigationContainer } from "@react-navigation/native";

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <ConnexionStackNavigator />
      </NavigationContainer>
    );
  }
}