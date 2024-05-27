import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { getAdoptionRequests, deleteAdoptionRequest } from "../lib/appwrite";
import EmptyState from "../components/EmptyState";
import { useGlobalContext } from "../context/GlobalProvider";

const Notifications = () => {
  const { user } = useGlobalContext();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleCancelRequest = async (requestId) => {
    try {
      await deleteAdoptionRequest(requestId);
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request.$id !== requestId)
      );
      Alert.alert("Success", "Adoption request cancelled successfully.");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const renderItem = ({ item }) => (
    <View className="p-4 mb-4 bg-white rounded-lg shadow-md">
      <Text className="text-lg font-bold">{item.PetName}</Text>
      <Text className="mt-2">Requested by: {item.adopterName}</Text>
      <Text>Contact: {item.adopterContact}</Text>
      <Text>Address: {item.adopterAddress}</Text>
      <Text className="mt-2">Message: {item.message}</Text>
      <Text className="mt-2 text-sm text-gray-500">Requested at: {item.requested_at}</Text>
      <TouchableOpacity
        onPress={() => handleCancelRequest(item.$id)}
        className="mt-4 bg-red-500 p-2 rounded-lg"
      >
        <Text className="text-white text-center">Cancel Request</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
      </View>
      {loading ? (
        <Text className="text-white text-center">Loading...</Text>
      ) : requests.length === 0 ? (
        <EmptyState title="No Requests Found" subtitle="You have no adoption requests." />
      ) : (
        <FlatList
          data={requests}
          keyExtractor={(item) => item.$id}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
};

export default Notifications;
