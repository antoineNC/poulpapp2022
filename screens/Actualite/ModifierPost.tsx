import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import Constants from "expo-constants";
import firestoreService, { PostData } from "../../Services/firestore.service";
import { CheckBox } from "react-native-elements";
import {
  NavigationProps,
  RootStackParamList,
} from "../../Navigation/stackNavigators";
import { RouteProp } from "@react-navigation/core";

import DatePicker from "react-native-datepicker";
import DateTimePicker from "@react-native-community/datetimepicker";

import RNPickerSelect from "react-native-picker-select";
import { FlatList } from "react-native-gesture-handler";
import Tag from "../../Components/Tag";

import * as ImagePicker from "expo-image-picker";

interface ModifPostState {
  post: PostData;
  timePickerVisibleStart: boolean;
  timePickerVisibleEnd: boolean;
}

interface ModifPostProps extends NavigationProps {
  route: RouteProp<RootStackParamList, "ModifPost">;
}

export default class ModifPost extends React.Component<
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
    post: {
      id: this.props.route.params.post.id,
      titre: this.props.route.params.post.titre,
      description: this.props.route.params.post.description,
      tags: this.props.route.params.post.tags,
      event: this.props.route.params.post.event,

      visibleSurCalendrier: this.props.route.params.post.visibleSurCalendrier,
      dateDebut: this.props.route.params.post.dateDebut,
      dateFin: this.props.route.params.post.dateFin,
      heureDebut: this.props.route.params.post.heureDebut,
      heureFin: this.props.route.params.post.heureFin,

      image: this.props.route.params.post.image,
      editor: this.props.route.params.post.editor,
    },
    timePickerVisibleStart: false,
    timePickerVisibleEnd: false,
  };

  // Fonction appellée au clic sur le bouton 'Modifier le post'
  // Fait appel au firestoreService pour modifier le post en question
  modifPost = () => {
    firestoreService.modifPost(this.state.post);
    this.props.navigation.navigate("FilActu");
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
      <ScrollView>
        <View style={styles.mainContainer}>
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
              checked={this.state.post.event}
              checkedColor="#52234E"
              onPress={() => {
                var nvPost = this.state.post;
                nvPost.event = !this.state.post.event;
                this.setState({ post: nvPost });
              }}
              containerStyle={styles.checkBox}
            />
          </View>

          {/*Si l'utilisateur a définit le post comme un événement, on affiche les dateTimePickers*/}
          {this.state.post.event == true ? (
            <View>
              <CheckBox
                center
                title="Ajouter au calendrier"
                checked={this.state.post.visibleSurCalendrier}
                checkedColor="#52234E"
                onPress={() => {
                  var nvPost = this.state.post;
                  nvPost.visibleSurCalendrier = !this.state.post
                    .visibleSurCalendrier;
                  this.setState({ post: nvPost });
                }}
                containerStyle={styles.checkBox}
              />

              <View style={styles.timePickerContainer}>
                <Text style={{ width: 50 }}>Début : </Text>
                <Text>Le</Text>

                <DatePicker
                  style={{ width: 150 }}
                  date={this.state.post.dateDebut}
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
                    var nvPost = this.state.post;
                    nvPost.dateDebut = date;
                    this.setState({ post: nvPost });
                  }}
                />
                <Text>à</Text>

                <TouchableOpacity
                  style={styles.hours}
                  onPress={() =>
                    this.setState({ timePickerVisibleStart: true })
                  }
                >
                  <Text>{this.state.post.heureDebut}</Text>
                </TouchableOpacity>

                {/*Permet d'afficher le timePicker*/}
                {this.state.timePickerVisibleStart && (
                  <DateTimePicker
                    mode={"time"}
                    display="default"
                    is24Hour={true}
                    value={new Date()}
                    onChange={(event, value) => {
                      var nvPost = this.state.post;
                      nvPost.heureDebut =
                        value?.getHours() + ":" + value?.getMinutes();
                      this.setState({
                        timePickerVisibleStart: false,
                      });
                      this.setState({ post: nvPost });
                    }}
                  />
                )}
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ width: 50 }}>Fin : </Text>
                <Text>Le</Text>

                <DatePicker
                  style={{ width: 150 }}
                  date={this.state.post.dateFin}
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
                    var nvPost = this.state.post;
                    nvPost.dateFin = date;
                    this.setState({ post: nvPost });
                  }}
                />
                <Text>à</Text>

                <TouchableOpacity
                  style={styles.hours}
                  onPress={() => this.setState({ timePickerVisibleEnd: true })}
                >
                  <Text>{this.state.post.heureFin}</Text>
                </TouchableOpacity>

                {this.state.timePickerVisibleEnd && (
                  <DateTimePicker
                    mode={"time"}
                    display="default"
                    is24Hour={true}
                    value={new Date()}
                    onChange={(event, value) => {
                      var nvPost = this.state.post;
                      nvPost.heureFin =
                        value?.getHours() + ":" + value?.getMinutes();

                      this.setState({
                        timePickerVisibleEnd: false,
                      });
                      this.setState({ post: nvPost });
                    }}
                  />
                )}
              </View>
            </View>
          ) : null}

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.modifPost}
          >
            <Text style={styles.appButtonText}>Modifier le post</Text>
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
  checkBox: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  timePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
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
