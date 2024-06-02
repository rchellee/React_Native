import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { createRate, getCurrentUser } from "../lib/appwrite";
import { useGlobalContext } from "../context/GlobalProvider";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import { AirbnbRating } from 'react-native-ratings'; // Import AirbnbRating

const RatingForm = () => {
  const { user } = useGlobalContext();
  const [currentUser, setCurrentUser] = useState(null);
  const route = useRoute();
  const { petId, petName } = route.params;
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error('Error fetching current user:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUser();
  }, []);

  const handleRate = async () => {
    if (!rating) {
      Alert.alert('Error', 'Please provide a rating value.');
      return;
    }

    try {
      await createRate({
        petId,
        userId: user.$id,
        username: user?.username,
        petName,
        rating,
        feedback,
        timestamp: new Date().toISOString(),
      });

      setRating(0);
      setFeedback('');
      Alert.alert('Success', 'Rating submitted successfully.');
      navigation.navigate('adopt');
    } catch (error) {
      console.error('Error rating the pet:', error);
      Alert.alert('Error', error.message || 'Failed to submit rating.');
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontSize: 25, color: '#000000', fontWeight: '500', marginVertical: 5, paddingTop: 100}}>
      
        Rate Your Experience
      </Text>
      <AirbnbRating
        count={5}
        reviews={['Terrible', 'Bad', 'OK', 'Good', 'Excellent']}
        defaultRating={0}
        size={30}
        onFinishRating={setRating}
      />
      <TextInput
        style={{
          height: 100,
          width: 200,
          borderColor: '#444',
          borderWidth: 1,
          backgroundColor: '#222',
          color: '#eee',
          paddingHorizontal: 10,
          marginVertical: 5,
        }}
        value={feedback}
        onChangeText={setFeedback}
        multiline
        placeholder="Describe your experience.."
        placeholderTextColor="#999"
      />
      <TouchableOpacity onPress={handleRate} style={{ marginVertical: 10 }}>
        <Text
          style={{
            fontSize: 17,
            color: '#eee',
            fontWeight: '500',
            textTransform: 'uppercase',
            backgroundColor: '#222',
            borderColor: '#444',
            borderWidth: 1,
            textAlign: 'center',
            paddingVertical: 10,
            width: 200,
          }}>
          Post
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RatingForm;