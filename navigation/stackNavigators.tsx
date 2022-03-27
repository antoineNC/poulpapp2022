import React from "react";
import {
  createStackNavigator,
  StackNavigationOptions,
  StackNavigationProp,
} from "@react-navigation/stack";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
//import * as firebase from "firebase";
//import { PostData } from "../Services/firestore.service";

//import Connexion from "../screens/Connexion/Connexion";
//import Inscription from "../screens/Connexion/Inscription";
import FilActu from "../screens/FilActu/FilActu";
import Calendrier from "../screens/FilActu/Calendrier";
import CreerPost from "../screens/FilActu/CreerPost";
import ModifPost from "../screens/FilActu/ModifierPost";
import Calabar from "../screens/Calabar";
import CoupeFamilles from "../screens/CoupeFamilles";
import Menu from "../screens/Menu/Menu";
//import GererMesPosts from "../screens/Menu/GererMesPosts";
//import Partenariats from "../screens/Menu/Partenariats";
//import Asso from "../screens/Menu/Asso";
//import CartesAdhesions from "../screens/Menu/CartesAdhesions";
//import Clubs from "../screens/Menu/Clubs";
//import Parametres from "../screens/Menu/Parametres";
//import BoiteQuestions from "../screens/Menu/BoiteQuestions";

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
      {/* <FilActuStack.Screen name="GererMesPosts" component={GererMesPosts} />
      <FilActuStack.Screen name="Partenariats" component={Partenariats} />
      <FilActuStack.Screen name="Asso" component={Asso} />
      <FilActuStack.Screen name="CartesAdhesions" component={CartesAdhesions} />
      <FilActuStack.Screen name="Clubs" component={Clubs} />
      <FilActuStack.Screen name="Parametres" component={Parametres} />
      <FilActuStack.Screen name="BoiteQuestions" component={BoiteQuestions} /> */}
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
