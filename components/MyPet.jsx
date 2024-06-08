import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
  Alert,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useGlobalContext } from "../context/GlobalProvider";
import { getUserPosts, getPetIdByName, deletePet } from "../lib/appwrite"; // Import the deletePet function
import useAppwrite from "../lib/useAppwrite";
import { icons } from "../constants";

const MyPet = ({ video: { Name, age, species, breed, color, gender, size, adoption_fee, vaccination_status, description, contact_num, location, image, created_at, adoption_status, approval, creator: { username, avatar, email }} }) => {
  const { user } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));
  const [refreshing, setRefreshing] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const navigation = useNavigation();

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleDelete = async () => {
    try {
      const petId = await getPetIdByName(Name);
      await deletePet(petId);
      await refetch();
    } catch (error) {
      Alert.alert("Error", "Failed to delete the pet.");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View className="flex flex-col items-center px-4 mb-14">
        <View className="flex flex-row gap-3 items-start">
          <View className="flex justify-center items-center flex-row flex-1">
            <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
              <Image
                source={{ uri: avatar }}
                className="w-full h-full rounded-lg"
                resizeMode="cover"
              />
            </View>

            <View className="flex justify-center flex-1 ml-3 gap-y-1">
              <Text
                className="font-psemibold text-sm text-white"
                numberOfLines={1}
              >
                {Name}
              </Text>
              <Text
                className="text-xs text-gray-100 font-pregular"
                numberOfLines={1}
              >
                {username}
              </Text>
              <Text
                className="text-xs text-gray-100 font-pregular"
                numberOfLines={1}
              >
                {adoption_status}
              </Text>
            </View>
          </View>

          <View className="pt-2">
            <TouchableOpacity onPress={() => setShowDelete(!showDelete)}>
              <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
            </TouchableOpacity>
          </View>
        </View>

        

        <TouchableOpacity
          activeOpacity={0.7}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
          onPress={() => navigation.navigate('MyPetDetails', { Name, age, species, breed, color, gender, size, adoption_fee, vaccination_status, description, contact_num, location, image, created_at, username, avatar, email, approval })}
        >
          <Image
            source={{ uri: image }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default MyPet;
