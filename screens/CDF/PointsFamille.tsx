import { RouteProp } from "@react-navigation/native";
import React, { Component } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Modal,
} from "react-native";
import CreerEvent from "../../components/EventPoint/CreerEvent";
import EventItem from "../../components/EventPoint/EventItem";
import {
  NavigationProps,
  RootStackParamList,
} from "../../navigation/stackNavigators";
import EventService, { Event } from "../../Services/event.model";

interface PointsFamilleState {
  data: Array<Event>;
  modalCreateOpen: boolean;
}

interface PointsFamilleProps extends NavigationProps {
  route: RouteProp<RootStackParamList, "PointsFamille">;
}

export default class PointsFamille extends Component<
  PointsFamilleProps,
  PointsFamilleState
> {
  state: PointsFamilleState = {
    data: EventService.events,
    modalCreateOpen: false,
  };

  loadEvents = () => {
    // Load all modules
    EventService.getAll().then((data) => {
      this.setState({ data });
    });
  };

  addEvent = (event: Event) => {
    EventService.add(event);
    this.loadEvents();
  };

  modifEvent = (event: Event) => {
    EventService.update(event);
    this.loadEvents;
  };

  removeEvent = (idEvent?: string) => {
    // Une alerte s'affiche pour confirmer la suppression
    Alert.alert(
      "Attention",
      "Etes-vous sûr(e) de vouloir supprimer ce post ?",
      [
        {
          text: "Oui",
          onPress: () => {
            if (idEvent) {
              EventService.remove(idEvent);
              this.loadEvents;
            }
          },
        },
        {
          text: "Non",
          onPress: () => {},
        },
      ]
    );
  };

  calculScore = (couleur: string) => {
    if (couleur == "bleu") {
      var bleu = 0;
      this.state.data.map((item, index) => (bleu = bleu + item.bleu));
      return bleu;
    } else if (couleur == "jaune") {
      var jaune = 0;
      this.state.data.map((item, index) => (jaune = jaune + item.jaune));
      return jaune;
    } else if (couleur == "orange") {
      var orange = 0;
      this.state.data.map((item, index) => (orange = orange + item.orange));
      return orange;
    } else if (couleur == "rouge") {
      var rouge = 0;
      this.state.data.map((item, index) => (rouge = rouge + item.rouge));
      return rouge;
    } else if (couleur == "vert") {
      var vert = 0;
      this.state.data.map((item, index) => (vert = vert + item.vert));
      return vert;
    }
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.props.route.params.isAdmin ? (
          <View style={styles.viewAddEvent}>
            <Modal visible={this.state.modalCreateOpen} animationType="slide">
              <CreerEvent
                addEvent={this.addEvent}
                onPressClose={() => this.setState({ modalCreateOpen: false })}
              />
            </Modal>
            <TouchableOpacity
              style={styles.btnAddEvent}
              onPress={() => this.setState({ modalCreateOpen: true })}
            >
              <Text style={styles.txtAddEvent}>Ajouter un event</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={styles.scoreContainer}>
          <Text>Score actuel</Text>
          <View style={styles.tableauScoreFinal}>
            <View>
              <Text>Bleu</Text>
              <Text>{this.calculScore("bleu")}</Text>
            </View>
            <View>
              <Text>Jaune</Text>
              <Text>{this.calculScore("jaune")}</Text>
            </View>
            <View>
              <Text>Orange</Text>
              <Text>{this.calculScore("orange")}</Text>
            </View>
            <View>
              <Text>Rouge</Text>
              <Text>{this.calculScore("rouge")}</Text>
            </View>
            <View>
              <Text>Vert</Text>
              <Text>{this.calculScore("vert")}</Text>
            </View>
          </View>
        </View>
        <FlatList
          style={styles.list}
          data={this.state.data}
          renderItem={({ item }) => (
            <EventItem
              event={item}
              removeEvent={this.removeEvent}
              modifEvent={this.modifEvent}
              isAdmin={this.props.route.params.isAdmin}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 15,
    flex: 1,
  },
  viewAddEvent: {
    flexBasis: 70,
    alignItems: "center",
  },
  btnAddEvent: {
    backgroundColor: "#52234E",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
  },
  txtAddEvent: {
    fontSize: 25,
    alignSelf: "center",
    color: "white",
  },
  scoreContainer: {
    flexBasis: 50,
    flexDirection: "row",
  },
  tableauScoreFinal: {
    flexDirection: "row",
    flexBasis: "auto",
    flexGrow: 1,
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  list: {
    flexBasis: "auto",
    flexGrow: 1,
  },
});
