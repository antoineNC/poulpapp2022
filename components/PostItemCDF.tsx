import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Post } from "../Services/post.model";

interface PostProps {
  post: Post;
  onPressClose: () => void;
}

export default class PostItemCDF extends Component<PostProps, {}> {
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

  // Permet de naviguer vers l'écran du calendrier
  //   goToCalendar = () => {
  //     this.props.onPressClose(); // Permet de fermer le modal
  //     this.props.navigation.navigate("Calendrier");
  //   };
  render() {
    return (
      <View style={styles.postContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={this.props.onPressClose}
        >
          <Icon name="window-close" color="#52234E" size={30} />
        </TouchableOpacity>

        <View style={styles.headerContainer}>
          <View>
            <Image source={this.getImagePath()} style={styles.logo} />
          </View>

          <View style={{ flexDirection: "column" }}>
            <View style={styles.titreContainer}>
              <Text style={styles.titreText}>{this.props.post.titre}</Text>
            </View>

            {/*Affichage de la liste de tags */}
            <View style={{ flexDirection: "row" }}>
              <FlatList
                style={{ flexDirection: "row" }}
                data={this.props.post.tags}
                keyExtractor={(tag) => tag}
                renderItem={({ item }: { item: string }) => (
                  <Text> [{item}] </Text>
                )}
              />
            </View>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text>{this.props.post.description}</Text>
        </View>

        {/*Si le post contient une image, on l'affiche */}
        {this.props.post.image != "" ? (
          <Image source={{ uri: this.props.post.image }} style={styles.image} />
        ) : null}

        {/*Si l'utilisateur est le créateur du post, alors on affiche les boutons de suppression et modification */}

        {/* <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => this.props.removePost(this.props.post.id)}
            style={styles.appButtonContainer}
          >
            <Icon style={{ margin: 10 }} size={20} name="trash" color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.modifPost(this.props.post)}
            style={styles.appButtonContainer}
          >
            <Icon
              style={{ margin: 10 }}
              size={20}
              name="pencil"
              color="white"
            />
          </TouchableOpacity>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  postContainer: {
    textAlign: "center",
    alignItems: "center",
    paddingTop: 5,
    margin: 7,
    paddingBottom: 10,
  },
  closeButton: {
    position: "absolute",
    right: 7,
    top: 5,
  },
  headerContainer: {
    width: "95%",
    flexDirection: "row",
  },
  logo: {
    height: 60,
    width: 60,
    resizeMode: "contain",
    margin: 3,
    marginRight: 8,
  },
  titreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 280,
    height: 30,
  },
  titreText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  calendarView: {
    flexDirection: "row",
    marginTop: 7,
    alignItems: "center",
  },
  calendarIcon: {
    marginRight: 10,
    color: "#349CA8",
  },
  calendarText: {
    color: "#349CA8",
    fontStyle: "italic",
  },
  descriptionContainer: {
    padding: 10,
    width: "100%",
    justifyContent: "flex-start",
  },
  image: {
    width: 300,
    height: 300,
  },
  appButtonContainer: {
    margin: 20,
    backgroundColor: "#52234E",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
});
