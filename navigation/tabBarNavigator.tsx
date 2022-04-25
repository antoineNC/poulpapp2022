import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

import {
  RootStackParamList,
  FilActuStackScreen,
  CalabarStackScreen,
  CDFStackNavigator,
  MenuStackScreen,
} from "./stackNavigators";

const Tab = createBottomTabNavigator<RootStackParamList>();
export const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: "white",
      tabBarActiveBackgroundColor: "#52234E",
      tabBarInactiveTintColor: "gray",
      tabBarLabelStyle: {
        fontSize: 10,
      },
    }}
  >
    <Tab.Screen
      name="FilActu"
      component={FilActuStackScreen}
      options={{
        tabBarLabel: "Fil d'actualité",
        tabBarIcon: (props) => (
          <Icon
            name="users"
            type="font-awesome"
            color={props.color}
            size={props.size}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Calabar"
      component={CalabarStackScreen}
      options={{
        tabBarIcon: (props) => (
          <Icon
            name="beer"
            type="ionicon"
            color={props.color}
            size={props.size}
          />
        ),
      }}
    />
    <Tab.Screen
      name="CoupeFamilles"
      component={CDFStackNavigator}
      options={{
        tabBarLabel: "Coupe des familles",
        tabBarIcon: (props) => (
          <Icon
            name="trophy"
            type="font-awesome"
            color={props.color}
            size={props.size}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Menu"
      component={MenuStackScreen}
      options={{
        tabBarIcon: (props) => (
          <Icon
            name="more-horizontal"
            type="feather"
            color={props.color}
            size={props.size}
          />
        ),
      }}
    />
  </Tab.Navigator>
);
