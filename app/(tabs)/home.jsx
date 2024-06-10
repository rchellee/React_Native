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
                source={require("../../assets/images/med.jpg")}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.overlay}>
                <Text style={styles.cardTitle}>Regular Check-ups</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => openModal({
              image: require("../../assets/images/blog.jpg"),
              title: "Behavioral Health",
              description: "Signs of Behavioral Issues:\nChanges in behavior, such as sudden aggression towards people or other animals, excessive anxiety, or destructive behavior like chewing furniture or excessive barking, can be indicators of underlying behavioral issues. These changes may arise due to various factors, including fear, stress, medical conditions, or changes in the pet's environment.\n \nBehavioral Assessments:\nVeterinarians are trained to conduct thorough assessments to understand the underlying causes of behavioral issues in pets. This process involves gathering information about the pet's history, observing their behavior in different contexts, and possibly conducting specific tests to rule out medical conditions that could be contributing to the behavior. Through these assessments, veterinarians can identify triggers and determine the best course of action for addressing the behavior.\n \nConsultation and Training:\nSeeking guidance from professional trainers and behaviorists can be immensely beneficial in addressing behavioral issues and improving the relationship between pets and their owners. These experts have the knowledge and experience to assess the pet's behavior, develop personalized training plans, and teach owners effective techniques for managing and modifying undesirable behaviors. Additionally, they can provide support and encouragement throughout the training process, helping pet owners understand their pet's needs and strengthen their bond through positive reinforcement and communication."
            })}>
              <Image
                source={require("../../assets/images/blog.jpg")}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.overlay}>
                <Text style={styles.cardTitle}>Behavioral Health</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => openModal({
              image: require("../../assets/images/ill2.jpg"),
              title: "Recognizing Common Pet Illnesses",
              description: "Recognizing the signs of common pet illnesses early can help ensure timely treatment and prevent more serious health issues. Some common illnesses in pets include:\n-Respiratory Infections: Symptoms include coughing, sneezing, nasal discharge, and difficulty breathing. These can be caused by viruses, bacteria, or other pathogens.\n-Gastrointestinal Issues: Look for symptoms such as vomiting, diarrhea, loss of appetite, and weight loss. Causes can range from dietary indiscretion to infections and chronic conditions.\n-Skin Problems: Itching, redness, hair loss, and sores can indicate allergies, parasites, infections, or other skin conditions.\n-Ear Infections: Common signs include head shaking, ear scratching, discharge, and an unpleasant odor from the ears.\n-Urinary Tract Issues: Symptoms include frequent urination, straining, blood in the urine, and accidents in the house.\nIf you notice any of these symptoms, consult your veterinarian promptly for diagnosis and treatment. Early intervention can improve the prognosis and quality of life for your pet."
            })}>
              <Image
                source={require("../../assets/images/med2.jpg")}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.overlay}>
                <Text style={styles.cardTitle}>Pet Dental Care</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => openModal({
              image: require("../../assets/images/nutri2.jpg"),
              title: "Nutrition and Weight Monitoring",
              description: "Proper Nutrition:\nJust like humans, pets require a balanced diet to maintain optimal health and longevity. A balanced diet should provide all the essential nutrients, including proteins, carbohydrates, fats, vitamins, and minerals, in the right proportions. The specific dietary requirements vary depending on factors such as the pet's age, breed, activity level, and any underlying health conditions. For example, puppies, adult dogs, and senior dogs have different nutritional needs. Likewise, specific breeds may have unique dietary considerations. Providing a balanced diet tailored to your pet's individual needs ensures they receive the necessary nutrients to thrive and maintain a healthy lifestyle.\n \nNutritional Counseling:\nVeterinarians play a vital role in providing nutritional counseling and guidance to pet owners. They can assess your pet's individual needs, evaluate their current diet, and make recommendations for appropriate diets and feeding strategies. Nutritional counseling may include selecting commercial pet foods that meet specific dietary requirements, recommending prescription diets for pets with medical conditions, or providing guidance on homemade diets. Veterinarians can also offer advice on feeding schedules, portion sizes, and treats to ensure your pet's nutritional needs are met and their weight is managed effectively.\n \nWeight Monitoring:\nRegular weight monitoring is an essential part of pet health care and should be incorporated into routine veterinary check-ups. Veterinarians will assess your pet's body condition score and monitor changes in weight over time. This allows for early detection of any fluctuations or trends that may indicate a need for adjustments to the pet's diet or exercise regimen. By tracking your pet's weight consistently, you can ensure they maintain a healthy body condition and address any weight-related concerns promptly.\n \nProper nutrition and weight management are crucial aspects of pet care that contribute to their overall health, well-being, and longevity. By providing a balanced diet, managing your pet's weight effectively, seeking nutritional counseling from veterinarians, and monitoring their weight regularly, you can help your pet lead a happy, healthy life."
            })}>
              <Image
                source={require("../../assets/images/nutri.jpg")}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.overlay}>
                <Text style={styles.cardTitle}>Nutrition and Weight Care</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => openModal({
              image: require("../../assets/images/senior1.jpg"),
              title: "",
              description: ""
            })}>
              <Image
                source={require("../../assets/images/senior2.jpg")}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.overlay}>
                <Text style={styles.cardTitle}>Senior Pet Check-ups:</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => openModal({
              image: require("../../assets/images/pet2.jpg"),
                title: "",
                 description: ""
            })}>
              <Image
                source={require("../../assets/images/par1.jpg")}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.overlay}>
                <Text style={styles.cardTitle}>Cardiology Treatment:</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => openModal({
              image: require("../../assets/images/cardio2.jpg"),
              title: "Recognizing Common Pet Illnesses",
              description: "Recognizing the signs of common pet illnesses early can help ensure timely treatment and prevent more serious health issues. Some common illnesses in pets include:\n-Respiratory Infections: Symptoms include coughing, sneezing, nasal discharge, and difficulty breathing. These can be caused by viruses, bacteria, or other pathogens.\n-Gastrointestinal Issues: Look for symptoms such as vomiting, diarrhea, loss of appetite, and weight loss. Causes can range from dietary indiscretion to infections and chronic conditions.\n-Skin Problems: Itching, redness, hair loss, and sores can indicate allergies, parasites, infections, or other skin conditions.\n-Ear Infections: Common signs include head shaking, ear scratching, discharge, and an unpleasant odor from the ears.\n-Urinary Tract Issues: Symptoms include frequent urination, straining, blood in the urine, and accidents in the house.\nIf you notice any of these symptoms, consult your veterinarian promptly for diagnosis and treatment. Early intervention can improve the prognosis and quality of life for your pet."
            })}>
              <Image
                source={require("../../assets/images/cardio.jpg")}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.overlay}>
                <Text style={styles.cardTitle}>Recognizing Common Pet Illnesses</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => openModal({
              image: require("../../assets/images/para2.jpg"),
              title: "Prevention for parasites for babies",
              description: "Effective parasite control is essential for preventing diseases and maintaining your pet’s comfort and health. This includes:\n \n1. Fleas: \nSmall, wingless insects that can cause itching, allergic reactions, and transmit diseases. Flea control involves regular use of topical or oral medications and maintaining a clean environment.\n \nPrevention and Treatment:\n \nTopical Medications\n - These are applied directly to the pet’s skin, usually between the shoulder blades, and can provide month-long protection. Examples include Frontline and Advantage.\nOral Medication2.\n - These are given as chewable tablets or pills and can kill fleas within hours. Examples include Comfortis and NexGard.\n \n Ticks:\nParasites that attach to your pet to feed on blood, potentially transmitting serious diseases such as Lyme disease, Ehrlichiosis, and Anaplasmosis. Tick prevention includes the use of spot-on treatments, tick collars, and regular tick checks.\n \nPrevention and Treatmnt\n \nRegular Cleaningn\n - Vacuum carpets, rugs, and furniture frequently to remove flea eggs and larvae.\n - Wash Bedding\n - Regularly wash pet bedding and blankets in hot water to kill any fleas and their eggs.\n \n3. Worms:\n Intestinal parasites like roundworms, hookworms, tapeworms, and heartworms can cause significant health issues. Deworming medications are essential, and heartworm prevention is particularly critical for dogs, involving monthly tablets or injections.\n \nPrevntion and Treatmen\n \nDeworming Medication\n - Puppies and Kittens: Deworming should start at 2-3 weeks of age and continue every 2-3 weeks until they are 12 weeks old.\n - Adults: Regular deworming every three months or as recommended by a veterinarian\n - Monthly Tablets: Medications like Heartgard and Interceptor can prevent heartworm infections.\n - Injections: ProHeart is an injectable that can protect dogs from heartworms for six to twelve months. "
            })}>
              <Image
                source={require("../../assets/images/para1.jpg")}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.overlay}>
                <Text style={styles.cardTitle}>Parasite Control</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => openModal({
              image: require("../../assets/images/anx2.jpg"),
              title: "Prevention for parasites for babies",
              description: "Effective parasite control is essential for preventing diseases and maintaining your pet’s comfort and health. This includes:\n \n1. Fleas: \nSmall, wingless insects that can cause itching, allergic reactions, and transmit diseases. Flea control involves regular use of topical or oral medications and maintaining a clean environment.\n \nPrevention and Treatment:\n \nTopical Medications\n - These are applied directly to the pet’s skin, usually between the shoulder blades, and can provide month-long protection. Examples include Frontline and Advantage.\nOral Medication2.\n - These are given as chewable tablets or pills and can kill fleas within hours. Examples include Comfortis and NexGard.\n \n Ticks:\nParasites that attach to your pet to feed on blood, potentially transmitting serious diseases such as Lyme disease, Ehrlichiosis, and Anaplasmosis. Tick prevention includes the use of spot-on treatments, tick collars, and regular tick checks.\n \nPrevention and Treatmnt\n \nRegular Cleaningn\n - Vacuum carpets, rugs, and furniture frequently to remove flea eggs and larvae.\n - Wash Bedding\n - Regularly wash pet bedding and blankets in hot water to kill any fleas and their eggs.\n \n3. Worms:\n Intestinal parasites like roundworms, hookworms, tapeworms, and heartworms can cause significant health issues. Deworming medications are essential, and heartworm prevention is particularly critical for dogs, involving monthly tablets or injections.\n \nPrevntion and Treatmen\n \nDeworming Medication\n - Puppies and Kittens: Deworming should start at 2-3 weeks of age and continue every 2-3 weeks until they are 12 weeks old.\n - Adults: Regular deworming every three months or as recommended by a veterinarian\n - Monthly Tablets: Medications like Heartgard and Interceptor can prevent heartworm infections.\n - Injections: ProHeart is an injectable that can protect dogs from heartworms for six to twelve months. "
            })}>
              <Image
                source={require("../../assets/images/anx1.jpg")}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.overlay}>
                <Text style={styles.cardTitle}>Anti-Anxiety and Behavioral Medications:</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => openModal({
              image: require("../../assets/images/all1.jpg"),
              title: "Prevention for parasites for babies",
              description: "Effective parasite control is essential for preventing diseases and maintaining your pet’s comfort and health. This includes:\n \n1. Fleas: \nSmall, wingless insects that can cause itching, allergic reactions, and transmit diseases. Flea control involves regular use of topical or oral medications and maintaining a clean environment.\n \nPrevention and Treatment:\n \nTopical Medications\n - These are applied directly to the pet’s skin, usually between the shoulder blades, and can provide month-long protection. Examples include Frontline and Advantage.\nOral Medication2.\n - These are given as chewable tablets or pills and can kill fleas within hours. Examples include Comfortis and NexGard.\n \n Ticks:\nParasites that attach to your pet to feed on blood, potentially transmitting serious diseases such as Lyme disease, Ehrlichiosis, and Anaplasmosis. Tick prevention includes the use of spot-on treatments, tick collars, and regular tick checks.\n \nPrevention and Treatmnt\n \nRegular Cleaningn\n - Vacuum carpets, rugs, and furniture frequently to remove flea eggs and larvae.\n - Wash Bedding\n - Regularly wash pet bedding and blankets in hot water to kill any fleas and their eggs.\n \n3. Worms:\n Intestinal parasites like roundworms, hookworms, tapeworms, and heartworms can cause significant health issues. Deworming medications are essential, and heartworm prevention is particularly critical for dogs, involving monthly tablets or injections.\n \nPrevntion and Treatmen\n \nDeworming Medication\n - Puppies and Kittens: Deworming should start at 2-3 weeks of age and continue every 2-3 weeks until they are 12 weeks old.\n - Adults: Regular deworming every three months or as recommended by a veterinarian\n - Monthly Tablets: Medications like Heartgard and Interceptor can prevent heartworm infections.\n - Injections: ProHeart is an injectable that can protect dogs from heartworms for six to twelve months. "
            })}>
              <Image
                source={require("../../assets/images/all3.jpg")}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.overlay}>
                <Text style={styles.cardTitle}>Allergy Medications:</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => openModal({
              image: require("../../assets/images/fungal2.jpg"),
              title: "Prevention for parasites for babies",
              description: "Effective parasite control is essential for preventing diseases and maintaining your pet’s comfort and health. This includes:\n \n1. Fleas: \nSmall, wingless insects that can cause itching, allergic reactions, and transmit diseases. Flea control involves regular use of topical or oral medications and maintaining a clean environment.\n \nPrevention and Treatment:\n \nTopical Medications\n - These are applied directly to the pet’s skin, usually between the shoulder blades, and can provide month-long protection. Examples include Frontline and Advantage.\nOral Medication2.\n - These are given as chewable tablets or pills and can kill fleas within hours. Examples include Comfortis and NexGard.\n \n Ticks:\nParasites that attach to your pet to feed on blood, potentially transmitting serious diseases such as Lyme disease, Ehrlichiosis, and Anaplasmosis. Tick prevention includes the use of spot-on treatments, tick collars, and regular tick checks.\n \nPrevention and Treatmnt\n \nRegular Cleaningn\n - Vacuum carpets, rugs, and furniture frequently to remove flea eggs and larvae.\n - Wash Bedding\n - Regularly wash pet bedding and blankets in hot water to kill any fleas and their eggs.\n \n3. Worms:\n Intestinal parasites like roundworms, hookworms, tapeworms, and heartworms can cause significant health issues. Deworming medications are essential, and heartworm prevention is particularly critical for dogs, involving monthly tablets or injections.\n \nPrevntion and Treatmen\n \nDeworming Medication\n - Puppies and Kittens: Deworming should start at 2-3 weeks of age and continue every 2-3 weeks until they are 12 weeks old.\n - Adults: Regular deworming every three months or as recommended by a veterinarian\n - Monthly Tablets: Medications like Heartgard and Interceptor can prevent heartworm infections.\n - Injections: ProHeart is an injectable that can protect dogs from heartworms for six to twelve months. "
            })}>
              <Image
                source={require("../../assets/images/fungal1.jpg")}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.overlay}>
                <Text style={styles.cardTitle}>Anti-Fungal:</Text>
              </View>
            </TouchableOpacity>
            </View>
        </>
      );
    } else if (selectedCategory === "Blog") {
      return (
        <>
          <TouchableOpacity style={styles.blogCard} onPress={() => openModal({
            title: "UNDERSTANDING CAT",
            description: "Cats exhibit a variety of behaviors that can be puzzling to their owners. Here are some common cat behaviors and their meanings:\n 1. Purring: Often a sign of contentment, but can also indicate pain or distress.\n 2. Kneading: A comforting behavior. \n3. Scratching: Marking territory and maintaining claw health. \n4. Hiding: Seeking safety or comfort. \n5. Chattering: Excitement or frustration. \n6. Slow blinking: A sign of trust and affection."
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
            title: "MEOWS",
            description: "Kittens have plenty of unique meows and chirps to tell their moms exactly what they need, but wild adult cats typically stop meowing as they grow up and use body language for most of their communication. Domestic cats, however, keep meowing so that we can keep up with their conversation. (Maybe our cats learned to talk back after listening to us tell them about work drama for the hundredth time…) Since meows are a sound cats make for humans, they’re typically a sign that cats want our attention—like when they want snacks or their favorite toy that’s stuck under the couch. If the meows are longer and more plaintive, they might be complaining about something painful—or just saying they stepped in water and their paw is wet. And of course, a meow can be a friendly greeting saying “Hey! You’re finally home!” You might also notice that older cats crank the volume up to 11 on their meows—a side effect of their fading hearing."
          })}>
            <Text style={styles.blogTitle}>Understanding All Your Cat’s Meows and Sounds</Text>
            <Text style={styles.blogDesciption}>Posted on: May 7, 2024</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blogCard} onPress={() => openModal({
            description: "When it comes to feeding your cat, there are two basic food options: dry food and wet food. Which one you serve your cat is most likely up to your cat, since they are picky eaters and will choose the one that they want. There are plenty of reasons why you may need your cat to eat dry food. Fortunately, it is possible to make a wet food out of your cat’s dry food if the need arises. To transition your cat to wet food, soaking cats' dry food is a common method. To do this, add one part water to three or four parts food and let the food soak in it. You may need to add more water as it is absorbed to reach the right consistency for your cat, depending on what they like. This method is particularly useful for kitten dry food, as younger cats might find softer food easier to eat. To make the process go faster, you can use a food processor to blend the water with the food. Heads up! This will make a smoother mixture which your cat may enjoy. While using a food processor can create a smooth mixture, remember that most cats prefer soft cat food with a thicker consistency and some chunks, similar to commercial wet foods"
          })}>
            <Text style={styles.blogTitle}>How to Soften Dry Cat Food Into Wet Cat Food</Text>
            <Text style={styles.blogDesciption}>Posted on: January 19, 2024</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blogCard} onPress={() => openModal({
            description: "This post is written by holistic veterinarian Dr. Angie Krause, DVM, CVA, CCRT. \nThere are many campaigns that discourage people from feeding their dogs kibble, and I get it. Ideally we would all (pets included) eat a diet of whole foods without packaged or processed components. For both people and dogs, this can be unrealistic depending on lifestyle and budget. While I would love to see every single one of my patients on a home prepared, fresh whole foods diet, there are so many reasons why a small percentage of my practice eat this way. These reasons include cost, lack of time resources, food allergies and digestive issues. If you are feeding your dog kibble, it’s ok. It really is. We are all doing the best we can. If you want to take your pup’s nutrition to the next level, but you are feeling some level of limitation, I’ve got good news. There are a lot of easy and fun ways to add fresh whole foods to their diet, while not breaking the bank or quitting your day job."
          })}>
            <Text style={styles.blogTitle}>Why Should I Feed My Dog More Than Kibble: A Healthy Dog Diet</Text>
            <Text style={styles.blogDesciption}>Posted on: May 13, 2024</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blogCard} onPress={() => openModal({
            title: "Get Your Pet Comfortable in the Car",
            description: "1.) Give Them Their Own Seat:\nEvery pet has their favorite spots to hang out in the house, and the same rule applies to your car! They’ll be happier and more secure with their own zone, so set up a blanket, dog or cat bed, crate, or specialized dog car seat just for them.\n2.) Bring the Essentials and their Favorites:\nThink through all the things your dog needs in a day and make sure they get packed into one of your bags. That includes basics like food, water, leashes, and poop bags, just-in-case items like dog tags and vaccination records, and the items which make your best friend happy.\n3.) Keep a Regular Schedule:\nRegularity might sound like a tall order when you’re driving cross country, but it’s the little things that matter most.\n4.)Pick Pet-Friendly Destinations:\nAs much as we wish we could bring our dogs everywhere, not every travel destination matches our enthusiasm. Doing your research while you’re still in the trip planning phase will save you a major headache when you arrive at the state park only to discover that dogs are banned almost everywhere. "
          })}>
            <Text style={styles.blogTitle}>Tips & Tricks for the Best Road Trip with Your Pet</Text>
            <Text style={styles.blogDesciption}>Posted on: June 6, 2024</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blogCard} onPress={() => openModal({
            title: "Environmental Enrichment",
            description: "Adding new cat toys into your home for your cat to discover instantly adds excitement to their day! Offering a variety of toys, from lasers to ribbons to toy mice, simulates having a variety of prey to hunt in the wild.\nHere are some ideas to make your fur baby even happier:\n1. Cat Furniture\n2. Scratching Posts\n3. Take them outside\n4. Play with people\n5. Animal Playmates"
          })}>
            <Text style={styles.blogTitle}>Cat Enrichment Ideas to Keep Your Indoor Cat Happy </Text>
            <Text style={styles.blogDesciption}>Posted on: June 4, 2024</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blogCard} onPress={() => openModal({
            title: "What are by-products and what is by-product meal?",
            description: "By-products in pet food are non-human-edible animal parts, while by-product meal is the dried and ground version, both providing a potent protein source for pet diets. Chicken by product meal in cat food are concentrated, ingredients used in pet food formulations for their high protein content and essential nutrients, as well as their super cheap cost for producers."
          })}>
            <Text style={styles.blogTitle}>What is Chicken By-Product Meal in Dog & Cat Food?</Text>
            <Text style={styles.blogDesciption}>Posted on: January 23, 2024</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blogCard} onPress={() => openModal({
            title: "What are by-products and what is by-product meal?",
            description: "Unlike dogs, cats usually do not eat their food in its entirety as soon as you give it to them. Because of this, cat food often sits out during the day. The largest risk of leaving cat food out is the food spoiling. While fungi or mold takes days to grow and multiply, bacteria are much faster."         
            })}>
            <Text style={styles.blogTitle}>How Long Can You Safely Leave Cat Food Out For?</Text>
            <Text style={styles.blogDesciption}>Posted on: December 29, 2023</Text>
          </TouchableOpacity>
          
        </>
      );
    } else if (selectedCategory === "Article") {
      return (
        <>
          <TouchableOpacity style={styles.articleCard} onPress={() => openModal({
            description: "What is Heartworm Disease?\nHeartworm disease is caused by the parasite Dirofilaria immitis, a type of roundworm that lives inside the heart and blood vessels of the lungs. Heartworm disease is transmitted by mosquitoes. It is a serious disease that primarily affects the heart and lungs but can also affect the liver, kidney, eye, and central nervous system, and if untreated, can cause death.\n \nSymptoms\nThe symptoms of heartworm disease are subtle and can be easy to miss. As the number of heartworms increases, the symptoms of coughing, lethargy, exercise intolerance, lack of appetite and weight loss become more apparent. However it is best not to wait until symptoms develop since irreversible damage may have already occurred by then.\n \nHow is it treated?\nThe goal of treatment is to kill the heartworms without harming the patient. Fortunately, the treatment options have improved but they still have potential risks. Infected animals usually receive a series of intramuscular injections, hospitalization and then strict confinement to limit exercise for weeks. The fact is, treatment is expensive, time consuming and not without risks. For these reasons the goal should always be prevention rather than treatment of this horrible disease.\n \nPrevention\nThe best way to treat heartworm disease is to prevent it in the first place. Fortunately, there are numerous safe and effective preventative medications available. Heartworm preventative medications are available from your veterinarian in many forms: oral, topical, and injectable. In addition to protecting your pets from heartworm disease, many of the heartworm preventatives also protect your pet against other internal parasites. This is important because it helps prevent the spread of parasites. So not only are you getting heartworm protection for your pet but also peace of mind that your pet has not picked up parasites like roundworms that can be transmitted to other pets and even humans. Finally, before starting preventative medications on pets over 6 months of age, have your veterinarian test them for heartworm infection because serious complications can develop if an infected animal is started on certain preventatives."
          })}>
            <Text style={styles.articleTitle}>What You Need To Know About Heartworm Disease</Text>
            <Text style={styles.articleDesciption}>Reviewed on: Thursday, June 18, 2015</Text>
            <Text style={styles.articleDesciption}>Posts by: Dr. Ruth MacPete, DVM</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.articleCard} onPress={() => openModal({
            description: "Did you know that cats can have a hyperactive thyroid gland? Also known as hyperthyroidism. It’s a fairly common condition in older cats. In fact, the vast majority of affected cats are older than 10 years of age. Most of the time, the reason is either a benign tumor or benign enlargement of the thyroid gland(s).\n \nWhat is hyperthyroidism?\nHyperthyroidism is when thyroid glands work overtime and produce too much thyroid hormone. Because this hormone controls many organs, it can lead to multiple consequences:\n1. Weight loss, despite an increase in appetite\n2. Vomiting and/or diarrhea\n3. Irritable or aggressive behavior/n4. Increased drinking and urination\n5. Increased heart rate6. A heart murmur\n7. Poor hair coat\n8. Increased activity\n  \nOccasionally, a chubby couch potato kitty with gorgeous hair may turn into a skinny old cat with a rough hair coat, running around the house like a maniac.\n \nHow is hyperthyroidism treated?\n \n1. Methimazole is a medication that fights hyperthyroidism. It is usually given by mouth, every single day. Methimazole can also be compounded into a cream which is applied to the skin or the ear daily (transdermal application).This is a life-long treatment.\n2. I know about at least one special diet that is very low in iodine, and was introduced a few years ago. If your veterinarian recommends this option, this is the only food your cat should eat for good results.\n3. Veterinary endocrinologists consider IV radioactive iodine treatment as the gold standard for hyperthyroidism.\n4. Surgery to remove the tumor is an option, although it is less and less common. It’s a delicate surgery but in good hands, it is highly successful."
          })}>
            <Text style={styles.articleTitle}>Thyroid Tumor Surgery in Cats</Text>
            <Text style={styles.articleDesciption}>Reviewed on: Monday, October 19, 2015</Text>
            <Text style={styles.articleDesciption}>Posts by: Dr. Peter Kintzer, DVM, DACVIM</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.articleCard} onPress={() => openModal({
            description: "Cat Diseases & Conditions A-Z/nPerhaps the most important thing to know about kidney disease in cats is that way too many cats are affected by it. In fact, studies show that 1 in 3 cats suffer from kidney disease, reports Dr. Celeste Clements. Cats can get kidney disease for any number of underlying reasons, and even worse, it’s difficult to spot. Most cats show no outward signs of kidney disease until the problem is very advanced. Even when they do, the first signals of kidney disease in cats are easy to miss, including subtle weight loss, urinating/peeing more often and drinking more water. Therefore, if you notice your cat is peeing on the floor, soaking the litter box, or if your cat is always thirsty, it’s time to visit your veterinarian.\n \nWhat is kidney disease in cats?\nKidney disease in cats is notoriously hard to catch early and can have devastating effects on our feline friends. In general, kidney disease (sometimes called “kidney failure”) happens when your cat’s kidneys stop doing their job as well as they should. (Learn more about what kidneys do for your cat.) This damage, once done, is usually permanent and can be caused by a variety of issues. (Learn more about 10 common causes of kidney disease in cats.)\n \nKidney disease in cats is classified in two primary ways, as:\n1. Chronic kidney disease in cats\n2. Acute kidney injury in cats\nKidney disease quick tips:\n1. Kidney disease is a leading cause of suffering and death in cats,3 and has been so difficult to combat because it was often not detected until most of the damage was done and permanent.\n2. Certain factors like kidney stones, urinary tract infections, or hereditary conditions could make kidney disease more likely.\n3. Encouraging your cat to drink more water can help with kidney health\n4. As cats age, the likelihood of developing kidney disease increases. In fact, more than half of cats over age 15 are afflicted."
          })}>
            <Text style={styles.articleTitle}>Kidney Disease in Cats: What Cat Owners Should Know</Text>
            <Text style={styles.articleDesciption}>Reviewed on: Tuesday, April 5, 2016 </Text>
            <Text style={styles.articleDesciption}>Posts by: Jason Carr, Former Pet Health Network Editor-in-Chief</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.articleCard} onPress={() => openModal({
            description: "Dog Diseases & Conditions A-Z\n \nKidney disease is very common in dogs, and protecting your pooch from kidney disease means you should be prepared to look for problems early. Studies show that 1 in 10 dogs suffer from kidney disease, reports Dr. Celeste Clements. Dogs can get kidney disease for any number of underlying reasons, and even worse, it’s often difficult to spot. Some of the earliest signs of kidney disease in dogs may include subtle weight loss, urinating/peeing more often and drinking a lot more water. Therefore, if you notice your dog is peeing on the floor or asking to go out more, or if your dog is always thirsty, it’s time to visit your veterinarian.\n \nWhat is kidney disease in dogs?\nKidney disease in dogs is notoriously hard to catch early and can have devastating effects on our canine friends. In general, kidney disease (sometimes called “kidney insufficiency or failure”) happens when your dog’s kidneys stop doing their job as well as they should.\n \n1. Chronic kidney disease in dogs\n2. Acute kidney injury in dogs\n \nKidney disease quick tips:\n1. Kidney disease is a leading cause of suffering and death in pets, and has been so difficult to combat because it was often not detected until most of the damage was done and permanent.\n2. Certain factors like kidney stones, urinary tract infections, or other infections, including Lyme disease, or hereditary conditions could make kidney disease more likely.\n2. Treatment options for advanced kidney disease are usually limited to supporting the kidneys and treating the signs of kidney disease as dialysis and kidney transplants are not readily available for dogs.\n3. Encouraging your dog to drink more water can help with kidney health\n4. As dogs age, the likelihood of developing kidney disease increases.\n \nThe IDEXX SDMA™ test is a maker of kidney function and can help identify decline in kidney function and disease months to years earlier than previously possible.[Editor’s Note: IDEXX Laboratories is the parent company of Pet Health Network.] This can allow your veterinarian to take early action to treat some causes of kidney damage, and better support kidney disease."
          })}>
            <Text style={styles.articleTitle}>Kidney Disease in Dogs: What Dog Owners Should Know</Text>
            <Text style={styles.articleDesciption}>Reviewed on: Wednesday, July 22, 2020 </Text>
            <Text style={styles.articleDesciption}>Posts by: Jason Carr, Former Pet Health Network Editor-in-Chief</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.articleCard} onPress={() => openModal({
            description: "Dog Diseases & Conditions A-Z\nDiabetes mellitus (DM) is a hormonal problem where the pancreas fails to produce enough insulin, the hormone that helps push sugar (“glucose”) into the body’s cells.\n \nWithout the insulin, the body’s cells are starving for sugar; unfortunately, this then stimulates the body to produce more and more sugar (in an attempt to feed the cells). That’s why your dog’s blood sugar is so high (what we call a “hyperglycemia”) with diabetes mellitus.\n \nWithout insulin, the sugar can’t get into the cells; hence, why you need to give insulin to your dog with a tiny syringe twice a day. In dogs, this is a disease that can be costly to treat and requires twice-a-day insulin along with frequent veterinary visits for the rest of your dog’s life\n \n1. Your dog will live longer\nDiabetes mellitus can shorten the lifespan of your dog, as secondary complications and infections can occur. With diabetes, the body is immunosuppressed and more likely to develop diabetic complications which cause long term harm to your dog..\n \n2. Your dog will be able to see.\nDid you know that the majority of dogs with diabetes eventually go blind from cataracts? Even in well-controlled diabetic dogs, the excess sugar in the body can have secondary effects on the lens of the eye; it causes more water to influx into the lens, which disrupts the clearness of the lens. As a result, cataract formation occurs, resulting in eventual blindness and secondary inflammation in both eyes. While cataract surgery can (and ideally, should) be performed, it can be costly.\n \n3. You’ll save a lot of money\nTreatment for diabetes mellitus includes twice-a-day insulin treatment, insulin syringes, prescription diets, and frequent veterinary trips for blood tests. Also, as diabetic dogs can’t go without their insulin, it may mean hiring house sitters or pet sitters to treat your pet while you are on vacation.\n \n4. You’ll have less urinary accidents in the house\nOne of the biggest signs of uncontrolled diabetes mellitus is excessive drinking, urination and having urinary accidents in the house. Because of the hyperglycemia, dogs are also at increased risk for urinary tract infections, wrecking havoc on your carpet. \n \n5. You’ll have more peace knowing that your dog is healthy\nAs a veterinarian and dog owner, I want to make sure my dog is as healthy as possible. Side-effects of chemo beads. Side-effects are rare and typically local. They occasionally include swelling, irritation and skin drainage.  Although IV cisplatin is deadly in cats, I have not observed or heard of general side-effects after bead placement."
          })}>
            <Text style={styles.articleTitle}>5 Reasons to Test Your Dog for Diabetes</Text>
            <Text style={styles.articleDesciption}>Reviewed on: Wednesday, September 23, 2015 </Text>
            <Text style={styles.articleDesciption}>Posts by: Dr. Justine A. Lee, DVM, DACVECC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.articleCard} onPress={() => openModal({
            description: "Cat Diseases & Conditions A-Z\n \nCat getting an exam by a veterinarian. Tiny beads are changing the way some veterinarians deal with cancer. These beads are effective, cheap and have few side-effects.\nAround 2008, I came across a new option to complement cancer surgery. Results have been impressive. Until then, chemotherapy and radiation therapy were the two main solutions offered after removal of cancerous tumors, just like in people. Both treatments may cause side-effects, and they can cost thousands of dollars.\n \nAbout chemo beads\n - Chemo beads cost a fraction of any other option. Veterinarians are now able to place tiny cisplatin-impregnated beads around the tumor site. Cisplatin is then slowly released from the beads, which are reabsorbed by the body over 4-6 weeks. Cisplatin is a common chemo drug, normally used with an IV in our canine cancer patients.\n \nThe limitations of the chemo beads\nAlthough cisplatin beads are often effective at preventing or slowing the cancer from coming back, they do not prevent spreading (metastasis), e.g. to the lungs. Fortunately, some of these tumors do not spread readily to begin with.\n \nWhen are the beads placed?\nThe best time to place the beads is at the time of surgery, when we know exactly where the tumor was and where cancer-free edges (margins) are questionable. Implanting beads after the surgery (e.g. after the biopsy report reveals imperfect edges) has 3 drawbacks:\n1. It is difficult to know where margins were\n2.It requires another surgery under anesthesia\n3.There are additional costs\n \nSide Effects of chemo beads\nSide-effects are rare and typically local. They occasionally include swelling, irritation and skin drainage.  Although IV cisplatin is deadly in cats, I have not observed or heard of general side-effects after bead placement."
          })}>
            <Text style={styles.articleTitle}>Tiny Beads Cause a Revolution in Cancer Treatment in Cats</Text>
            <Text style={styles.articleDesciption}>Reviewed on: </Text>
            <Text style={styles.articleDesciption}>Posts by: Dr. Phil Zeltzman, DVM, DACVS, CVJ </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.articleCard} onPress={() => openModal({
            description: ""
          })}>
            <Text style={styles.articleTitle}>Thyroid Tumor Surgery in Cats</Text>
            <Text style={styles.articleDesciption}>Reviewed on: </Text>
            <Text style={styles.articleDesciption}>Posts by:</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.articleCard} onPress={() => openModal({
            description: ""
          })}>
            <Text style={styles.articleTitle}>Thyroid Tumor Surgery in Cats</Text>
            <Text style={styles.articleDesciption}>Reviewed on: </Text>
            <Text style={styles.articleDesciption}>Posts by:</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.articleCard} onPress={() => openModal({
            description: ""
          })}>
            <Text style={styles.articleTitle}>Thyroid Tumor Surgery in Cats</Text>
            <Text style={styles.articleDesciption}>Reviewed on: </Text>
            <Text style={styles.articleDesciption}>Posts by:</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.articleCard} onPress={() => openModal({
            description: ""
          })}>
            <Text style={styles.articleTitle}>Thyroid Tumor Surgery in Cats</Text>
            <Text style={styles.articleDesciption}>Reviewed on: </Text>
            <Text style={styles.articleDesciption}>Posts by:</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.articleCard} onPress={() => openModal({
            description: ""
          })}>
            <Text style={styles.articleTitle}>Thyroid Tumor Surgery in Cats</Text>
            <Text style={styles.articleDesciption}>Reviewed on: </Text>
            <Text style={styles.articleDesciption}>Posts by:</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.articleCard} onPress={() => openModal({
            description: ""
          })}>
            <Text style={styles.articleTitle}>Thyroid Tumor Surgery in Cats</Text>
            <Text style={styles.articleDesciption}>Reviewed on: </Text>
            <Text style={styles.articleDesciption}>Posts by:</Text>
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
    alignItems:"flex-start",
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

  },articleTitle:{
    color:'black',
    fontSize: 18,
    fontWeight: "bold",
  }
});

export default Home;
