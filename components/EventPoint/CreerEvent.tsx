import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import DatePicker from "react-native-datepicker";
import { Event } from "../../services/event.model";

interface CreerEventState {
  id: string;
  titre: string;
  date: string;
  bleu: string;
  jaune: string;
  orange: string;
  rouge: string;
  vert: string;
}

interface CreerEventProps {
  addEvent: (event: Event) => void;
  onPressClose: () => void;
}

export default class CreerEvent extends Component<
  CreerEventProps,
  CreerEventState
> {
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

  state: CreerEventState = {
    id: "",
    titre: "",
    date: this.getCurrentDate(),
    bleu: "0",
    jaune: "0",
    orange: "0",
    rouge: "0",
    vert: "0",
  };

  addPost = () => {
    const { titre } = this.state;

    if (!titre) {
      Alert.alert(
        "Attention",
        "Ajoutez un titre avant de publier un nouvel événement."
      );
      return;
    } // Don't submit if empty

    this.setState({ id: Math.random().toString() });
    const { id } = this.state;
    const { date } = this.state;
    var { bleu } = this.state;
    var { jaune } = this.state;
    var { orange } = this.state;
    var { rouge } = this.state;
    var { vert } = this.state;
    if (
      bleu != "1" &&
      bleu != "2" &&
      bleu != "3" &&
      bleu != "4" &&
      bleu != "5" &&
      bleu != "6" &&
      bleu != "7" &&
      bleu != "8" &&
      bleu != "9"
    ) {
      bleu = "0";
    }
    if (
      jaune != "1" &&
      jaune != "2" &&
      jaune != "3" &&
      jaune != "4" &&
      jaune != "5" &&
      jaune != "6" &&
      jaune != "7" &&
      jaune != "8" &&
      jaune != "9"
    ) {
      jaune = "0";
    }
    if (
      orange != "1" &&
      orange != "2" &&
      orange != "3" &&
      orange != "4" &&
      orange != "5" &&
      orange != "6" &&
      orange != "7" &&
      orange != "8" &&
      orange != "9"
    ) {
      orange = "0";
    }
    if (
      rouge != "1" &&
      rouge != "2" &&
      rouge != "3" &&
      rouge != "4" &&
      rouge != "5" &&
      rouge != "6" &&
      rouge != "7" &&
      rouge != "8" &&
      rouge != "9"
    ) {
      rouge = "0";
    }
    if (
      vert != "1" &&
      vert != "2" &&
      vert != "3" &&
      vert != "4" &&
      vert != "5" &&
      vert != "6" &&
      vert != "7" &&
      vert != "8" &&
      vert != "9"
    ) {
      vert = "0";
    }
    const event = { id, titre, date, bleu, jaune, orange, rouge, vert };

    this.props.addEvent(event);

    // Reset text after submission
    this.setState({
      id: "",
      titre: "",
      date: this.getCurrentDate(),
      bleu: "0",
      jaune: "0",
      orange: "0",
      rouge: "0",
      vert: "0",
    });
    this.props.onPressClose();
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={styles.titre}>Nouvel event de Famille</Text>
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
                  onChangeText={(points) => {
                    this.setState({ bleu: points });
                  }}
                  keyboardType={"numeric"}
                  placeholder="Ils ont réussi à gagner des points?"
                />
                <TextInput
                  style={styles.pointInput}
                  onChangeText={(points) => this.setState({ jaune: points })}
                  keyboardType={"numeric"}
                  placeholder="Tricherie ou pas? Une grande question..."
                />
                <TextInput
                  style={styles.pointInput}
                  onChangeText={(points) => this.setState({ orange: points })}
                  keyboardType={"numeric"}
                  placeholder="Sans commentaire"
                />
                <TextInput
                  style={styles.pointInput}
                  onChangeText={(points) => this.setState({ rouge: points })}
                  keyboardType={"numeric"}
                  placeholder="Bravo pour les points de la gazette"
                />
                <TextInput
                  style={styles.pointInput}
                  onChangeText={(points) => this.setState({ vert: points })}
                  keyboardType={"numeric"}
                  placeholder="Started from the bottom, now they're au milieu."
                />
              </View>
            </View>
          </View>
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
