import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts } from "../../lib/appwrite";
import EmptyState  from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import VideoCard from "../../components/VideoCard";
import { Video } from "expo-av";

const Home = () => {
  return (
    <SafeAreaView className="bg-white h-full">
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
                <Text className="text-xl font-psemibold text">
                  Ritchelle Rueras
                </Text>
              </View>
            </View>
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-black-100 text-lg font-pregular mb-3">
                Pet Education
              </Text>
              <Text className="text-black-100 text-lg font-pregular mb-3">
                Welcome! Here you'll find informative videos to help you become a better pet owner.
              </Text>
              <View style={{ width: 300, height: 200 }}>
                <Video
                  source={require("../../assets/videos/educ1.mp4")}
                  style={{ flex: 1 }}
                  useNativeControls
                /> 
                <Video
                  source={require("../../assets/videos/educ2.mp4")}
                  style={{ flex: 1 }}
                  useNativeControls
                />
        
              </View>
            </View> 
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
