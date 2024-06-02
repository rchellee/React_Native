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
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import {
  getAdoptionRequests,
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
        const data = await getAdoptionRequests(user.$id, true); // Fetch requests as owner
        // Filter out requests with status "Declined"
        const filteredData = data.filter((request) => request.status !== "Declined");
        setRequests(filteredData);
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [user.$id]);

  const handleDeclineRequest = async (requestId) => {
    try {
      await updateAdoptionRequest(requestId, { status: "Declined" });
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request.$id !== requestId)
      );
      Alert.alert("Success", "Adoption request declined successfully.");
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
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

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
            <Text style={{ fontSize: 12, color: "#616161" }}>
              Status: {adoption_status}
            </Text>
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

          {/* Render comment text */}
          <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
            <Text style={{ color: "#616161", fontSize: 12, marginTop: 10 }}>
              {description}
            </Text>
          </View>
        </View>
      </View>

      {/* Requester Information */}
      <View style={style.requesterContainer}>
        <Text style={style.sectionTitle}>Requester Information</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : requests.length === 0 ? (
          <Text>No requests found.</Text>
        ) : (
          requests.map((request) => (
            <View key={request.$id} style={style.requesterDetails}>
              <Text style={style.requesterText}>
                Name: {request.adopterName}
              </Text>
              <Text style={style.requesterText}>
                Contact: {request.adopterContact}
              </Text>
              <Text style={style.requesterText}>
                Address: {request.adopterAddress}
              </Text>
              <Text style={style.requesterText}>Message: {request.message}</Text>
            </View>
          ))
        )}
      </View>
      <View style={style.buttonContainer}>
                <TouchableOpacity
                  style={style.declineButton}
                  onPress={() => handleDeclineRequest(request.$id)}
                >
                  <Text style={style.buttonText}>Decline</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={style.acceptButton}
                  onPress={() =>
                    handleAcceptRequest(request.$id, Name)
                  }
                >
                  <Text style={style.buttonText}>Accept</Text>
                </TouchableOpacity>
              </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  detailsContainer: {
    height: 120,
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    flexDirection: "column",
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    marginTop: 50,
  },
  requesterContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#616161",
  },
  requesterDetails: {
    backgroundColor: "#f8f8f8",
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
  requesterText: {
    fontSize: 14,
    color: "#616161",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  declineButton: {
    backgroundColor: "#ff4d4d",
    padding: 10,
    borderRadius: 5,
  },
  acceptButton: {
    backgroundColor: "#4caf50",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AdoptionDetails;