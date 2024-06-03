import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";
import {
  getAdoptionRequests,
  deleteAdoptionRequest,
  updatePetAdoptionStatus,
  getUserRatings,
} from "../lib/appwrite";
import EmptyState from "../components/EmptyState";
import { useGlobalContext } from "../context/GlobalProvider";
import { useNavigation } from "@react-navigation/native";
import { getPetIdByName } from "../lib/appwrite";

const Notifications = () => {
  const navigation = useNavigation();
  const { user } = useGlobalContext();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRatings, setUserRatings] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getAdoptionRequests(user.$id);
        setRequests(data);
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [user.$id]);

  useEffect(() => {
    const fetchUserRatings = async () => {
      try {
        const ratings = await getUserRatings(user.$id);
        setUserRatings(ratings);
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    };

    fetchUserRatings();
  }, [user.$id]);

  const hasUserRatedPet = (petId) => {
    return userRatings.some((rating) => rating.petId === petId);
  };

  const renderItem = ({ item }) => {
    const petInfo = JSON.parse(item.petInfo);

    const handleCancelRequest = async (requestId, petName) => {
      try {
        await updatePetAdoptionStatus(petName, {
          adoption_status: "Available",
        });
        await deleteAdoptionRequest(requestId);
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request.$id !== requestId)
        );
        Alert.alert("Success", "Adoption request cancelled successfully.");
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    };

    const handleRatePet = async (petName) => {
      try {
        const petId = await getPetIdByName(petName);
        if (petId) {
          navigation.navigate("RatingForm", { petId, petName });
        } else {
          Alert.alert("Error", "Pet ID not found for the given pet name.");
        }
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    };

    const petId = item.petId;
    const alreadyRated = hasUserRatedPet(petId);

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#161622" }}>
      <StatusBar backgroundColor="#FFF" />
      <ScrollView>
      <View style={style.requesterContainer}>
        <View className="p-4 mb-1 bg-white rounded-lg shadow-md">
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 20, color: "#616161", fontWeight: "bold" }}>{item.PetName}</Text>
          </View>
        {/* <Text className="mt-2">Requested by: {item.adopterName}</Text>
        <Text>Contact: {item.adopterContact}</Text>
        <Text>Address: {item.adopterAddress}</Text>
        <Text className="mt-2">Message: {item.message}</Text> */}
        {/* <Text className="mt-2 text-sm text-gray-500">Rated: {item.rated}</Text> */}
        {!alreadyRated && (
          <View className="mt-4">
          {petInfo.image && (
              <Image
                source={{ uri: petInfo.image }}
                style={{ width: 100, height: 100 }}
              />
            )}
            <Text className="text-lg font-bold">Pet Information:</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
            <Text style={{ fontSize: 12, color: "#616161" }}>Type: {petInfo.species || "N/A"}</Text>
            <Text style={{ fontSize: 13, color: "#616161" }}>Age: {petInfo.age || "N/A"} </Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
            <Text style={{ fontSize: 12, color: "#616161" }}>Breed: {petInfo.breed || "N/A"}</Text>
            <Text style={{ fontSize: 13, color: "#616161" }}>Color: {petInfo.color || "N/A"} </Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
            <Text style={{ fontSize: 12, color: "#616161" }}>Size: {petInfo.size || "N/A"}</Text>
            <Text style={{ fontSize: 13, color: "#616161" }}>Gender: {petInfo.gender || "N/A"} </Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
            <Text style={{ fontSize: 12, color: "#616161" }}>Vaxx: {petInfo.vaccination_status !== "" ? "Yes" : "No"}</Text>
            <Text style={{ fontSize: 13, color: "#616161" }}>{petInfo.contact_num || "N/A"}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
            <Text style={{ fontSize: 13, color: "#616161" }}>Php {petInfo.adoption_fee}</Text>
          </View>
            <Text>Description: {petInfo.description || "N/A"}</Text>
            <Text>Location: {petInfo.location || "N/A"}</Text>
            <Text></Text>
            <Text style={{ fontWeight: 'bold' }}>Status: {item.status}</Text>
        <Text className="mt-2 text-sm text-gray-500">
          Requested at: {item.requested_at}
        </Text>
          </View>
        )}
        {item.status === "Adopted" && item.rated !== "True" && (
          <TouchableOpacity
            onPress={() => handleRatePet(item.PetName)}
            className="mt-4 bg-blue-500 p-2 rounded-lg"
          >
            <Text className="text-white text-center">Rate</Text>
          </TouchableOpacity>
        )}


        {item.status !== "Adopted" && (
          <TouchableOpacity
            onPress={() => handleCancelRequest(item.$id, item.PetName)}
            className="mt-4 bg-red-500 p-2 rounded-lg"
          >
            <Text className="text-white text-center">Cancel Request</Text>
          </TouchableOpacity>
        )}
        </View>
      </View>
      </ScrollView>
      </SafeAreaView>
      
    );
  };

  return (
    <SafeAreaView className="bg-primary flex-1">
      {loading ? (
        <Text>Loading...</Text>
      ) : requests.length === 0 ? (
        <EmptyState message="No adoption requests found." />
      ) : (
        <FlatList
          data={requests}
          renderItem={renderItem}
          keyExtractor={(item) => item.$id}
        />
      )}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  
  requesterContainer: {
    borderRadius: 18,
    marginHorizontal: 25,
    marginTop: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default Notifications;
