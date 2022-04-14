import React, { Component, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  Modal,
  TouchableOpacity,
} from "react-native";
import { NavigationProps } from "../navigation/stackNavigators";
import PostItem from "./PostItemCDF";
import Post from "../Services/post.model";

interface PostListProps extends NavigationProps {
  posts: Array<Post>;
}

interface PostListState {
  modalOpen: boolean;
  postDisplayed: Post;
}

export default class PostListCDF extends Component<
  PostListProps,
  PostListState
> {
  state: PostListState = {
    postDisplayed: {
      id: "",
      titre: "",
      description: "",
      tags: [""],
      image: "",
      editor: "",
    },
    modalOpen: false,
  };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  displayPost = (post: Post) => {
    // Le post à afficher est stocké dans le state
    this.setState({ postDisplayed: post });
    this.toggleModal();
  };

  render() {
    return (
      <View>
        <Modal visible={this.state.modalOpen} animationType="slide">
          <View>
            <PostItem
              post={this.state.postDisplayed}
              onPressClose={() => this.toggleModal()}
            />
          </View>
        </Modal>
        <FlatList
          data={this.props.posts}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.displayPost(item)}>
              <View style={styles.post}>
                <Text style={styles.titre}>{item.titre}</Text>
                <Text numberOfLines={3}>{item.description}</Text>
                <Image source={{ uri: item.image }} style={styles.image} />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 250,
    resizeMode: "contain",
  },
  titre: {
    fontWeight: "bold",
    textAlign: "center",
  },
  post: {
    flex: 1,
    margin: 20,
  },
});
