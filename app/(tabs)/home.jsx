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
    return null; 
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
              description: "Importance of Pet Vaccination: Protection from Diseases: Vaccinations stimulate the immune system to produce antibodies that fight off specific diseases. By vaccinating your pet, you can help prevent diseases such as canine distemper, parvovirus, rabies, feline panleukopenia, and respiratory infections in cats. Public Health: Some pet diseases, such as rabies, can also be transmitted to humans. Vaccinating your pets not only protects them but also helps prevent the spread of diseases to people. Community Immunity: Vaccinating your pet contributes to community immunity, also known as herd immunity. When a large portion of the pet population is vaccinated, it helps control the spread of diseases, protecting even those pets who cannot receive vaccinations due to medical reasons."
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
              description: "Regular veterinary check-ups are crucial to detect and prevent health issues early. Ensure your pet visits the vet at least once a year for a comprehensive health check."
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
            <TouchableOpacity style={styles.card} onPress={() => openModal({
              image: require("../../assets/images/petvaccine.jpg"),
              title: "Pet Dental Care",
              description: "Pet dental care is often overlooked but is essential for your pet's overall health. Just like humans, pets need regular dental care to prevent dental diseases such as periodontal disease, tooth decay, and gum infections. Regular brushing of your pet's teeth, providing dental treats, and ensuring your pet has professional cleanings can significantly reduce the risk of dental problems. Dental diseases in pets can lead to pain, difficulty eating, and even more severe health issues if left untreated. Consult your veterinarian for advice on the best dental care practices for your pet and schedule regular dental check-ups."
            })}>
              <Image
                source={require("../../assets/images/petvaccine.jpg")}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.overlay}>
                <Text style={styles.cardTitle}>Pet Dental Care</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => openModal({
              image: require("../../assets/images/petvaccine.jpg"),
              title: "Recognizing Common Pet Illnesses",
              description: "Recognizing the signs of common pet illnesses early can help ensure timely treatment and prevent more serious health issues. Some common illnesses in pets include:\n-Respiratory Infections: Symptoms include coughing, sneezing, nasal discharge, and difficulty breathing. These can be caused by viruses, bacteria, or other pathogens.\n-Gastrointestinal Issues: Look for symptoms such as vomiting, diarrhea, loss of appetite, and weight loss. Causes can range from dietary indiscretion to infections and chronic conditions.\n-Skin Problems: Itching, redness, hair loss, and sores can indicate allergies, parasites, infections, or other skin conditions.\n-Ear Infections: Common signs include head shaking, ear scratching, discharge, and an unpleasant odor from the ears.\n-Urinary Tract Issues: Symptoms include frequent urination, straining, blood in the urine, and accidents in the house.\nIf you notice any of these symptoms, consult your veterinarian promptly for diagnosis and treatment. Early intervention can improve the prognosis and quality of life for your pet."
            })}>
              <Image
                source={require("../../assets/images/petvaccine.jpg")}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.overlay}>
                <Text style={styles.cardTitle}>Recognizing Common Pet Illnesses</Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      );
    } else if (selectedCategory === "Blog") {
      return (
        <>
          <TouchableOpacity style={styles.blogCard} onPress={() => openModal({
            title: "Understanding Cat",
            description: "Cats exhibit a variety of behaviors that can be puzzling to their owners. Here are some common cat behaviors and their meanings: 1. Purring: Often a sign of contentment, but can also indicate pain or distress. 2. Kneading: A comforting behavior. 3. Scratching: Marking territory and maintaining claw health. 4. Hiding: Seeking safety or comfort. 5. Chattering: Excitement or frustration. 6. Slow blinking: A sign of trust and affection."
          })}>
            <Text style={styles.blogTitle}>Understanding Cat Behavior</Text>
            <Text style={styles.blogDesciption}>Posted on: April 20, 2024</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blogCard} onPress={() => openModal({
            title: "HEALTHY PET DIETS",
            description: "A balanced diet is essential for your pet's health. Just like humans, pets require a mix of proteins, fats, carbohydrates, vitamins, and minerals to thrive. \n Here are some key points to consider when planning your pet's diet:\n-High-Quality Proteins:\nEnsure that the primary ingredient in your pet's food is a high-quality protein source such as chicken, beef, or fish. Protein is crucial for muscle development and overall health.\n-Balanced Nutrients:\n A good pet diet should include a balanced mix of fats and carbohydrates to provide energy, along with essential vitamins and minerals for overall well-being.\n-Avoiding Fillers:\n Avoid pet foods that contain excessive fillers such as corn, wheat, and soy, which offer little nutritional value.\n-Tailored Diets:\n Consider your pet's age, size, breed, and health conditions when choosing their diet. Puppies, adult dogs, senior dogs, and pets with specific health issues may require specialized diets.\n-Hydration:\n Always provide fresh, clean water for your pet. Proper hydration is vital for their health.\nConsult your veterinarian for recommendations on the best diet for your pet, and consider any special dietary needs they may have."
          })}>
            <Text style={styles.blogTitle}>Healthy Pet Diets</Text>
            <Text style={styles.blogDesciption}>Posted on: May 12, 2024</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blogCard} onPress={() => openModal({
            title: "HERE ARE THE TIPS FOR YOUR PETS",
            description: "Regular exercise is vital for your pet's physical and mental well-being. Here are some tips to ensure your pet gets the exercise they need:\n-Daily Walks: For dogs, daily walks are essential. They provide physical exercise and mental stimulation as your dog explores their environment.\n-Interactive Play: Engage in interactive play with your pet using toys like balls, frisbees, and tug ropes. This helps to strengthen your bond and keep them active.\n-Training Sessions: Incorporate training sessions into playtime. Teaching new commands and tricks can be mentally stimulating and physically engaging for your pet.\n-Puzzle Toys: Use puzzle toys and treat dispensers to challenge your pet's mind and keep them occupied.\n- Socialization: Arrange playdates with other pets. Social interaction can be an excellent way for your pet to burn off energy.\n-Safe Environment: Ensure that your pet exercises in a safe and secure environment to prevent injuries.\nAlways tailor the exercise routine to your pet's age, breed, and health condition. Consult your veterinarian if you're unsure about the appropriate level of exercise for your pet."
          })}>
            <Text style={styles.blogTitle}>Exercise Tips for Pets</Text>
            <Text style={styles.blogDesciption}>Posted on: June 1, 2024</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blogCard} onPress={() => openModal({
            title: "HERE ARE FIVE BENEFITS OF A RAW FOOD DIET FOR DOGS:",
            description: "Cats exhibit a variety of behaviors that can be puzzling to their owners. Here are some common cat behaviors and their meanings: 1. Purring: Often a sign of contentment, but can also indicate pain or distress. 2. Kneading: A comforting behavior. 3. Scratching: Marking territory and maintaining claw health. 4. Hiding: Seeking safety or comfort. 5. Chattering: Excitement or frustration. 6. Slow blinking: A sign of trust and affection."
          })}>
            <Text style={styles.blogTitle}>5 Benefits of a Raw Food Diet for Dogs</Text>
            <Text style={styles.blogDesciption}>Posted on: May 13, 2024</Text>
          </TouchableOpacity>
        </>
      );
    } else if (selectedCategory === "Article") {
      return (
        <>
          <TouchableOpacity style={styles.articleCard} onPress={() => openModal({
            title: "5 Essential Tips for New Pet Owners",
            description: "Bringing a new pet into your home is an exciting time, but it also comes with a lot of responsibility. Here are 5 essential tips for new pet owners:\n1. Research the Breed: Before getting a pet, research different breeds to find one that matches your lifestyle and living situation.\n2. Prepare Your Home: Pet-proof your home by removing hazards and providing necessary supplies such as food, water, bedding, and toys.\n3. Establish Routine: Pets thrive on routine, so establish a consistent schedule for feeding, walking, and playtime.\n4. Socialize and Train: Proper socialization and training are essential for a well-behaved pet. Start socializing and training your pet from a young age to prevent behavioral issues.\n5. Regular Veterinary Care: Schedule regular check-ups with a veterinarian to keep your pet healthy and up-to-date on vaccinations.\nBy following these tips, you can provide a happy and healthy life for your new furry friend."
          })}>
            <Text style={styles.articleTitle}>5 Important Tips for New Pet Owners</Text>
            <Text style={styles.articleDesciption}>Reviwed on: June 2, 2024</Text>
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
    fontSize: 14,
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
  },
  card: {
    width: '48%',
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: "#FFFFFF",
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: "#FFFFFF",
    textAlign: 'center',
    padding: 10,
  },
  blogCard: {
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
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
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
  },
  modalImage: {
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 16,
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
});

export default Home;
