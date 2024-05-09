import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { images } from "../../constants";
import { Video } from "expo-av";

const VideoComponent = ({ source }) => {
  return (
    <View style={{ width: '100%', height: 200, marginBottom: 16 }}>
      <Video
        source={source}
        style={{ flex: 1 }}
        useNativeControls
      />
    </View>
  );
};
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
            <View className="">
              <Text className="text-200 text-lg font-psemibold mb-3">
              <Text style={{color: "darkmagenta"}}>
                Pet Education
              </Text>
              </Text>
              <Text className="text-100 text-lg font-pregular mb-3 text-white">
                Welcome! Here you'll find informative videos to help you become a better pet owner.
              </Text>
              <VideoComponent source={require("../../assets/videos/educ1.mp4")} />
            <VideoComponent source={require("../../assets/videos/educ2.mp4")} />
            <VideoComponent source={require("../../assets/videos/educ3.mp4")} />
          </View></View>
        )}
   
      />
    </SafeAreaView>
  );
};

export default Home;
