import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Text,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { icons } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, signOut } from "../../lib/appwrite";
import EmptyState from "../../components/EmptyState";
import InfoBox from "../../components/InfoBox";
import MyPet from "../../components/MyPet";
import Adoption from "../../components/adoption";
import Notifications from "../../components/Notifications";
import { useGlobalContext } from "../../context/GlobalProvider";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));
  const [activeTab, setActiveTab] = useState("My Pets");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign-in");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "My Request":
        return <Notifications />;
      case "Adoption":
        return (
          <FlatList
            data={posts.filter((post) => post.adoption_status === "Pending")} // Filter posts with adoption status "pending"
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => <Adoption video={item} />}
            ListEmptyComponent={() => (
              <EmptyState
                title="No Pending Adoption Requests"
                subtitle="You have no pending adoption requests at the moment"
              />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        );
      case "My Pets":
      default:
        return (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => <MyPet video={item} />}
            ListEmptyComponent={() => (
              <EmptyState
                title="No Videos Found"
                subtitle="No videos found for this profile"
              />
            )}
          />
        );
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full flex justify-center items-center mt-1 mb-8 px-5">
        <TouchableOpacity
          onPress={logout}
          className="flex w-full items-end mb-10"
        >
          <Image
            source={icons.logout}
            resizeMode="contain"
            className="w-6 h-6"
          />
        </TouchableOpacity>

        <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center ">
          <Image
            source={{ uri: user?.avatar }}
            className="w-[90%] h-[90%] rounded-lg"
            resizeMode="cover"
          />
        </View>

        <InfoBox
          title={user?.username}
          containerStyles="mt-5"
          titleStyles="text-lg"
        />
      </View>

      <View className="flex flex-row justify-around w-full mb-1">
        <TouchableOpacity onPress={() => setActiveTab("My Pets")}>
          <Text
            style={
              activeTab === "My Pets"
                ? [styles.textActive, styles.fontBold]
                : styles.textDefault
            }
          >
            My Pets
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("My Request")}>
          <Text
            style={
              activeTab === "My Request"
                ? [styles.textActive, styles.fontBold]
                : styles.textDefault
            }
          >
            My Request
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("Adoption")}>
          <Text
            style={
              activeTab === "Adoption"
                ? [styles.textActive, styles.fontBold]
                : styles.textDefault
            }
          >
            Adoption
          </Text>
        </TouchableOpacity>
      </View>

      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textDefault: {
    color: "#FFFFFF",
  },
  textActive: {
    color: "#FFA001",
  },
  fontBold: {
    fontWeight: "bold",
  },
});

export default Profile;
