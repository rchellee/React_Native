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
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

// const DetailsScreen = ({ navigation }) => {
const DetailsScreen = () => {
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
  } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <StatusBar backgroundColor="#d0d8dc" />

      <View style={{ height: 480, backgroundColor: "#d0d8dc" }}>
        <ImageBackground
          resizeMode="contain"
          source={{ uri: image }}
          style={{
            height: 280,
            top: 40,
          }}
        >
          {/* Render  Header */}
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
          {/* Pet name and gender icon */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{ fontSize: 20, color: "#616161", fontWeight: "bold" }}
            >
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

          {/* Render Pet type and age */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: 12, color: "#616161" }}>
              Type: {species}
            </Text>
            <Text style={{ fontSize: 13, color: "#616161" }}>Age: {age} </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: 12, color: "#616161" }}>
              Breed: {breed}
            </Text>
            <Text style={{ fontSize: 13, color: "#616161" }}>
              Color: {color}{" "}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: 12, color: "#616161" }}>Size: {size}</Text>
            <Text style={{ fontSize: 13, color: "#616161" }}>
              Php: {adoption_fee}{" "}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: 12, color: "#616161" }}>
              Vaxx: {vaccination_status ? "Yes" : "No"}
            </Text>
            <Text style={{ fontSize: 13, color: "#616161" }}>
              {contact_num}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: 13, color: "#616161" }}>
              {email}
            </Text>
          </View>

          {/* Render location and icon */}
          <View style={{ marginTop: 5, flexDirection: "row" }}>
            <Icon name="map-marker" color="#306060" size={20} />
            <Text style={{ fontSize: 14, color: "#a8a8a8", marginLeft: 5 }}>
              {location}
            </Text>
          </View>
        </View>
      </View>

      {/* Comment container */}
      <View
        style={{ marginTop: 100, justifyContent: "space-between", flex: 1 }}
      >
        <View>
          {/* Render user image , name and date */}
          <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
            <Image
              source={{ uri: avatar }}
              style={{ height: 40, width: 40, borderRadius: 20 }}
            />
            <View style={{ flex: 1, paddingLeft: 10 }}>
              <Text
                style={{ color: "#616161", fontSize: 12, fontWeight: "bold" }}
              >
                {username}
              </Text>
              <Text
                style={{
                  color: "#a8a8a8",
                  fontSize: 11,
                  fontWeight: "bold",
                  marginTop: 2,
                }}
              >
                 {email}
              </Text>
            </View>
            <Text style={{ color: "#a8a8a8", fontSize: 12 }}>{created_at}</Text>
          </View>
          <Text style={style.comment}>{description} </Text>
        </View>

        {/* Render footer */}
        <View style={style.footer}>
          <View style={style.iconCon}>
            <Icon name="heart-outline" size={22} color="#FFF" />
          </View>
          
          <TouchableOpacity 
            style={style.btn}
            onPress={() => navigation.navigate('adopt_form', { Name, age, species, breed, color, gender, size, adoption_fee, vaccination_status, description, contact_num, location, image, created_at, username, email, })}
          >
            <Text style={{ color: "#FFF", fontWeight: "bold" }}>ADOPT</Text>
          </TouchableOpacity>
        </View>
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
  footer: {
    height: 100,
    backgroundColor: "#f5f5f5",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  iconCon: {
    backgroundColor: "#306060",
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  btn: {
    backgroundColor: "#306060",
    flex: 1,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
  },
});
export default DetailsScreen;
