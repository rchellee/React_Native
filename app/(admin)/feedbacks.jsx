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
  container: {
    flex: 1,
    backgroundColor: "#161622",
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
    borderRadius: 3,
    marginRight: 12,
  },
  username: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#333",
    borderRadius: 20,
  },
  selectedButton: {
    backgroundColor: "orange",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
  content: {
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "orange",
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: "white",
    marginBottom: 14,
    textAlign: "justify",
  },
  noContent: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  card: {
    width: "48%",
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: 150,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
    textAlign: "center",
    padding: 10,
  },
  blogCard: {
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    fontSize: 14,
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  blogDesciption: {
    fontSize: 14,
    color: "#aaa",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "justify",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    width: "100%",
    height: "auto",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
  },
  modalImage: {
    width: "100%",
    height: 200,
    marginBottom: 13,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 13,
    color: "#333",
  },
  closeButton: {
    marginTop: 16,
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: "orange",
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  articleCard: {
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  articleDesciption: {
    fontSize: 14,
    color: "#aaa",
  },
  articleCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    fontSize: 14,
  },
  articleTitle: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Feedbacks;
