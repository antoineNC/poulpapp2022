import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { TabNavigator } from "./navigation/tabBarNavigator";

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    );
  }
}
