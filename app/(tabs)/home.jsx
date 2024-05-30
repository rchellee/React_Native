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
          <View style={styles.gridContainer}>
            <TouchableOpacity style={styles.card} onPress={() => openModal({
              title: "Pet Vaccination",
              description: "Importance of Pet Vaccination: Protection from Diseases: Vaccinations stimulate the immune system to produce antibodies that fight off specific diseases. By vaccinating your pet, you can help prevent diseases such as canine distemper, parvovirus, rabies, feline panleukopenia, and respiratory infections in cats. Public Health: Some pet diseases, such as rabies, can also be transmitted to humans. Vaccinating your pets not only protects them but also helps prevent the spread of diseases to people. Community Immunity: Vaccinating your pet contributes to community immunity, also known as herd immunity. When a large portion of the pet population is vaccinated, it helps control the spread of diseases, protecting even those pets who cannot receive vaccinations due to medical reasons"
            })}>
              <Image
                source={require("../../assets/images/petvaccine.jpg")}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.overlay}>
                <Text style={styles.cardTitle}>Pet Vaccination</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => openModal({
              image: require("../../assets/images/medical1.png"),
              title: "Regular Check-ups",
            })}>
              <Image
                source={require("../../assets/images/petvaccine.jpg")}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.overlay}>
                <Text style={styles.cardTitle}>Regular Check-ups</Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      );
    } else if (selectedCategory === "Article") {
      return (
        <>
          <TouchableOpacity style={styles.articleCard} onPress={() => openModal({
          image: require("../../assets/images/article1.png"),
          description: "If your cat or dog is coughing, the good news is that it’s probably not due to COVID-19. Experts from the U.S. Centers for Disease Control and Prevention (CDC) and the World Organization for Animal Health (OIE) agree that COVID-19 is predominantly a human illness, and it’s unlikely for pets to be infected with the coronavirus that causes COVID-19. There are many types of viruses that can make cats or dogs sick. So, your veterinarian will check your pet to make sure that the symptoms aren’t being caused by a more common virus or other health problem. If your cat or dog is sick, the best thing to do is speak with your veterinarian. Be sure to let them know if your pet has been exposed to anyone who has COVID-19. Your veterinarian will let you know what to do and will work with public health authorities to determine if a test is recommended."
        })}>
          <Text style={styles.articleTitle}>Should my pet be tested for COVID-19?</Text>
          <Text style={styles.articleDesciption}>Reviewed on: Friday, April 17, 2020</Text>
        </TouchableOpacity>
        </>
      );
    } else if (selectedCategory === "Blog") {
      return (
        <>
          <TouchableOpacity style={styles.articleCard} onPress={() => openModal({
            title: "How to Choose the Right Pet for Your Family",
            description: "Choosing the right pet for your family is an important decision. It depends on various factors such as the pet's temperament, the amount of space you have, and the time you can dedicate to a pet. Research different types of pets and consider your family's lifestyle before making a decision."
          })}>
            <Text style={styles.articleTitle}>How to Choose the Right Pet for Your Family</Text>
            <Text style={styles.articleDesciption}>Posted on: January 15, 2024</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.articleCard} onPress={() => openModal({
            title: "The Benefits of Adopting a Shelter Pet",
            description: "Adopting a pet from a shelter can be one of the most rewarding experiences. Shelter pets are often loving and grateful to have a second chance at a happy life. Plus, by adopting, you're helping to reduce the overpopulation of pets and giving an animal a loving home."
          })}>
            <Text style={styles.articleTitle}>The Benefits of Adopting a Shelter Pet</Text>
            <Text style={styles.articleDesciption}>Posted on: February 10, 2024</Text>
          </TouchableOpacity>
        </>
      );
    }
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
                Welcome! Here you'll find informative content to help you become a better pet owner.
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
                {selectedImageData.image && (
                  <Image source={selectedImageData.image} style={styles.modalImage} resizeMode="cover" />
                )}
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
    fontSize: 16,
    color: "white",
    marginBottom: 16,
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
  },
  card: {
    width: "48%",
    backgroundColor: "#444",
    borderRadius: 10,
    marginBottom: 16,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImage: {
    width: "100%",
    height: 150,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  cardDescription: {
    fontSize: 12,
    color: "#bbb",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#161622",
    borderRadius: 5,
    padding: 20,
  },
  modalImage: {
    width: "100%",
    height: 200,
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
    textAlign: "justify",
  },
  closeButton: {
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "orange",
    borderRadius: 20,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  articleCard: {
    backgroundColor: 'orange',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 2,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  articleDesciption: {
    fontSize: 14,
    color: '#fff',
  },
});

export default Home;

