import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useGlobalContext } from "../context/GlobalProvider";
import { getAdoptionRequests } from "../lib/appwrite";
import EmptyState from "../components/EmptyState";

const AdoptionRequests = () => {
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

  const renderItem = ({ item }) => (
    <View className="p-4 mb-4 bg-white rounded-lg shadow-md">
      <Text className="text-lg font-bold">{item.PetName}</Text>
      <Text className="mt-2">Requested by: {item.adopterName}</Text>
      <Text>Contact: {item.adopterContact}</Text>
      <Text>Address: {item.adopterAddress}</Text>
      <Text className="mt-2">Message: {item.message}</Text>
      <Text className="mt-2 text-sm text-gray-500">
        Requested at: {item.requested_at}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
        <Text className="text-2xl text-white font-bold">Adoption Requests</Text>
      </View>
      {loading ? (
        <Text className="text-white text-center">Loading...</Text>
      ) : requests.length === 0 ? (
        <EmptyState
          title="No Requests Found"
          subtitle="You have no adoption requests."
        />
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

export default AdoptionRequests;
