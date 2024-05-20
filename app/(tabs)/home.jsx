import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, Text, View, StyleSheet } from "react-native";
import { useGlobalContext } from "../../context/GlobalProvider";
import VideoCard from "../../components/VideoCard";
import { useFonts } from 'expo-font';

const Home = () => {
  const { user } = useGlobalContext();
  const [fontsLoaded] = useFonts({
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Optionally render a loading state
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <View style={styles.userInfo}>
              <Image
                source={{ uri: user?.avatar }}
                style={styles.avatar}
                resizeMode="cover"
              />
              <Text style={[styles.username, { fontFamily: 'Poppins-Bold' }]}>{user?.username}</Text>
            </View>
            <View style={styles.content}>
              <Text style={[styles.title, { fontFamily: 'Poppins-Bold' }]}>Pet Education</Text>
              <Text style={styles.description}>
                Welcome! Here you'll find informative videos to help you become
                a better pet owner.
              </Text>
              <VideoCard
                source={require("../../assets/videos/educ1.mp4")}
                title="Training Basics"
                description="Learn the basic commands and techniques to train your pet effectively."
              />
              <VideoCard
                source={require("../../assets/videos/educ2.mp4")}
                title="Health Tips"
                description="Essential health tips to keep your pet healthy and happy."
              />
              <VideoCard
                source={require("../../assets/videos/educ3.mp4")}
                title="Behavioral Insights"
                description="Understand your pet's behavior and how to manage it."
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  headerContainer: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    marginRight: 12,
  },
  username: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  content: {
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "darkmagenta",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 16,
  },
});

export default Home;
