import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Post } from "../Services/post.model";
import ModifPost from "../screens/CDF/ModifPost";
import { ScrollView } from "react-native-gesture-handler";

interface PostItemProps {
  post: Post;
  removePost: (id?: string) => void;
  modifPost: (post: Post) => void;
  isAdmin: boolean;
}

interface PostItemState {
  modalModifOpen: boolean;
}

export default class PostItem extends Component<PostItemProps, PostItemState> {
  state: PostItemState = {
    modalModifOpen: false,
  };

  // Permet de récupérer le chemin d'accès de l'image associé à l'association qui a créé le post
  getImagePath = () => {
    if (this.props.post.editor == "bde") {
      return require("../Image/bde.png");
    } else if (this.props.post.editor == "bds") {
      return require("../Image/bds.png");
    } else if (this.props.post.editor == "bda") {
      return require("../Image/bda.png");
    } else if (this.props.post.editor == "bdf") {
      return require("../Image/bdf.png");
    } else if (this.props.post.editor == "je") {
      return require("../Image/je.png");
    }
  };

  render() {
    return (
      <View style={styles.postContainer}>
        <ScrollView>
          <Modal visible={this.state.modalModifOpen} animationType="slide">
            <ModifPost
              updatePost={this.props.modifPost}
              onPressClose={() => this.setState({ modalModifOpen: false })}
              postToUpdate={this.props.post}
            />
          </Modal>
          <View style={styles.headerContainer}>
            <View>
              <Image source={this.getImagePath()} style={styles.logo} />
            </View>
            <View style={styles.headerContent}>
              <View style={styles.titreContainer}>
                <Text style={styles.titreText}>{this.props.post.titre}</Text>

                {/*Si l'utilisateur est le créateur du post, alors on affiche les boutons de suppression et modification */}
                {this.props.isAdmin ? (
                  <View style={styles.optionButtons}>
                    <TouchableOpacity
                      onPress={() => this.props.removePost(this.props.post.id)}
                    >
                      <Icon style={{ margin: 10 }} size={20} name="trash" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.setState({ modalModifOpen: true })}
                    >
                      <Icon
                        style={{ margin: 10, marginRight: 20 }}
                        size={20}
                        name="pencil"
                      />
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>

              {/*Affichage de la liste de tags */}
              <View style={styles.listTags}>
                {this.props.post.tags.map((item) => (
                  <Text>[{item}] </Text>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <Text numberOfLines={4}>
              {/*Limitation du nombre de lignes affichées*/}
              {this.props.post.description}
            </Text>
          </View>

          {/*Si le post contient une image, on l'affiche */}
          {this.props.post.image != "" ? (
            <View style={{ flex: 1 }}>
              <Image
                source={{ uri: this.props.post.image }}
                style={styles.image}
              />
            </View>
          ) : null}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#52234E",
    borderRadius: 10,
    paddingTop: 5,
    margin: 6,
    paddingBottom: 10,
    paddingHorizontal: 5,
    backgroundColor: "#F0E4EF",
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
  },
  logo: {
    height: 50,
    width: 50,
    resizeMode: "contain",
    margin: 3,
    marginRight: 8,
  },
  headerContent: {
    flex: 1,
    flexDirection: "column",
  },
  titreContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    height: 50,
  },
  titreText: {
    flex: 3,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
  },
  optionButtons: {
    flex: 1,
    flexDirection: "row",
  },
  listTags: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  descriptionContainer: {
    padding: 10,
    flex: 1,
    justifyContent: "flex-start",
  },
  image: {
    flex: 1,
    alignSelf: "center",
    width: 350,
    height: 350,
    borderRadius: 5,
  },
});
