import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";

import { images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts } from "../../lib/appwrite";
import EmptyState  from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import VideoCard from "../../components/VideoCard"

const Home = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={images.avatar}
                  className="w-[46px] h-[46px] rounded-lg mr-2"
                  resizeMode="cover"
                />
                <Text className="text-xl font-psemibold text-white">
                  Ritchelle Rueras
                </Text>
              </View>
            </View>
            
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Pet Education!
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;