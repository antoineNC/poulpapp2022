import React, { Component, useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
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
import postService, { Post } from "../../Services/post.model";
import CreerPost from "./CreerPost";

interface CDFState {
  isAdmin: boolean;
  data: Array<Post>;
  modalOpen: boolean;
}

interface CDFProps extends NavigationProps {
  route: RouteProp<RootStackParamList, "CoupeFamilles">;
}

export default class CoupeFamilles extends Component<CDFProps, CDFState, {}> {
  state: CDFState = {
    isAdmin: true,
    data: postService.posts,
    modalOpen: false,
  };

  // loadPosts = () => {
  //   // Load all modules
  //   postService.getAll().then((data) => {
  //     this.setState({ data });
  //   });
  // };

  addPost = (post: Post) => {
    postService.add(post);
    // this.loadPosts();
    postService.getAll().then((data) => {
      this.setState({ data });
    });
  };

  removePost = (id: string) => {
    postService.remove(id);
    // this.loadPosts();
  };

  componentDidMount() {
    //this.loadPosts();
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <PostListCDF posts={this.state.data} />
        {/*Si c'est un admin, alors on affiche le bouton flottant, sinon rien (null)*/}
        {this.state.isAdmin ? (
          <View>
            <Modal visible={this.state.modalOpen} animationType="slide">
              <CreerPost
                addPost={this.addPost}
                onPressClose={() => this.setState({ modalOpen: false })}
              />
            </Modal>
            <TouchableOpacity
              onPress={() => this.setState({ modalOpen: true })}
              style={styles.floatingButton}
            >
              <Text style={styles.textFloatingButton}>+</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    // alignItems: "center",
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
