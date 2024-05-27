import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, Text, View, StyleSheet, TouchableOpacity, Modal, ScrollView } from "react-native";
import { useGlobalContext } from "../../context/GlobalProvider";
import VideoCard from "../../components/VideoCard";
import { useFonts } from 'expo-font';

const Home = () => {
  const { user } = useGlobalContext();
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
  });

  const [selectedCategory, setSelectedCategory] = useState("Training 101");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageData, setSelectedImageData] = useState(null);

  if (!fontsLoaded) {
    return null; // Optionally render a loading state
  }

  const openModal = (imageData) => {
    setSelectedImageData(imageData);
    setModalVisible(true);
  };

  const renderContent = () => {
    if (selectedCategory === "Training 101") {
      return (
        <>
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
        </>
      );
    } else if (selectedCategory === "Medical") {
      return (
        <>
          <TouchableOpacity style={styles.imageCard} onPress={() => openModal({
            image: require("../../assets/images/petvax.png"),
            title: "Pet Vaccination",
            description: "Essential vaccinations to keep your pet safe and healthy."
          })}>
            <Image
              source={require("../../assets/images/petvaccine.jpg")}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.imageTitle}>Pet Vaccination</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageCard} onPress={() => openModal({
            image: require("../../assets/images/medical1.png"),
            title: "Regular Check-ups",
            description: "Importance of regular vet check-ups for your pet's health."
          })}>
            <Image
              source={require("../../assets/images/petvaccine.jpg")}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.imageTitle}>Regular Check-ups</Text>
            <Text style={styles.imageDescription}>
              Importance of regular vet check-ups for your pet's health.
            </Text>
          </TouchableOpacity>
        </>
      );
    }
    // Add other categories with their respective content here.
    return <Text style={styles.noContent}>No content available for this category.</Text>;
  };

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
            <View style={styles.buttonsContainer}>
              {["Blog", "Training 101", "Medical", "Article"].map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.button,
                    selectedCategory === category && styles.selectedButton,
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text style={[styles.buttonText, { fontFamily: 'Poppins-Regular' }]}>{category}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.content}>
              <Text style={[styles.title, { fontFamily: 'Poppins-Bold' }]}>Pet Education</Text>
              <Text style={[styles.description, { fontFamily: 'Poppins-Regular' }]}>
                Welcome! Here you'll find informative videos to help you become a better pet owner.
              </Text>
              {renderContent()}
            </View>
          </View>
        )}
      />

      {selectedImageData && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ScrollView>
                <Image source={selectedImageData.image} style={styles.modalImage} resizeMode="cover" />
                <Text style={[styles.modalTitle, { fontFamily: 'Poppins-Bold' }]}>{selectedImageData.title}</Text>
                <Text style={[styles.modalDescription, { fontFamily: 'Poppins-Regular' }]}>{selectedImageData.description}</Text>
              </ScrollView>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={[styles.closeButtonText, { fontFamily: 'Poppins-Bold' }]}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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
    backgroundColor: "darkmagenta",
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
    color: "darkmagenta",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 16,
  },
  noContent: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
  imageCard: {
    marginBottom: 16,
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
  },
  imageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    padding: 8,
  },
  imageDescription: {
    fontSize: 14,
    color: "#bbb",
    padding: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 20,
  },
  modalImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 16,
    color: "#bbb",
    marginBottom: 16,
    textAlign: "center",
  },
  closeButton: {
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "darkmagenta",
    borderRadius: 20,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Home;
