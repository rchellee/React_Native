import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
  StyleSheet,
} from "react-native";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts } from "../../lib/appwrite";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import PetList from "../../components/PetList";
import { useGlobalContext } from "../../context/GlobalProvider";

const Adopt = () => {
  const { user } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(getAllPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // Filter out posts with approval status "Pending" or "Rejected" or adoption status "Adopted"
  const filteredPosts = posts.filter(
    (post) =>
      post.approval !== "Pending" &&
      post.approval !== "Rejected" &&
      post.adoption_status !== "Adopted"
  );

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <PetList video={item} />}
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
            <SearchInput />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No Pets Found" subtitle="No Pets created yet" />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["white"]}
            tintColor={"white"}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 3,
    marginRight: 12,
  },
  username: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
});

export default Adopt;
