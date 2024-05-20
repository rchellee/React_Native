import React from "react";
import {
  Text,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// import { images } from "../constants";
import { images } from "../../constants";

// const DetailsScreen = ({ navigation }) => {
const DetailsScreen = () => {
  // const pet = route.params;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <StatusBar backgroundColor="#d0d8dc" />
      <View style={{ height: 400, backgroundColor: "#d0d8dc" }}>
        <ImageBackground
          resizeMode="contain"
          source={images.avatar}
          style={{
            height: 280,
            top: 20,
          }}
        >
          {/* Render  Header */}
          <View style={style.header}>
            <Icon
              name="arrow-left"
              size={28}
              color="#616161"
              // onPress={navigation.goBack}
            />
            <Icon name="dots-vertical" size={28} color="#616161" />
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
              Pet Name
            </Text>
            <Icon name="gender-male" size={25} color="#a8a8a8" />
          </View>

          {/* Render Pet type and age */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: 12, color: "#616161" }}>Pet Type</Text>
            <Text style={{ fontSize: 13, color: "#616161" }}>Pet Age </Text>
          </View>

          {/* Render location and icon */}
          <View style={{ marginTop: 5, flexDirection: "row" }}>
            <Icon name="map-marker" color="#306060" size={20} />
            <Text style={{ fontSize: 14, color: "#a8a8a8", marginLeft: 5 }}>
              5 Bulvarna-Kudriavska Street, Kyiv
            </Text>
          </View>
        </View>
      </View>

      {/* Comment container */}
      <View style={{ marginTop: 80, justifyContent: "space-between", flex: 1 }}>
        <View>
          {/* Render user image , name and date */}
          <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
            <Image
              source={images.avatar}
              style={{ height: 40, width: 40, borderRadius: 20 }}
            />
            <View style={{ flex: 1, paddingLeft: 10 }}>
              <Text
                style={{ color: "#616161", fontSize: 12, fontWeight: "bold" }}
              >
                JANE GARY
              </Text>
              <Text
                style={{
                  color: "#a8a8a8",
                  fontSize: 11,
                  fontWeight: "bold",
                  marginTop: 2,
                }}
              >
                Owner
              </Text>
            </View>
            <Text style={{ color: "#a8a8a8", fontSize: 12 }}>May 25, 2020</Text>
          </View>
          <Text style={style.comment}>
            My job requires moving to another country. I don't have the
            opputurnity to take the cat with me. I am looking for good people
            who will shelter my Lily.
          </Text>
        </View>

        {/* Render footer */}
        <View style={style.footer}>
          <View style={style.iconCon}>
            <Icon name="heart-outline" size={22} color="#FFF" />
          </View>
          <View style={style.btn}>
            <Text style={{ color: "#FFF", fontWeight: "bold" }}>ADOPTION</Text>
          </View>
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
