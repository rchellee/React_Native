import React from "react";
import {
  Text,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getPetIdByName, deletePet } from "../lib/appwrite"; // Ensure this import matches your project structure

const MyPetDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    Name,
    age,
    species,
    breed,
    color,
    gender,
    size,
    adoption_fee,
    vaccination_status,
    description,
    contact_num,
    location,
    image,
    created_at,
    username,
    avatar,
    email,
    approval,
  } = route.params;

  const handleDelete = async () => {
    try {
      const petId = await getPetIdByName(Name);
      await deletePet(petId);
      Alert.alert("Success", "Pet deleted successfully.");
      navigation.navigate("adopt");
    } catch (error) {
      Alert.alert("Error", "Failed to delete the pet.");
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this pet?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: handleDelete,
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <StatusBar backgroundColor="#d0d8dc" />
      <View style={{ height: 480, backgroundColor: "#d0d8dc" }}>
        <ImageBackground
          resizeMode="contain"
          source={{ uri: image }}
          style={{ height: 280, top: 40 }}
        >
          <View style={style.header}>
            <Icon
              name="arrow-left"
              size={28}
              color="#616161"
              onPress={() => navigation.navigate("adopt")}
            />
          </View>
        </ImageBackground>

        <View style={style.detailsContainer}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 20, color: "#616161", fontWeight: "bold" }}>
              {Name}
            </Text>
            <Text>
              {gender === "Female" ? (
                <Icon name="gender-female" size={25} color="#a8a8a8" />
              ) : (
                <Icon name="gender-male" size={25} color="#a8a8a8" />
              )}
            </Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
            <Text style={{ fontSize: 12, color: "#616161" }}>Type: {species}</Text>
            <Text style={{ fontSize: 13, color: "#616161" }}>Age: {age}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
            <Text style={{ fontSize: 12, color: "#616161" }}>Breed: {breed}</Text>
            <Text style={{ fontSize: 13, color: "#616161" }}>Color: {color}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
            <Text style={{ fontSize: 12, color: "#616161" }}>Size: {size}</Text>
            <Text style={{ fontSize: 13, color: "#616161" }}>Php: {adoption_fee}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
            <Text style={{ fontSize: 12, color: "#616161" }}>
              Vaxx: {vaccination_status ? "Yes" : "No"}
            </Text>
            <Text style={{ fontSize: 13, color: "#616161" }}>{contact_num}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
            <Text style={{ fontSize: 13, color: "#616161" }}>{email}</Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
            <Text style={{ fontSize: 14, color: "#a8a8a8", marginLeft: 5 }}>
              <Icon name="map-marker" color="#306060" size={20} /> {location}
            </Text>
            <TouchableOpacity onPress={confirmDelete}>
              <Icon name="delete" size={28} color="#ff0000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{ marginTop: 100, justifyContent: "space-between", flex: 1 }}>
        <View>
          <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
            <Image source={{ uri: avatar }} style={{ height: 40, width: 40, borderRadius: 20 }} />
            <View style={{ flex: 1, paddingLeft: 10 }}>
              <Text style={{ color: "#616161", fontSize: 12, fontWeight: "bold" }}>
                {username}
              </Text>
              <Text
                style={{ color: "#a8a8a8", fontSize: 11, fontWeight: "bold", marginTop: 2 }}
              >
                {email}
              </Text>
            </View>
            <Text style={{ color: "#a8a8a8", fontSize: 12 }}>{created_at}</Text>
          </View>
          <Text style={style.comment}>{description}</Text>
        </View>
        <Text style={{ fontSize: 13, color: "#616161" }}>
          Status: {approval} by the Admin
        </Text>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  detailsContainer: {
    height: 120,
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    flex: 1,
    bottom: -60,
    borderRadius: 18,
    elevation: 10,
    padding: 20,
    justifyContent: "center",
  },
  comment: {
    marginTop: 10,
    fontSize: 12.5,
    color: "#616161",
    lineHeight: 20,
    marginHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
  },
});

export default MyPetDetails;
