import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import {
  getAdoptionRequests,
  updateAdoptionRequest,
  updatePetAdoptionStatus,
} from "../lib/appwrite";
import EmptyState from "../components/EmptyState";
import { useGlobalContext } from "../context/GlobalProvider";

const Pending = () => {
  const { user } = useGlobalContext();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

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
      console.log("Decline Request ID:", requestId); // Log the requestId
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
  
      console.log("Accept Request ID:", requestId); // Log the requestId
      console.log("Pet Name:", petName); // Log the petName
  
      await updateAdoptionRequest(requestId, { status: "Accepted" });
      await updatePetAdoptionStatus(petName, { adoption_status: "Pending" }); // Change adoption status to "Adopted"
  
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
  
      console.log("Accept Request ID:", requestId); // Log the requestId
      console.log("Pet Name:", petName); // Log the petName
  
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
  

  const renderItem = ({ item }) => {
    const petInfo = JSON.parse(item.petInfo);
    const isAccepted = item.status === "Accepted";
  
    return (
      <View className="p-4 mb-4 bg-white rounded-lg shadow-md">
        <Text className="text-lg font-bold">{item.PetName}</Text>
        <Text className="mt-2">Requested by: {item.adopterName}</Text>
        <Text>Contact: {item.adopterContact}</Text>
        <Text>Address: {item.adopterAddress}</Text>
        <Text className="mt-2">Message: {item.message}</Text>
        <Text className="mt-2 text-sm text-gray-500">
          Requested at: {item.requested_at}
        </Text>
        <Text className="mt-2 text-sm text-gray-500">
          Status: {item.status}
        </Text>
        <View className="mt-4">
          <Text className="text-lg font-bold">Pet Information:</Text>
          <Text>Age: {petInfo.age || "N/A"}</Text>
          <Text>Species: {petInfo.species || "N/A"}</Text>
          <Text>Breed: {petInfo.breed || "N/A"}</Text>
          <Text>Color: {petInfo.color || "N/A"}</Text>
          <Text>Gender: {petInfo.gender || "N/A"}</Text>
          <Text>Size: {petInfo.size || "N/A"}</Text>
          <Text>Adoption Fee: {petInfo.adoption_fee || "N/A"}</Text>
          <Text>
            Vaccination Status:{" "}
            {petInfo.vaccination_status !== "" ? "Yes" : "No"}
          </Text>
          <Text>Description: {petInfo.description || "N/A"}</Text>
          <Text>Contact Number: {petInfo.contact_num || "N/A"}</Text>
          <Text>Location: {petInfo.location || "N/A"}</Text>
          {petInfo.image && (
            <Image
              source={{ uri: petInfo.image }}
              style={{ width: 100, height: 100 }}
            />
          )}
        </View>
        <View className="mt-4 flex-row justify-between">
          {isAccepted ? (
            <>
              <TouchableOpacity
                onPress={() => handleDeclineRequest(item.$id)}
                className="bg-red-500 p-2 rounded-lg flex-1 mr-2"
              >
                <Text className="text-white text-center">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleAdoptionComplete(item.$id, item.PetName)}
                className="bg-gray-500 p-2 rounded-lg flex-1 ml-2"
              >
                <Text className="text-white text-center">Adopted</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => handleDeclineRequest(item.$id)}
                className="bg-red-500 p-2 rounded-lg flex-1 mr-2"
              >
                <Text className="text-white text-center">Decline</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleAcceptRequest(item.$id, item.PetName)}
                className="bg-green-500 p-2 rounded-lg flex-1 ml-2"
              >
                <Text className="text-white text-center">Accept</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  };
  
  return (
    <SafeAreaView className="bg-primary flex-1">
      {loading ? (
        <Text>Loading...</Text>
      ) : requests.length === 0 ? (
        <Text>No Pending Requests</Text>
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

export default Pending;
