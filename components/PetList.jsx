import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { icons } from "../constants";

const PetList = ({
  video: {
    Name,
    age,
    species,
    breed,
    color,
    gender,
    size,
    adoption_fee,
    vaccination_status,
    description,
    adoption_status,
    contact_num,
    location,
    image,
    created_at,
    creator: { username, avatar, email, accountId },
  },
}) => {
  const navigation = useNavigation();

  // Check if adoption status is "Adopted"
  if (adoption_status === "Adopted") {
    return null; // Hide the pet from the list
  }

  return (
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
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        onPress={() =>
          navigation.navigate("DetailsScreen", {
            Name,
            age,
            species,
            breed,
            color,
            gender,
            size,
            adoption_fee,
            vaccination_status,
            description,
            contact_num,
            location,
            image,
            created_at,
            username,
            avatar,
            email,
            accountId,
          })
        }
      >
        <Image
          source={{ uri: image }}
          className="w-full h-full rounded-xl mt-3"
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};

export default PetList;
