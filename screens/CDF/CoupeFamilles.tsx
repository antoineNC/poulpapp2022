import React, { Component, useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Text,
} from "react-native";
import Constants from "expo-constants";
import PostListCDF from "../../components/PostList";
import {
  NavigationProps,
  RootStackParamList,
} from "../../navigation/stackNavigators";
import { RouteProp } from "@react-navigation/core";
import Post from "../../Services/post.model";

const Data = [
  {
    id: "1",
    titre: "Planet of Nature",
    description: "description1",
    image:
      "https://images.unsplash.com/photo-1482822683622-00effad5052e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    tags: [
      "Lorem ipsum",
      "dolor sit amet",
      "consectetur adipiscing elit",
      "sed do eiusmod tempor incididunt",
      "ut labore et dolore magna aliqua. ",
    ],
    editor: "bde",
  },
  {
    id: "2",
    titre: "Lampost",
    description: "description2",
    image:
      "https://images.unsplash.com/photo-1482822683622-00effad5052e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    tags: ["tag number 1", "original tag", "tag 2"],
    editor: "bds",
  },
  {
    id: "3",
    titre: "test 3",
    description:
      "lorem ipsum dolor sit amet ça ne veut rien dire mais j'ai besoin des faire des lignes et donc d'écrire à peu près n'importe quoi, j'espère que ce sera pas trop long, mdr j'ai déjà trop la flemme, d'ailleurs faut que j'aille me coucher demain je me lève tot",
    image:
      "https://images.unsplash.com/photo-1482822683622-00effad5052e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    tags: ["numero 0", "numéro 1"],
    editor: "bdf",
  },
];

interface CDFState {
  isAdmin: boolean;
  data: Array<Post>;
}

interface CDFProps extends NavigationProps {
  route: RouteProp<RootStackParamList, "CoupeFamilles">;
}

export default class CoupeFamilles extends Component<CDFProps, {}> {
  state: CDFState = {
    isAdmin: true,
    data: Data,
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <PostListCDF
          posts={this.state.data}
          navigation={this.props.navigation}
        />
        {/*Si c'est un admin, alors on affiche le bouton flottant, sinon rien (null)*/}
        {this.state.isAdmin ? (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("CreerPost", {
                data: this.state.data,
              })
            }
            style={styles.floatingButton}
          >
            <Text style={styles.textFloatingButton}>+</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    alignItems: "center",
  },

  buttonCalendar: {
    margin: 20,
    backgroundColor: "#52234E",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 0,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 15,
    marginRight: 15,
  },

  floatingButton: {
    width: 60,
    height: 60,
    backgroundColor: "#52234E",
    position: "absolute",
    bottom: 30,
    right: 30,
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  textFloatingButton: {
    color: "white",
    fontSize: 32,
    marginLeft: 2,
    marginBottom: 2,
  },
});
