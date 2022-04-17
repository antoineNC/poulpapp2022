import React, { useState, Component } from "react";
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
import Constants from "expo-constants";
import RNPickerSelect from "react-native-picker-select";
import { FlatList } from "react-native-gesture-handler";
import Tag from "../../components/Tag";

import * as ImagePicker from "expo-image-picker";
import { Post } from "../../Services/post.model";

interface ModifPostState {
  post: Post;
  timePickerVisibleStart: boolean;
  timePickerVisibleEnd: boolean;
}

interface ModifPostProps {
  updatePost: (post: Post) => void;
  postToUpdate: Post;
  onPressClose: () => void;
}

export default class ModifPost extends Component<
  ModifPostProps,
  ModifPostState
> {
  // Permet de récupérer la date d'aujourd'hui, pour afficher la valeur par défaut dans le dateTimePicker
  getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var today =
      year +
      "-" +
      (month < 10 ? "0" : "") +
      month +
      "-" +
      (date < 10 ? "0" : "") +
      date;
    return today;
  };

  // Chaque champ est initialisé avec les données du post à modifier
  state: ModifPostState = {
    post: this.props.postToUpdate,
    timePickerVisibleStart: false,
    timePickerVisibleEnd: false,
  };

  updatePost = () => {
    this.props.updatePost(this.state.post);
    this.props.onPressClose();
  };

  // Permet d'ajouter un tag à la liste
  addTag = (tag: string) => {
    if (!this.checkTag(tag)) {
      var nvPost = this.state.post;
      nvPost.tags = [...this.state.post.tags, tag];
      this.setState({ post: nvPost });
    }
  };

  // Permet de supprimer un tag de la liste
  removeTag = (tagDelete: string) => {
    var nvPost = this.state.post;
    nvPost.tags = this.state.post.tags.filter(
      (tag: string) => tag !== tagDelete
    );
    this.setState({ post: nvPost });
  };

  // Vérifie si le tag ajouté n'existe pas déjà dans la liste
  checkTag = (tag: string) => {
    const arr = this.state.post.tags;
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
      var nvPost = this.state.post;
      nvPost.image = result.uri;
      this.setState({ post: nvPost });
    }
  };

  // Permet de supprimer l'image choisie (le chemin d'accès vaut "")
  deleteImage = () => {
    var nvPost = this.state.post;
    nvPost.image = "";
    this.setState({ post: nvPost });
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
          <Text style={styles.titre}>Nouveau post</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={this.props.onPressClose}
          >
            <Icon name="window-close" color="#52234E" size={30} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.form}>
            <View style={styles.textInput}>
              <TextInput
                value={this.state.post.titre}
                style={{ width: 300, fontSize: 15 }}
                onChangeText={(text) => {
                  var nvPost = this.state.post;
                  nvPost.titre = text;
                  this.setState({ post: nvPost });
                }}
              />
            </View>

            <View style={[styles.textInput, styles.textInputDescription]}>
              <TextInput
                value={this.state.post.description}
                multiline={true}
                style={styles.descriptionText}
                onChangeText={(text) => {
                  var nvPost = this.state.post;
                  nvPost.description = text;
                  this.setState({ post: nvPost });
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
              data={this.state.post.tags}
              keyExtractor={(tag) => tag}
              renderItem={({ item }: { item: string }) => (
                <Tag tag={item} removeTag={this.removeTag} />
              )}
            />
          </View>

          {/*Si une image est sélectionnée, on l'affiche, et les boutons de supression et modification d'image apparaissent */}
          {this.state.post.image != "" ? (
            <View style={styles.imageView}>
              <Image
                source={{ uri: this.state.post.image }}
                style={styles.image}
              />
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
