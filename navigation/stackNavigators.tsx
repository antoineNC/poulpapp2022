import React from "react";
import {
  createStackNavigator,
  StackNavigationOptions,
  StackNavigationProp,
} from "@react-navigation/stack";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import Post from "../Services/post.model";
import FilActu from "../screens/Actualite/FilActu";
import Calendrier from "../screens/Actualite/Calendrier";
import CreerPost from "../screens/CDF/CreerPost";
import ModifPost from "../screens/Actualite/ModifierPost";
import Calabar from "../screens/Calabar";
import CoupeFamilles from "../screens/CDF/CoupeFamilles";
import Menu from "../screens/Menu";

export type RootStackParamList = {
  Connexion: undefined;
  Inscription: undefined;
  FildActu: undefined;
  Calendrier: undefined;
  CreerPost: undefined;
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
          // (
          //   <TouchableOpacity
          //     onPress={() => deconnexion(navigation)}
          //     style={styles.quitButton}
          //   >
          //     <Icon name="sign-out" type="font-awesome" color="#52234E" />
          //   </TouchableOpacity>
          // ),
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
          // (
          //   <TouchableOpacity
          //     onPress={() => deconnexion(navigation)}
          //     style={styles.quitButton}
          //   >
          //     <Icon name="sign-out" type="font-awesome" color="#52234E" />
          //   </TouchableOpacity>
          // ),
        })}
      />
      <CoupeFamillesStack.Screen
        name="CreerPost"
        options={{ title: "Créer un post" }}
        component={CreerPost}
      />
      {/* <CoupeFamillesStack.Screen
        name="ModifPost"
        options={{ title: "Modifier un post" }}
        component={ModifPost}
      /> */}
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

const styles = StyleSheet.create({
  quitButton: {
    margin: 10,
    width: 50,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
});
