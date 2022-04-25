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
import DatePicker from "react-native-datepicker";
import { Event } from "../../services/event.model";

interface ModifEventState {
  titre: string;
  date: string;
  bleu: string;
  jaune: string;
  orange: string;
  rouge: string;
  vert: string;
}

interface ModifEventProps {
  eventToUpdate: Event;
  updateEvent: (event: Event) => void;
  onPressClose: () => void;
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

  oldEvent = this.props.eventToUpdate;

  // Chaque champ est initialisé avec les données du event à modifier
  state: ModifEventState = {
    titre: this.props.eventToUpdate.titre,
    date: this.props.eventToUpdate.date,
    bleu: this.props.eventToUpdate.bleu,
    jaune: this.props.eventToUpdate.jaune,
    orange: this.props.eventToUpdate.orange,
    rouge: this.props.eventToUpdate.rouge,
    vert: this.props.eventToUpdate.vert,
  };

  back = () => {
    this.props.updateEvent(this.oldEvent);
    this.props.onPressClose();
  };

  update = () => {
    this.props.updateEvent({
      id: this.props.eventToUpdate.id,
      titre: this.state.titre,
      date: this.state.date,
      bleu: this.state.bleu,
      jaune: this.state.jaune,
      orange: this.state.orange,
      rouge: this.state.rouge,
      vert: this.state.vert,
    });
    this.props.onPressClose();
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={styles.titre}>Modifier les event</Text>
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
            <View style={styles.timePickerContainer}>
              <Text style={{ width: 50 }}>Date : </Text>
              <DatePicker
                style={{ width: 150 }}
                date={this.state.date}
                mode="date"
                placeholder="Selectionner la date"
                format="DD/MM/YYYY"
                confirmBtnText="Confirmer"
                cancelBtnText="Annuler"
                onDateChange={(date) => {
                  this.setState({ date: date });
                }}
              />
            </View>
            <View style={styles.tableauPoints}>
              <View style={styles.familleContainer}>
                <Text style={styles.famille}>Bleu :</Text>
                <Text style={styles.famille}>Jaune :</Text>
                <Text style={styles.famille}>Orange :</Text>
                <Text style={styles.famille}>Rouge :</Text>
                <Text style={styles.famille}>Vert :</Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.pointInput}
                  value={this.state.bleu}
                  keyboardType={"numeric"}
                  onChangeText={(text) => {
                    this.setState({ bleu: text });
                  }}
                />
                <TextInput
                  style={styles.pointInput}
                  value={this.state.jaune}
                  keyboardType={"numeric"}
                  onChangeText={(text) => {
                    this.setState({ jaune: text });
                  }}
                />
                <TextInput
                  style={styles.pointInput}
                  value={this.state.orange}
                  keyboardType={"numeric"}
                  onChangeText={(text) => {
                    this.setState({ orange: text });
                  }}
                />
                <TextInput
                  style={styles.pointInput}
                  value={this.state.rouge}
                  keyboardType={"numeric"}
                  onChangeText={(text) => {
                    this.setState({ rouge: text });
                  }}
                />
                <TextInput
                  style={styles.pointInput}
                  value={this.state.vert}
                  keyboardType={"numeric"}
                  onChangeText={(text) => {
                    this.setState({ vert: text });
                  }}
                />
              </View>
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.update}
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
    flex: 1,
    flexDirection: "column",
  },
  textInput: {
    backgroundColor: "whitesmoke",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    justifyContent: "center",
    margin: 10,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    height: 40,
  },
  timePickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  hours: {
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 0,
    margin: 10,
    height: 40,
    width: 80,
  },
  tableauPoints: {
    flexDirection: "row",
  },
  familleContainer: {
    flexBasis: 100,
  },
  famille: {
    height: 50,
    marginVertical: 5,
    textAlign: "center",
    textAlignVertical: "center",
  },
  inputContainer: {
    flexBasis: "auto",
    flexGrow: 1,
  },
  pointInput: {
    height: 50,
    marginVertical: 5,
    marginRight: 30,
    fontSize: 12,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "whitesmoke",
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
