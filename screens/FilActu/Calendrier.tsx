import React, { Component } from "react";
import { View } from "react-native";
import firestoreService, { PostData } from "../../Services/firestore.service";
import { NavigationProps } from "../../Navigation/stackNavigators";
import PostList from "../../Components/PostList";
import { Calendar } from "react-native-calendars";
import moment from "moment";

interface CalendrierState {
  selectedDate: any;
  events: any;
  eventSelected: Array<PostData>;
}

export default class Calendrier extends Component<
  NavigationProps,
  CalendrierState
> {
  // Permet de récupérer la date d'aujourd'hui pour initialiser la date sélectionnée
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

  state: CalendrierState = {
    selectedDate: this.getCurrentDate(),
    events: {},
    eventSelected: [],
  };

  // Le calendrier accepte les dates sous format "AAAA-MM-JJ"
  // Les dates affichées sur les posts sont sous format "JJ/MM/AAA"
  // Il faut donc pouvoir convertir les dates "JJ/MM/AAA" en "AAAA-MM-JJ"
  convertDateFormatSlashToUnderscore = (slashFormat: string): any => {
    var dateSplitted = slashFormat.split("/");
    var newDate =
      dateSplitted[2] + "-" + dateSplitted[1] + "-" + dateSplitted[0];
    return newDate;
  };

  // Conversion du format "AAAA-MM-JJ" en "JJ/MM/AAA"
  convertDateFormatUnderscoreToSlash = (slashFormat: string): any => {
    var dateSplitted = slashFormat.split("-");
    var newDate =
      dateSplitted[2] + "/" + dateSplitted[1] + "/" + dateSplitted[0];

    return newDate;
  };

  componentDidMount() {
    // On crée un tableau qui va accueillir toutes les dates devant être marques sur le calendrier
    let marquedDates = [{}];

    // Pour chaque post, on récupère sa date de début et on la met dans notre tableau
    // Pour chaque date récupérée, on lui donne un style (pour être marquée sur le calendrier)
    this.postListUnsubscribe = firestoreService.listenPost((posts) => {
      posts.forEach((post) => {
        marquedDates[
          this.convertDateFormatSlashToUnderscore(post.dateDebut)
        ] = {
          marked: true,
          dotColor: "#57B9BB",
        };
        // Idem avec la date de fin
        marquedDates[this.convertDateFormatSlashToUnderscore(post.dateFin)] = {
          marked: true,
          dotColor: "#57B9BB",
        };
      });
    });

    // On ajoute à notre tableau la date sélectionnée par l'utilisateur, qui est marquée avec un style différent
    marquedDates[this.state.selectedDate] = {
      selected: true,
    };

    // Mise à jour du state
    this.setState({ events: marquedDates });
  }

  componentWillUnmount() {
    this.postListUnsubscribe ? this.postListUnsubscribe() : null;
  }
  postListUnsubscribe?: () => void;

  // Permet d'afficher (ou non) l'événement associé à une date
  displaySelectedEvent = (date: string) => {
    // On récupère depuis la BDD tous les posts qui ont pour date de début la date sélectionnée
    // Et on met à jour le state avec les posts correspondant
    this.postListUnsubscribe = firestoreService.listenPostDebut(
      (postsDebut) => this.setState({ eventSelected: [...postsDebut] }),
      this.convertDateFormatUnderscoreToSlash(date)
    );
    // Idem pour les posts ayant pour date de fin la date sélectionnée
    this.postListUnsubscribe = firestoreService.listenPostFin(
      (postsFin) =>
        this.setState({
          eventSelected: [...this.state.eventSelected, ...postsFin],
        }),
      this.convertDateFormatUnderscoreToSlash(date)
    );
  };

  // Lorsqu'un utilisateur clique sur une nouvelle date,
  // il faut mettre à jour quelles dates doivent être marquées
  onPressDay = (date: any) => {
    this.displaySelectedEvent(date);
    const nouvelleDateSelectionnee = moment(date).format("YYYY-MM-DD");

    // Retourne vrai si l'ancienne date sélectionnée était un événement, faux sinon
    const even = (element: any) => {
      if (
        this.convertDateFormatSlashToUnderscore(element.dateDebut) ===
          this.state.selectedDate ||
        this.convertDateFormatSlashToUnderscore(element.dateFin) ===
          this.state.selectedDate
      )
        return true;
      else {
        return false;
      }
    };

    // Nouveau tableau des dates devant être marquées
    let updatedMarkedDates = {};

    // Si l'ancienne date sélectionnée était un événement, il faut la marquer
    if (this.state.eventSelected.some(even)) {
      updatedMarkedDates = {
        // On récupère l'ensemble des dates marquées comme événement
        ...this.state.events,
        // L'ancienne date sélectionnée est marquée comme un événement
        ...{ [this.state.selectedDate]: { marked: true, dotColor: "#57B9BB" } },
        // La nouvelle date sélectionnée est marquée comme date sélectionnée
        ...{ [nouvelleDateSelectionnee]: { selected: true } },
      };
    }
    // Sinon, on fait la même chose, mais l'ancienne date sélectionnée devient non marquée
    else {
      updatedMarkedDates = {
        ...this.state.events,

        ...{ [this.state.selectedDate]: { selected: false } },

        ...{ [nouvelleDateSelectionnee]: { selected: true } },
      };
    }

    // Mise à jour de la date sélectionnée
    this.setState({
      selectedDate: nouvelleDateSelectionnee,
    });

    // Mise à jour des date devant être marquées
    this.setState({ events: updatedMarkedDates });
  };

  render() {
    return (
      <View style={{ height: "100%" }}>
        <Calendar
          theme={{
            todayTextColor: "#57B9BB",
            monthTextColor: "#57B9BB",
            arrowColor: "#57B9BB",
            textMonthFontWeight: "bold",
            textMonthFontSize: 18,
            selectedDayBackgroundColor: "#57B9BB",
            selectedDayTextColor: "white",
            textDayHeaderFontSize: 8,
          }}
          monthFormat={"MMMM yyyy"}
          disableMonthChange={true}
          onDayPress={(date) => this.onPressDay(date.dateString)}
          markedDates={this.state.events}
        />
        {/*Affichage de la liste des posts correspondant à la date sélectionnée*/}
        <View style={{ flex: 1 }}>
          <PostList
            posts={this.state.eventSelected}
            navigation={this.props.navigation}
          />
        </View>
      </View>
    );
  }
}
