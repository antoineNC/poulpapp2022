import React from "react";
import {
  createStackNavigator,
  StackNavigationOptions,
  StackNavigationProp,
} from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import FilActu from "../screens/Actualite/FilActu";
import Calabar from "../screens/Calabar";
import CoupeFamilles from "../screens/CDF/CoupeFamilles";
import Menu from "../screens/Menu";
import PointsFamille from "../screens/CDF/PointsFamille";

export type RootStackParamList = {
  Connexion: undefined;
  Inscription: undefined;
  FildActu: undefined;
  Calendrier: undefined;
  PointsFamille: { isAdmin: boolean };
  Calabar: undefined;
  CoupeFamilles: undefined;
  Menu: undefined;
  GererMesPosts: undefined;
  Partenariats: undefined;
  Asso: undefined;
  CartesAdhesions: undefined;
  Clubs: undefined;
  Parametres: undefined;
  BoiteQuestions: undefined;
};

export interface NavigationProps {
  navigation: StackNavigationProp<RootStackParamList, any>;
}

const stackScreenOptions: StackNavigationOptions = {
  headerTitleAlign: "center",
};

const FilActuStack = createStackNavigator<RootStackParamList>();
export const FilActuStackNavigator = () => {
  return (
    <FilActuStack.Navigator screenOptions={stackScreenOptions}>
      <FilActuStack.Screen
        name="FildActu"
        component={FilActu}
        options={({ navigation }) => ({
          title: "Fil d'actualité",
          headerLeft: () => null,
          headerRight: () => null,
        })}
      />
    </FilActuStack.Navigator>
  );
};

const CalabarStack = createStackNavigator<RootStackParamList>();
export const CalabarStackScreen = () => {
  return (
    <CalabarStack.Navigator screenOptions={stackScreenOptions}>
      <CalabarStack.Screen
        name="Calabar"
        component={Calabar}
        options={({ navigation }) => ({
          headerLeft: () => null,
          headerRight: () => null,
        })}
      />
    </CalabarStack.Navigator>
  );
};

const CoupeFamillesStack = createStackNavigator<RootStackParamList>();
export const CoupeFamillesStackScreen = () => {
  return (
    <CoupeFamillesStack.Navigator screenOptions={stackScreenOptions}>
      <CoupeFamillesStack.Screen
        name="CoupeFamilles"
        component={CoupeFamilles}
        options={({ navigation }) => ({
          title: "Coupe des familles",
          headerLeft: () => null,
          headerRight: () => null,
        })}
      />
      <CoupeFamillesStack.Screen
        name="PointsFamille"
        options={() => ({ title: "Les points de Famille" })}
        component={PointsFamille}
      />
    </CoupeFamillesStack.Navigator>
  );
};

const MenuStack = createStackNavigator<RootStackParamList>();
export const MenuStackScreen = () => {
  return (
    <MenuStack.Navigator screenOptions={stackScreenOptions}>
      <MenuStack.Screen
        name="Menu"
        component={Menu}
        options={({ navigation }) => ({
          headerLeft: () => null,
          headerRight: () => null,
        })}
      />
    </MenuStack.Navigator>
  );
};
