import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, Image } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[300px] h-[80px]"
            resizeMode="contain"
          />
          <Text className="mt-10 mb-5"></Text>
          <Image
            source={images.cards}
            className="max-w-[300px] w-full h-[300px]"
            resizeMode="contain"
          />

          <View className="relative mt-1">
            <Text className="mt-9"></Text>
            <Text className="text-2xl text-white font-bold text-center">
              You can make a{"\n"}
              Difference with{" "}
              <Text className="text-secondary-200">WanderPets</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Find your new best friend. Every fur deserve a FurEver Home
          </Text>

          <CustomButton
            title="Get Started"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      {/* paramawala status bar sa phone(battery,time) */}
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
