import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAllPosts } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import ToApprove from "../../components/ToApprove";
import EmptyState from "../../components/EmptyState"; // Ensure this import if you have an EmptyState component

const Request = () => {
  const { user } = useGlobalContext();
  const [pets, setPets] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPets = async () => {
    try {
      const allPosts = await getAllPosts();
      const pendingPets = allPosts.filter(
        (post) => post.approval === "Pending"
      );
      setPets(pendingPets);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPets();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={pets}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <ToApprove key={item.$id} video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{ uri: user?.avatar }}
                  className="w-[46px] h-[46px] rounded-lg mr-2"
                  resizeMode="cover"
                />
                <Text className="text-xl font-psemibold text-white">
                  {user?.username}
                </Text>
              </View>
            </View>

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-secondary-200 text-lg">
                WanderPets{" "}
                <Text className="text-gray-100 text-lg font-pregular mb-3">
                  Requests!
                </Text>
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Pets Requested Found"
            subtitle="You're all done!"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Request;
