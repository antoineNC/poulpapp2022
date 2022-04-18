import React, { Component, useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  Alert,
  Text,
} from "react-native";
import {
  NavigationProps,
  RootStackParamList,
} from "../../navigation/stackNavigators";
import { RouteProp } from "@react-navigation/core";
import Icon from "react-native-vector-icons/Entypo";
import postService, { Post } from "../../Services/post.model";
import PostListCDF from "../../components/PostCDF/PostList";
import CreerPost from "../../components/PostCDF/CreerPost";

interface CDFState {
  isAdmin: boolean;
  data: Array<Post>;
  modalCreateOpen: boolean;
}

interface CDFProps extends NavigationProps {
  route: RouteProp<RootStackParamList, "CoupeFamilles">;
}

export default class CoupeFamilles extends Component<CDFProps, CDFState, {}> {
  state: CDFState = {
    isAdmin: true,
    data: postService.posts,
    modalCreateOpen: false,
  };

  loadPosts = () => {
    // Load all modules
    postService.getAll().then((data) => {
      this.setState({ data });
    });
  };

  addPost = (post: Post) => {
    postService.add(post);
    this.loadPosts();
  };

  // Fonction appelée lors de la suppression d'un post
  removePost = (idPost?: string) => {
    // Une alerte s'affiche pour confirmer la suppression
    Alert.alert(
      "Attention",
      "Etes-vous sûr(e) de vouloir supprimer ce post ?",
      [
        {
          text: "Oui",
          onPress: () => {
            if (idPost) {
              postService.remove(idPost);
              this.loadPosts;
            }
          },
        },
        {
          text: "Non",
          onPress: () => {},
        },
      ]
    );
  };

  // Permet de naviguer vers l'écran de modification d'un post
  modifPost = (post: Post) => {
    postService.update(post);
    this.loadPosts;
  };

  componentDidMount() {
    this.loadPosts();
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Button //Normalement, être admin est une caractéristique du l'utilisateur
          onPress={() => this.setState({ isAdmin: !this.state.isAdmin })}
          title="Switch admin ou user"
          color="blue"
        />
        <PostListCDF
          posts={this.state.data}
          removePost={this.removePost}
          modifPost={this.modifPost}
          isAdmin={this.state.isAdmin}
        />
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("PointsFamille", {
              isAdmin: this.state.isAdmin,
            })
          }
          style={styles.pointButton}
        >
          <Icon name="bar-graph" color={"white"} size={25} />
        </TouchableOpacity>
        {/*Si c'est un admin, alors on affiche le bouton flottant, sinon rien (null)*/}
        {this.state.isAdmin ? (
          <View>
            <Modal visible={this.state.modalCreateOpen} animationType="slide">
              <CreerPost
                addPost={this.addPost}
                onPressClose={() => this.setState({ modalCreateOpen: false })}
              />
            </Modal>
            <TouchableOpacity
              onPress={() => this.setState({ modalCreateOpen: true })}
              style={styles.addButton}
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
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 15,
    marginRight: 15,
  },
  addButton: {
    width: 60,
    height: 60,
    backgroundColor: "#52234E",
    position: "absolute",
    bottom: 20,
    right: 30,
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  pointButton: {
    width: 60,
    height: 60,
    backgroundColor: "#52234E",
    position: "absolute",
    bottom: 20,
    left: 30,
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
    fontSize: 40,
  },
});
