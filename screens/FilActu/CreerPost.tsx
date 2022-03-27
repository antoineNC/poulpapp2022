import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import Constants from "expo-constants";
import firestoreService from "../../Services/firestore.service";
import { CheckBox } from "react-native-elements";
import { NavigationProps } from "../../Navigation/stackNavigators";

import DatePicker from "react-native-datepicker";
import DateTimePicker from "@react-native-community/datetimepicker";

import RNPickerSelect from "react-native-picker-select";
import { FlatList } from "react-native-gesture-handler";
import Tag from "../../Components/Tag";

import * as ImagePicker from "expo-image-picker";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs();

interface CreerPostState {
  titre: string;
  description: string;
  tags: string;
  eventCheck: boolean;
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

export default class CreerPost extends React.Component<
  NavigationProps,
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
    titre: "",
    description: "",
    tags: "",
    eventCheck: false,
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
    // Permet de définir l'éditeur du post selon l'utilisateur actif
    const user = firestoreService.getCurrentUser();
    this.setState({ editor: user });
  }

  addPost = () => {
    // Vérification si le post n'est pas vide (il doit contenir au moins un titre)
    if (this.state.titre != "") {
      // Création du post en faisant appel à firestore.Service
      // Si c'est un événement, on transmet les propriétés correspondantes
      if (this.state.eventCheck == true) {
        firestoreService.addPost({
          titre: this.state.titre,
          description: this.state.description,
          tags: this.state.tagsList,
          image: this.state.image,
          editor: this.state.editor,
          event: this.state.eventCheck,
          dateDebut: this.state.dateDebut,
          dateFin: this.state.dateFin,
          heureDebut: this.state.heureDebut,
          heureFin: this.state.heureFin,
          visibleSurCalendrier: this.state.addCalendarCheck,
        });
      }
      // Si ce n'est pas un événement, on remplit les champs correspondant à un événement par ""
      // (sinon, la date d'aujourd'hui serait enregistrée par défaut)
      else {
        firestoreService.addPost({
          titre: this.state.titre,
          description: this.state.description,
          tags: this.state.tagsList,
          dateDebut: "",
          dateFin: "",
          heureDebut: "",
          heureFin: "",
          visibleSurCalendrier: false,
          image: this.state.image,
          editor: this.state.editor,
          event: this.state.eventCheck,
        });
      }
      // Une fois l'événement créé, on navigue vers l'écran du fil d'actualité
      this.props.navigation.navigate("FilActu");
    } else {
      Alert.alert("Erreur", "Le post doit au moins contenir un titre");
    }
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
      <ScrollView>
        <View style={styles.mainContainer}>
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

          {/*Si une image est sélectionnée, on l'affiche, et les boutons de supression et modification d'image apparaissent */}
          {this.state.image != "" ? (
            <View style={styles.imageView}>
              <Image source={{ uri: this.state.image }} style={styles.image} />
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.buttonImage}
                  onPress={this.pickImage}
                >
                  <Text style={styles.appButtonText}>Modifier l'image</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonImage}
                  onPress={this.deleteImage}
                >
                  <Text style={styles.appButtonText}>Supprimer l'image</Text>
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
                <Text style={styles.appButtonText}>Importer une image</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.checkBoxView}>
            <CheckBox
              center
              title="Evenement"
              checked={this.state.eventCheck}
              checkedColor="#52234E"
              onPress={() =>
                this.setState({ eventCheck: !this.state.eventCheck })
              }
              containerStyle={styles.checkBox}
            />
          </View>

          {/*Si l'utilisateur a définit le post comme un événement, on affiche les dateTimePickers*/}
          {this.state.eventCheck == true ? (
            <View>
              <CheckBox
                center
                title="Ajouter au calendrier"
                checked={this.state.addCalendarCheck}
                checkedColor="#52234E"
                onPress={() =>
                  this.setState({
                    addCalendarCheck: !this.state.addCalendarCheck,
                  })
                }
                containerStyle={styles.checkBox}
              />

              <View style={styles.timePickerContainer}>
                <Text style={{ width: 50 }}>Début : </Text>
                <Text>Le</Text>
                <DatePicker
                  style={{ width: 150 }}
                  date={this.state.dateDebut}
                  mode="date"
                  placeholder="select date"
                  format="DD/MM/YYYY"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateInput: styles.hours,
                    dateIcon: {
                      width: 0,
                    },
                  }}
                  onDateChange={(date) => {
                    this.setState({ dateDebut: date });
                  }}
                />
                <Text>à</Text>

                <TouchableOpacity
                  style={styles.hours}
                  onPress={() =>
                    this.setState({ timePickerVisibleStart: true })
                  }
                >
                  <Text>{this.state.heureDebut}</Text>
                </TouchableOpacity>

                {/*Permet d'afficher le timePicker*/}
                {this.state.timePickerVisibleStart && (
                  <DateTimePicker
                    mode={"time"}
                    display="default"
                    is24Hour={true}
                    value={new Date()}
                    onChange={(event, value) => {
                      this.setState({
                        heureDebut:
                          value?.getHours() + ":" + value?.getMinutes(),
                        timePickerVisibleStart: false,
                      });
                    }}
                  />
                )}
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ width: 50 }}>Fin : </Text>
                <Text>Le</Text>

                <DatePicker
                  style={{ width: 150 }}
                  date={this.state.dateFin}
                  mode="date"
                  placeholder="select date"
                  format="DD/MM/YYYY"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateInput: styles.hours,
                    dateIcon: {
                      width: 0,
                    },
                  }}
                  onDateChange={(date) => {
                    this.setState({ dateFin: date });
                  }}
                />
                <Text>à</Text>

                <TouchableOpacity
                  style={styles.hours}
                  onPress={() => this.setState({ timePickerVisibleEnd: true })}
                >
                  <Text>{this.state.heureFin}</Text>
                </TouchableOpacity>

                {this.state.timePickerVisibleEnd && (
                  <DateTimePicker
                    mode={"time"}
                    display="default"
                    is24Hour={true}
                    value={new Date()}
                    onChange={(event, value) => {
                      this.setState({
                        heureFin: value?.getHours() + ":" + value?.getMinutes(),
                        timePickerVisibleEnd: false,
                      });
                    }}
                  />
                )}
              </View>
            </View>
          ) : null}

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.addPost}
          >
            <Text style={styles.appButtonText}>Publier le post</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: Constants.statusBarHeight,
  },
  textInput: {
    backgroundColor: "white",
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
    height: 40,
    backgroundColor: "white",
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
  buttonContainer: {
    margin: 30,
    backgroundColor: "#52234E",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 200,
  },
  buttonImage: {
    margin: 10,
    backgroundColor: "#52234E",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
  checkBoxView: {
    backgroundColor: "#fafafa",
    width: 300,
    paddingRight: 10,
    paddingLeft: 10,
  },
  timePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkBox: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  hours: {
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 0,
    justifyContent: "center",
    margin: 10,
    alignItems: "center",
    height: 40,
    width: 80,
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
