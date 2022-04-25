import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { Post } from "../../services/post.model";

interface PostProps {
  post: Post;
  onPressClose: () => void;
}

export default class PostDisplayedCDF extends Component<PostProps, {}> {
  // Permet de récupérer le chemin d'accès de l'image associé à l'association qui a créé le post
  getImagePath = () => {
    if (this.props.post.editor == "bde") {
      return require("../../Image/bde.png");
    } else if (this.props.post.editor == "bds") {
      return require("../../Image/bds.png");
    } else if (this.props.post.editor == "bda") {
      return require("../../Image/bda.png");
    } else if (this.props.post.editor == "bdf") {
      return require("../../Image/bdf.png");
    } else if (this.props.post.editor == "je") {
      return require("../../Image/je.png");
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={this.props.onPressClose}
        >
          <Icon name="window-close" color="#52234E" size={30} />
        </TouchableOpacity>
        <ScrollView>
          <View style={styles.postContainer}>
            <View style={styles.headerContainer}>
              <View style={styles.logoContainer}>
                <Image source={this.getImagePath()} style={styles.logo} />
              </View>
              <View style={styles.infoContainer}>
                <View style={styles.titreContainer}>
                  <Text style={styles.titreText}>{this.props.post.titre}</Text>
                </View>
                <View style={styles.listTags}>
                  {this.props.post.tags.map((item) => (
                    <Text>[{item}] </Text>
                  ))}
                </View>
              </View>
            </View>

            <View style={styles.descriptionContainer}>
              <Text>{this.props.post.description}</Text>
            </View>

            {/*Si le post contient une image, on l'affiche */}
            {this.props.post.image != "" ? (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: this.props.post.image }}
                  style={styles.image}
                />
              </View>
            ) : null}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, margin: 6 },
  closeButton: {
    alignSelf: "flex-end",
    marginRight: 5,
    marginBottom: 5,
  },
  postContainer: {
    borderWidth: 2,
    borderColor: "#52234E",
    borderRadius: 10,
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 5,
    backgroundColor: "#F0E4EF",
  },
  headerContainer: {
    flexBasis: 100,
    flexDirection: "row",
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    height: 60,
    width: 60,
    resizeMode: "contain",
    margin: 3,
    marginRight: 8,
  },
  infoContainer: {
    flex: 4,
    padding: 2,
  },
  titreContainer: { flex: 1 },
  titreText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  listTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 3,
  },
  descriptionContainer: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    justifyContent: "flex-start",
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
});
