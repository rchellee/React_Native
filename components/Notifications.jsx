import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, TouchableOpacity, Alert, Image } from "react-native";
import { getAdoptionRequests, deleteAdoptionRequest, updatePetAdoptionStatus, getUserRatings } from "../lib/appwrite";
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
        console.error("Error fetching user ratings:", error);
      }
    };
    fetchUserRatings();
  }, [user.$id]);

  const hasUserRatedPet = (petId) => {
    return userRatings.some(rating => rating.petId === petId);
  };
  

  const renderItem = ({ item }) => {
    const petInfo = JSON.parse(item.petInfo);
  
    const handleCancelRequest = async (requestId, petName) => {
      try {
        await updatePetAdoptionStatus(petName, { adoption_status: "Available" });
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
          navigation.navigate("RatingForm", { petId });
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
      <View className="p-4 mb-4 bg-white rounded-lg shadow-md">
        <Text className="text-lg font-bold">{item.PetName}</Text>
        <Text className="mt-2">Requested by: {item.adopterName}</Text>
        <Text>Contact: {item.adopterContact}</Text>
        <Text>Address: {item.adopterAddress}</Text>
        <Text className="mt-2">Message: {item.message}</Text>
        <Text className="mt-2 text-sm text-gray-500">Requested at: {item.requested_at}</Text>
        <Text className="mt-2 text-sm text-gray-500">Status: {item.status}</Text>
        {!alreadyRated && (
          <View className="mt-4">
            <Text className="text-lg font-bold">Pet Information:</Text>
            <Text>Age: {petInfo.age || 'N/A'}</Text>
            <Text>Species: {petInfo.species || 'N/A'}</Text>
            <Text>Breed: {petInfo.breed || 'N/A'}</Text>
            <Text>Color: {petInfo.color || 'N/A'}</Text>
            <Text>Gender: {petInfo.gender || 'N/A'}</Text>
            <Text>Size: {petInfo.size || 'N/A'}</Text>
            <Text>Adoption Fee: {petInfo.adoption_fee || 'N/A'}</Text>
            <Text>Vaccination Status: {petInfo.vaccination_status !== "" ? "Yes" : "No"}</Text>
            <Text>Description: {petInfo.description || 'N/A'}</Text>
            <Text>Contact Number: {petInfo.contact_num || 'N/A'}</Text>
            <Text>Location: {petInfo.location || 'N/A'}</Text>
            {petInfo.image && (
              <Image source={{ uri: petInfo.image }} style={{ width: 100, height: 100 }} />
            )}
          </View>
        )}
        {item.status === "Adopted" && !alreadyRated && (
          <TouchableOpacity
            onPress={() => handleRatePet(item.PetName)} 
            className="mt-4 bg-blue-500 p-2 rounded-lg"
          >
            <Text className="text-white text-center">Rate</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => handleCancelRequest(item.$id, item.PetName)}
          className="mt-4 bg-red-500 p-2 rounded-lg"
        >
          <Text className="text-white text-center">Cancel Request</Text>
        </TouchableOpacity>
      </View>
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

export default Notifications;
