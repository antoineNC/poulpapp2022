import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Event } from "../../Services/event.model";

interface ModifEventState {
  event: Event;
  timePickerVisibleStart: boolean;
  timePickerVisibleEnd: boolean;
}

interface ModifEventProps {
  updateEvent: (event: Event) => void;
  onPressClose: () => void;
  eventToUpdate: Event;
}

export default class ModifEvent extends Component<
  ModifEventProps,
  ModifEventState
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

  // Chaque champ est initialisé avec les données du event à modifier
  state: ModifEventState = {
    event: this.props.eventToUpdate,
    timePickerVisibleStart: false,
    timePickerVisibleEnd: false,
  };

  updateEvent = () => {
    this.props.updateEvent(this.state.event);
    this.props.onPressClose();
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={styles.titre}>Modifier les event</Text>
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
                value={this.state.event.titre}
                style={{ width: 300, fontSize: 15 }}
                onChangeText={(text) => {
                  var nvPost = this.state.event;
                  nvPost.titre = text;
                  this.setState({ event: nvPost });
                }}
              />
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.updateEvent}
            >
              <Text style={styles.addBtnText}>Modifier le event</Text>
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
