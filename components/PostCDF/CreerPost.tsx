import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import RNPickerSelect from "react-native-picker-select";
import Tag from "./Tag";

import * as ImagePicker from "expo-image-picker";
import { LogBox } from "react-native";
import { Post } from "../../Services/post.model";
LogBox.ignoreAllLogs();

interface CreerPostState {
  id: string;
  titre: string;
  description: string;
  tags: string;
  addCalendarCheck: boolean;
  dateDebut: string;
  dateFin: string;
  heureDebut: string;
  heureFin: string;
  tagsList: Array<string>;
  timePickerVisibleStart: boolean;
  timePickerVisibleEnd: boolean;
  image: any;
  editor: string;
}

interface CreerPostProps {
  addPost: (post: Post) => void;
  onPressClose: () => void;
}

export default class CreerPost extends Component<
  CreerPostProps,
  CreerPostState
> {
  // Permet de récupérer la date d'aujourd'hui, pour afficher la valeur par défaut dans le dateTimePicker
  getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var today =
      (date < 10 ? "0" : "") +
      date +
      "/" +
      (month < 10 ? "0" : "") +
      month +
      "/" +
      year;

    return today;
  };

  state: CreerPostState = {
    id: "",
    titre: "",
    description: "",
    tags: "",
    addCalendarCheck: true,
    dateDebut: this.getCurrentDate(),
    dateFin: this.getCurrentDate(),
    heureDebut: "18:00",
    heureFin: "20:00",
    tagsList: [],
    timePickerVisibleStart: false,
    timePickerVisibleEnd: false,
    image: "",
    editor: "",
  };

  componentDidMount() {
    // On choisit l'éditeur en dur, normalement on va chercher le current user grâce à firebase
    const user = "bdf";
    this.setState({ editor: user });
  }

  addPost = () => {
    const { titre } = this.state;

    if (!titre) return; // Don't submit if empty

    this.setState({ id: Math.random().toString() });
    const { id } = this.state;
    const { description } = this.state;
    const tags = this.state.tagsList;
    const { image } = this.state;
    const { editor } = this.state;
    const post = { id, titre, description, tags, image, editor };

    this.props.addPost(post);

    // Reset text after submission
    this.setState({
      id: "",
      titre: "",
      description: "",
      tags: "",
      addCalendarCheck: true,
      dateDebut: this.getCurrentDate(),
      dateFin: this.getCurrentDate(),
      heureDebut: "18:00",
      heureFin: "20:00",
      tagsList: [],
      timePickerVisibleStart: false,
      timePickerVisibleEnd: false,
      image: "",
      editor: "",
    });
    this.props.onPressClose();
  };

  // Permet d'ajouter un tag à la liste
  addTag = (tag: string) => {
    if (!this.checkTag(tag)) {
      this.setState({ tagsList: [...this.state.tagsList, tag] });
    }
  };

  // Permet de supprimer un tag de la liste
  removeTag = (tagDelete: string) => {
    this.setState({
      tagsList: this.state.tagsList.filter((tag: string) => tag !== tagDelete),
    });
  };

  // Vérifie si le tag ajouté n'existe pas déjà dans la liste
  checkTag = (tag: string) => {
    const arr = this.state.tagsList;
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
      this.setState({ image: result.uri });
    }
  };

  // Permet de supprimer l'image choisie (le chemin d'accès vaut "")
  deleteImage = () => {
    this.setState({ image: "" });
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
                placeholder="Titre"
                style={{ width: 300, fontSize: 15 }}
                onChangeText={(text) => this.setState({ titre: text })}
              />
            </View>
            <View style={[styles.textInput, styles.textInputDescription]}>
              <TextInput
                placeholder="Description"
                multiline={true}
                style={styles.descriptionText}
                onChangeText={(text) => this.setState({ description: text })}
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
              data={this.state.tagsList}
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
              onPress={this.addPost}
            >
              <Text style={styles.addBtnText}>Publier le post</Text>
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

// Styles spécifiques pour les dateTimePicker
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
    paddingRight: 30,
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
    paddingRight: 30,
  },
});
