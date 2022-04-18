import React, { Component, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import PostDisplayed from "./PostDisplayedCDF";
import PostItemCDF from "./PostItemCDF";
import { Post } from "../../Services/post.model";

interface PostListProps {
  posts: Array<Post>;
  isAdmin: boolean;
  removePost: (id?: string) => void;
  modifPost: (post: Post) => void;
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
      <View style={{ flex: 1 }}>
        <Modal visible={this.state.modalOpen} animationType="slide">
          <View>
            <PostDisplayed
              post={this.state.postDisplayed}
              onPressClose={this.toggleModal}
            />
          </View>
        </Modal>
        <FlatList
          data={this.props.posts}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.displayPost(item)}>
              <PostItemCDF
                post={item}
                removePost={this.props.removePost}
                modifPost={this.props.modifPost}
                isAdmin={this.props.isAdmin}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}
