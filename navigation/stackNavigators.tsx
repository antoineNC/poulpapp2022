import {
  createStackNavigator,
  StackNavigationOptions,
  StackNavigationProp,
} from "@react-navigation/stack";
import FilActu from "../screens/Actualite/FilActu";
import Calabar from "../screens/Calabar";
import CoupeFamilles from "../screens/CDF/CoupeFamilles";
import Menu from "../screens/Menu";
import PointsFamille from "../screens/CDF/PointsFamille";

export type RootStackParamList = {
  FilActu: undefined;
  PointsFamille: { isAdmin: boolean };
  Calabar: undefined;
  CoupeFamilles: undefined;
  Menu: undefined;
};

export interface NavigationProps {
  navigation: StackNavigationProp<RootStackParamList, any>;
}

const stackScreenOptions: StackNavigationOptions = {
  headerTitleAlign: "center",
};

const FilActuStack = createStackNavigator<RootStackParamList>();
export const FilActuStackScreen = () => {
  return (
    <FilActuStack.Navigator screenOptions={stackScreenOptions}>
      <FilActuStack.Screen
        name="FilActu"
        component={FilActu}
        options={({ navigation }) => ({
          title: "Fil d'actualité",
          headerStyle: { backgroundColor: "#F0E4EF" },
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
          headerStyle: { backgroundColor: "#F0E4EF" },
        })}
      />
    </CalabarStack.Navigator>
  );
};

const CoupeFamillesStack = createStackNavigator<RootStackParamList>();
export const CDFStackNavigator = () => {
  return (
    <CoupeFamillesStack.Navigator screenOptions={stackScreenOptions}>
      <CoupeFamillesStack.Screen
        name="CoupeFamilles"
        component={CoupeFamilles}
        options={({ navigation }) => ({
          title: "Coupe des familles",
          headerStyle: { backgroundColor: "#F0E4EF" },
        })}
      />
      <CoupeFamillesStack.Screen
        name="PointsFamille"
        options={{
          title: "Les points de Famille",
          headerStyle: { backgroundColor: "#F0E4EF" },
        }}
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
