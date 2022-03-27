import React, { Component } from "react";
import { View, StyleSheet, Text, Image, FlatList } from "react-native";

const DATA = [
    {
      id: 1,
      titre: "Planet of Nature",
      description: "description1",
      image:
        "https://images.unsplash.com/photo-1482822683622-00effad5052e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      tags: [
        "Lorem ipsum",
        "dolor sit amet",
        "consectetur adipiscing elit",
        "sed do eiusmod tempor incididunt",
        "ut labore et dolore magna aliqua. ",
      ],
    },
    {
      id: 2,
      titre: "Lampost",
      description: "description2",
      image:
        'https://images.unsplash.com/photo-1482822683622-00effad5052e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
      tags: ["tag1", "tag2", "tag3"],
    },

    {
      id: 3,
      titre: "test 3",
      description: "lorem ipsum dolor sit amet ça ne veut rien dire mais j'ai besoin des faire des lignes et donc d'écrire à peu près n'importe quoi, j'espère que ce sera pas trop long, mdr j'ai déjà trop la flemme, d'ailleurs faut que j'aille me coucher demain je me lève tot",
      image:
        'https://images.unsplash.com/photo-1482822683622-00effad5052e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
      tags: ["tag1", "tag2", "tag3"],
    }
];

export default function PostListCDF() {
  return(
      <View>
          <FlatList
            data={DATA}
            renderItem={({item})=>(
              <View style={styles.post}>
                <Text style={styles.titre}>{item.titre}</Text>
                <Text numberOfLines={3}>{item.description}</Text>
                <Image source={{ uri: item.image }} style={styles.image} />
              </View>
            )}
          />
      </View>
  );
}

const styles = StyleSheet.create({
  image:{
    height:250,
    resizeMode:'contain'
  },
  titre:{
    fontWeight:"bold",
    textAlign: "center"
  },
  post:{
    flex: 1,
    margin: 20
  },
})