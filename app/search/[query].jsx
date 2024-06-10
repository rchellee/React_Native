import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppwrite from "../../lib/useAppwrite";
import { searchPosts } from "../../lib/appwrite";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import PetList from "../../components/PetList";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    refetch();
  }, [query]);

  useEffect(() => {
    if (posts) {
      const filtered = posts.filter(
        (post) =>
          post.approval !== "Pending" &&
          post.approval !== "Rejected" &&
          post.adoption_status !== "Adopted"
      );
      setFilteredPosts(filtered);
    }
  }, [posts]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <PetList video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-gray-100 text-sm">
              Search Results
            </Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>

            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} refetch={refetch} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Pet Found"
            subtitle="No pets found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
