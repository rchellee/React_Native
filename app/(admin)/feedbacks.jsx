import React, { useEffect, useState } from "react";
import { View, Text, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getAllRatings } from "../../lib/appwrite";
import { AirbnbRating } from "react-native-ratings";

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

  const handleSignOut = async () => {
    try {
      // Your sign-out logic
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

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
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 40,
              color: "#fff",
            }}
          >
            WanderPets Feedbacks!
          </Text>
          {ratings.length > 0 ? (
            ratings.map((rating, index) => (
              <View
                key={index}
                style={{
                  marginBottom: 10,
                  padding: 10,
                  backgroundColor: "#fff",
                  borderRadius: 5,
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

export default Feedbacks;
