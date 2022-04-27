import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import RNPickerSelect from "react-native-picker-select";
import { FlatList } from "react-native-gesture-handler";
import Tag from "./Tag";

import * as ImagePicker from "expo-image-picker";
import { Post } from "../../services/post.model";

interface ModifPostState {
  id: string;
  titre: string;
  description: string;
  image: string;
  tags: Array<string>;
  editor: string;
}

interface ModifPostProps {
  postToUpdate: Post;
  updatePost: (post: Post) => void;
  onPressClose: () => void;
}

export default class ModifPost extends Component<
  ModifPostProps,
  ModifPostState
> {
  oldPost = this.props.postToUpdate;

  // Chaque champ est initialisé avec les données du post à modifier
  state: ModifPostState = {
    id: this.props.postToUpdate.id,
    titre: this.props.postToUpdate.titre,
    description: this.props.postToUpdate.description,
    image: this.props.postToUpdate.image,
    tags: this.props.postToUpdate.tags,
    editor: this.props.postToUpdate.editor,
  };
  //Permet de revenir sans mettre à jour
  back = () => {
    this.props.updatePost(this.oldPost);
    this.props.onPressClose();
  };

  //Met à jour le post avec les nouvelles données
  updatePost = () => {
    this.props.updatePost({
      id: this.state.id,
      titre: this.state.titre,
      description: this.state.description,
      image: this.state.image,
      tags: this.state.tags,
      editor: this.state.editor,
    });
    this.props.onPressClose();
  };

  // Permet d'ajouter un tag à la liste
  addTag = (tag: string) => {
    if (!this.checkTag(tag)) {
      var tags = [...this.state.tags, tag];
      this.setState({ tags });
    }
  };

  // Permet de supprimer un tag de la liste
  removeTag = (tagDelete: string) => {
    var tags = this.state.tags.filter((tag: string) => tag !== tagDelete);
    this.setState({ tags });
  };

  // Vérifie si le tag ajouté n'existe pas déjà dans la liste
  checkTag = (tag: string) => {
    const arr = this.state.tags;
    if (arr != null && arr.length > 0) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == tag) {
          return true;
        }
      }
    } else {
      return false;
    }
  };

  // Permet d'ouvrir la gallerie d'images de l'utilisateur.
  // Le chemin d'accès de l'image choisie est enregistrée dans le state
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      var image = result.uri;
      this.setState({ image });
    }
  };

  // Permet de supprimer l'image choisie (le chemin d'accès vaut "")
  deleteImage = () => {
    var image = "";
    this.setState({ image });
  };

  render() {
    // Liste des tags disponibles
    const listTags = [
      { label: "BDE", value: "BDE" },
      { label: "BDS", value: "BDS" },
      { label: "BDA", value: "BDA" },
      { label: "BDF", value: "BDF" },
      { label: "JE", value: "JE" },
      { label: "Evénement", value: "Evénement" },
      { label: "Soirée", value: "Soirée" },
      { label: "Afterwork", value: "Afterwork" },
      { label: "Shotgun", value: "Shotgun" },
      { label: "Annonce", value: "Annonce" },
      { label: "AGE", value: "AGE" },
      { label: "Gazette", value: "Gazette" },
    ];

    return (
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={styles.titre}>Modifier les post</Text>
          <TouchableOpacity style={styles.closeButton} onPress={this.back}>
            <Icon name="window-close" color="#52234E" size={30} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.form}>
            <View style={styles.textInput}>
              <TextInput
                value={this.state.titre}
                style={{ width: 300, fontSize: 15 }}
                onChangeText={(text) => {
                  this.setState({ titre: text });
                }}
              />
            </View>

            <View style={[styles.textInput, styles.textInputDescription]}>
              <TextInput
                value={this.state.description}
                multiline={true}
                style={styles.descriptionText}
                onChangeText={(text) => {
                  this.setState({ description: text });
                }}
              />
            </View>

            <View style={styles.selectTagsView}>
              <RNPickerSelect
                placeholder={{
                  label: "Tags",
                  value: null,
                }}
                style={pickerSelectStyles}
                onValueChange={(tag) => this.addTag(tag)}
                items={listTags}
              />
            </View>

            <FlatList<string>
              contentContainerStyle={styles.tagsSelected}
              data={this.state.tags}
              keyExtractor={(tag) => tag}
              renderItem={({ item }: { item: string }) => (
                <Tag tag={item} removeTag={this.removeTag} />
              )}
            />
          </View>

          {/*Si une image est sélectionnée, on l'affiche, et les boutons de supression et modification d'image apparaissent */}
          {this.state.image != "" ? (
            <View style={styles.imageView}>
              <Image source={{ uri: this.state.image }} style={styles.image} />
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.buttonImage}
                  onPress={this.pickImage}
                >
                  <Text style={styles.addBtnText}>Modifier l'image</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonImage}
                  onPress={this.deleteImage}
                >
                  <Text style={styles.addBtnText}>Supprimer l'image</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            //Si aucune image n'est sélectionnée, seul le bouton d'importation est affiché
            <View>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this.pickImage}
              >
                <Text style={styles.addBtnText}>Importer une image</Text>
              </TouchableOpacity>
            </View>
          )}
          <View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.updatePost}
            >
              <Text style={styles.addBtnText}>Modifier le post</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 5,
  },
  header: {
    height: 50,
    flexDirection: "row",
    marginHorizontal: 10,
  },
  titre: {
    flexBasis: "auto",
    flexGrow: 1,
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 20,
    paddingLeft: 10,
  },
  closeButton: {
    flexBasis: 50,
    alignSelf: "center",
  },
  form: {
    flexDirection: "column",
    alignItems: "center",
  },
  textInput: {
    backgroundColor: "whitesmoke",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    justifyContent: "center",
    margin: 10,
    paddingLeft: 20,
    paddingRight: 20,
    height: 40,
  },
  textInputDescription: {
    height: 300,
  },
  descriptionText: {
    fontSize: 15,
    width: 300,
    height: 270,
    textAlignVertical: "top",
    marginBottom: 10,
  },
  selectTagsView: {
    flexDirection: "column",
    alignItems: "center",
    width: 100,
    height: 50,
    backgroundColor: "whitesmoke",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
  },
  tagsSelected: {
    width: 300,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imageView: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  image: {
    width: 320,
    height: 320,
  },
  buttonImage: {
    flex: 1,
    margin: 10,
    backgroundColor: "#52234E",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "#52234E",
    borderRadius: 10,
    marginVertical: 20,
    marginHorizontal: 90,
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addBtnText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 30,
    fontSize: 15,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    height: 40,
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
