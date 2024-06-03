import { useEffect, useState } from "react";
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
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import {
  getAdoptionRequested,
  updateAdoptionRequest,
  updatePetAdoptionStatus,
} from "../lib/appwrite";
import { useGlobalContext } from "../context/GlobalProvider";

const AdoptionDetails = () => {
  const { user } = useGlobalContext();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
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
    adoption_status,
  } = route.params;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getAdoptionRequested(Name); // Fetch requests for the specific pet
        // Filter out requests with status "Declined"
        const filteredData = data.filter(
          (request) => request.status !== "Declined"
        );
        setRequests(filteredData);
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [Name]);
  

  const handleDeclineRequest = async (requestId, petName) => {
    try {
      await updatePetAdoptionStatus(petName, { adoption_status: "Available" });
      await updateAdoptionRequest(requestId, { status: "Declined" });
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request.$id !== requestId)
      );
      Alert.alert("Success", "Adoption request declined successfully.");
      navigation.navigate("adopt");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleAcceptRequest = async (requestId, petName) => {
    try {
      if (!petName) {
        throw new Error("Missing required parameter: 'petName'");
      }

      await updateAdoptionRequest(requestId, { status: "Accepted" });
      await updatePetAdoptionStatus(petName, { adoption_status: "Pending" }); // Change adoption status to "Pending"

      setRequests((prevRequests) =>
        prevRequests.filter((request) => request.$id !== requestId)
      );

      Alert.alert("Success", "Adoption request accepted successfully.");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleAdoptionComplete = async (requestId, petName) => {
    try {
      if (!petName) {
        throw new Error("Missing required parameter: 'petName'");
      }

      await updateAdoptionRequest(requestId, { status: "Adopted" });
      await updatePetAdoptionStatus(petName, { adoption_status: "Adopted" }); // Change adoption status to "Adopted"

      setRequests((prevRequests) =>
        prevRequests.filter((request) => request.$id !== requestId)
      );

      Alert.alert("Success", "Adoption Completed.");
      navigation.navigate("adopt");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <StatusBar backgroundColor="#d0d8dc" />

      <ScrollView>
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
                onPress={() => navigation.navigate("profile")}
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
              <Text style={{ fontSize: 12, color: "#616161" }}>
                Status: {adoption_status}
              </Text>
              <Text style={{ fontSize: 13, color: "#616161" }}>{email}</Text>
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

        {/* Render adoption requests */}
        <View style={style.requesterContainer}>
            <Text style={style.sectionTitle}>Adoption Requests</Text>
            {requests.map((request) => (
              <View key={request.$id} style={style.requesterDetails}>
                <Text style={style.requesterText}>
                  <Text style={{ fontWeight: "bold" }}>Name: </Text>
                  {request.adopterName}
                </Text>
                <Text style={style.requesterText}>
                  <Text style={{ fontWeight: "bold" }}>Contact: </Text>
                  {request.adopterContact}
                </Text>
                <Text style={style.requesterText}>
                  <Text style={{ fontWeight: "bold" }}>Address: </Text>
                  {request.adopterAddress}
                </Text>
                <Text style={style.requesterText}>
                  <Text style={{ fontWeight: "bold" }}>Message: </Text>
                  {request.message}
                </Text>
              <View style={style.buttonContainer}>
                {request.status === "Accepted" ? (
                  <TouchableOpacity
                    style={style.completeButton}
                    onPress={() => handleAdoptionComplete(request.$id, Name)}
                  >
                    <Text style={style.buttonText}>Adopted</Text>
                  </TouchableOpacity>
                ) : request.status === "Pending" ? (
                  <TouchableOpacity
                    style={style.acceptButton}
                    onPress={() => handleAcceptRequest(request.$id, Name)}
                  >
                    <Text style={style.buttonText}>Accept</Text>
                  </TouchableOpacity>
                ) : null}
                {request.status !== "Declined" && (
                  <TouchableOpacity
                    style={style.declineButton}
                    onPress={() => handleDeclineRequest(request.$id, Name)}
                  >
                    <Text style={style.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    top: 20,
  },
  detailsContainer: {
    height: 140,
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    flex: 1,
    bottom: -60,
    borderRadius: 18,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  requesterContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#616161",
    marginBottom: 10,
  },
  requesterDetails: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  requesterText: {
    fontSize: 14,
    color: "#616161",
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  declineButton: {
    backgroundColor: "#FF6347",
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginRight: 5,
  },
  acceptButton: {
    backgroundColor: "#32CD32",
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginRight: 5,
  },
  completeButton: {
    backgroundColor: "#1E90FF",
    borderRadius: 5,
    padding: 10,
    flex: 1,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
  },
});

export default AdoptionDetails;
