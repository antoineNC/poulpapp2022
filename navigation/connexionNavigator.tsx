import React from "react";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";

//import Connexion from "../Screens/Connexion/Connexion";
//import Inscription from "../Screens/Connexion/Inscription";
import { TabNavigator } from "./tabBarNavigator";
import { RootStackParamList } from "./stackNavigators";

const stackScreenOptions: StackNavigationOptions = {
  headerTitleAlign: "center",
};

const ConnexionStack = createStackNavigator<RootStackParamList>();
export const ConnexionStackNavigator = () => {
  return (
    <ConnexionStack.Navigator screenOptions={stackScreenOptions}>
      {/* <ConnexionStack.Screen
        name="Connexion"
        component={Connexion}
        options={{ title: "Connexion" }}
      />
      <ConnexionStack.Screen name="Inscription" component={Inscription} /> */}
      <ConnexionStack.Screen
        name="FildActu"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </ConnexionStack.Navigator>
  );
};
