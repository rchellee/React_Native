import {
  Text,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { getCurrentUser, updatePetAdoptionStatus } from "../lib/appwrite";

const ToApproveScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUser();
  }, []);

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const handleApprove = async () => {
    try {
      await updatePetAdoptionStatus(Name, { approval: "Approved" });
      Alert.alert("Success", "The pet has been approved.");
      navigation.navigate("request");
    } catch (error) {
      console.error("Error approving pet:", error);
    }
  };

  const handleReject = async () => {
    try {
      await updatePetAdoptionStatus(Name, { approval: "Rejected" });
      Alert.alert("Success", "The pet has been rejected.");
      navigation.navigate("request");
    } catch (error) {
      console.error("Error rejecting pet:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <ScrollView>
        <StatusBar backgroundColor="#444444" />

        <View style={{ height: 480, backgroundColor: "#161622" }}>
          <ImageBackground
            resizeMode="contain"
            source={{ uri: image }}
            style={{
              height: 280,
              top: 40,
            }}
          ></ImageBackground>

          <View style={style.detailsContainer}>
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
              <Text style={{ fontSize: 13, color: "#616161" }}>
                Age: {age}{" "}
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
              <Text style={{ fontSize: 12, color: "#616161" }}>
                Size: {size}
              </Text>
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
              <Text style={{ fontSize: 13, color: "#616161" }}>{email}</Text>
            </View>

            <View style={{ marginTop: 5, flexDirection: "row" }}>
              <Icon name="map-marker" color="#306060" size={20} />
              <Text style={{ fontSize: 14, color: "#a8a8a8", marginLeft: 5 }}>
                {location}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{ marginTop: 100, justifyContent: "space-between", flex: 1 }}
        >
          <View>
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
              <Text style={{ color: "#a8a8a8", fontSize: 12 }}>
                {created_at}
              </Text>
            </View>
            <Text style={style.comment}>{description} </Text>
          </View>

          <View style={style.footer}>
            <TouchableOpacity
              style={[style.btn, { backgroundColor: "#161622" }]}
              onPress={handleApprove}
            >
              <Text style={{ color: "#FFF", fontWeight: "bold" }}>Approve</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[style.btn, { backgroundColor: "#8B0000" }]}
              onPress={handleReject}
            >
              <Text style={{ color: "#FFF", fontWeight: "bold" }}>Reject</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    borderTopLeftRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  btn: {
    backgroundColor: "#161622",
    flex: 1,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ToApproveScreen;
