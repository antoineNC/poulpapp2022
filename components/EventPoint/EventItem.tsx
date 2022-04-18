import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Event } from "../../Services/event.model";
import ModifPost from "../PostCDF/ModifPost";
import { ScrollView } from "react-native-gesture-handler";
import ModifEvent from "./ModifEvent";

interface EventItemProps {
  event: Event;
  isAdmin: boolean;
  removeEvent: (id?: string) => void;
  modifEvent: (event: Event) => void;
}

interface EventItemState {
  modalModifOpen: boolean;
}

export default class EventItem extends Component<
  EventItemProps,
  EventItemState
> {
  state: EventItemState = {
    modalModifOpen: false,
  };

  // Permet de récupérer le chemin d'accès de l'image associé à l'association qui a créé le post
  render() {
    return (
      <View style={styles.postContainer}>
        <ScrollView>
          <Modal visible={this.state.modalModifOpen} animationType="slide">
            <ModifEvent
              updateEvent={this.props.modifEvent}
              onPressClose={() => this.setState({ modalModifOpen: false })}
              eventToUpdate={this.props.event}
            />
          </Modal>
          <View style={styles.headerContainer}>
            <View style={styles.titreEtDate}>
              <Text style={styles.titreText}>{this.props.event.titre}</Text>
              <Text style={styles.date}>{this.props.event.date}</Text>
            </View>

            {/*Si l'utilisateur est le créateur du post, alors on affiche les boutons de suppression et modification */}
            {this.props.isAdmin ? (
              <View style={styles.optionButtons}>
                <TouchableOpacity
                  onPress={() => this.props.removeEvent(this.props.event.id)}
                >
                  <Icon style={{ margin: 10 }} size={20} name="trash" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({ modalModifOpen: true })}
                >
                  <Icon
                    style={{ margin: 10, marginRight: 20 }}
                    size={20}
                    name="pencil"
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          <View style={styles.tableauPoints}>
            <View>
              <Text>Bleu</Text>
              <Text>+{this.props.event.bleu}</Text>
            </View>
            <View>
              <Text>Jaune</Text>
              <Text>+{this.props.event.jaune}</Text>
            </View>
            <View>
              <Text>Orange</Text>
              <Text>+{this.props.event.orange}</Text>
            </View>
            <View>
              <Text>Rouge</Text>
              <Text>+{this.props.event.rouge}</Text>
            </View>
            <View>
              <Text>Vert</Text>
              <Text>+{this.props.event.vert}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#52234E",
    borderRadius: 10,
    paddingTop: 5,
    margin: 6,
    paddingBottom: 10,
    paddingHorizontal: 5,
    backgroundColor: "#F0E4EF",
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
  },
  titreEtDate: {
    flex: 1,
    justifyContent: "flex-start",
  },
  titreText: {
    flex: 2,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    alignSelf: "center",
  },
  date: {
    flex: 1,
  },
  optionButtons: {
    flex: 1,
    flexDirection: "row",
  },
  tableauPoints: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
