import React, { useEffect, useState } from "react";
import { View, Text, Alert, ScrollView, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getAllRatings } from "../../lib/appwrite";
import { AirbnbRating } from "react-native-ratings";
import { images } from "../../constants";

const Feedbacks = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        // Fetch all ratings
        const allRatings = await getAllRatings();
        setRatings(allRatings);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch ratings");
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <View style={{ marginTop: 20 }}>
          <View style={styles.userInfo}>
            <Image
              source={images.logoSmall}
              className="w-[130px] h-[40px] mr-5 -right-12 ml-12"
            />
            <Text className="text-xl font-pregular text-white -right-12 ">
              Feedbacks!
            </Text>
            <Image
              source={images.path}
              className="w-[100px] h-[10px] absolute -bottom-1 -right-5"
              resizeMode="contain"
            />
          </View>
          {ratings.length > 0 ? (
            ratings.map((rating, index) => (
              <View
                key={index}
                style={{
                  marginBottom: 10,
                  padding: 10,
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  marginTop: 20,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>
                  Pet Name: {rating.petName}
                </Text>
                <AirbnbRating
                  count={5}
                  defaultRating={rating.rating}
                  size={20}
                  showRating={false}
                  isDisabled
                />
                <Text>Feedback: {rating.feedback}</Text>
                <Text style={{ fontSize: 12, color: "#666" }}>
                  Dated rated: {new Date(rating.timestamp).toLocaleString()}
                </Text>
              </View>
            ))
          ) : (
            <Text>No ratings available.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
});

export default Feedbacks;
