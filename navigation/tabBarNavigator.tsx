import React from "react";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

import {
  RootStackParamList,
  FilActuStackNavigator,
  CalabarStackScreen,
  CoupeFamillesStackScreen,
  MenuStackScreen,
} from "./stackNavigators";

const getTabBarIcon = () => {
  return <Icon name="sign-out" type="font-awesome" color="#52234E" />;
};

const Tab = createBottomTabNavigator<RootStackParamList>();
export const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: "white",
      tabBarActiveBackgroundColor: "#52234E",
      tabBarInactiveTintColor: "gray",
      tabBarLabelStyle: {
      fontSize: 10,},
    }}
  >
    <Tab.Screen
      name="FildActu"
      component={FilActuStackNavigator}
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
      component={CoupeFamillesStackScreen}
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
