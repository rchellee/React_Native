import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

const AddPet = () => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [age, setAge] = useState('');
  const [petType, setPetType] = useState('');

  const handleAddPet = async () => {
    if (!name || !species || !age || !petType) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      // Make API call to add the pet
      // Replace 'YOUR_BACKEND_API_URL' with your actual backend API URL
      const response = await fetch('YOUR_BACKEND_API_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, species, age, petType }),
      });

      if (!response.ok) {
        throw new Error('Failed to add pet');
      }

      // Clear input fields after adding the pet
      setName('');
      setSpecies('');
      setAge('');
      setPetType('');

      // Display success message
      Alert.alert('Success', 'Pet added successfully');
    } catch (error) {
      console.error('Error adding pet:', error);
      Alert.alert('Error', 'Failed to add pet');
    }
  };

  return (
    <View style={{ padding: 50 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16, }}>Add a Pet</Text>
      <TextInput
        style={{ marginBottom: 8, padding: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 4 }}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={{ marginBottom: 8, padding: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 4 }}
        placeholder="Species"
        value={species}
        onChangeText={setSpecies}
      />
      <TextInput
        style={{ marginBottom: 8, padding: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 4 }}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <View style={{ flexDirection: 'row', marginBottom: 8 }}>
        <Button title="Cat" onPress={() => setPetType('Cat')} />
        <Button title="Dog" onPress={() => setPetType('Dog')} />
      </View>
      <Button title="Add Pet" onPress={handleAddPet} />
    </View>
  );
};

export default AddPet;
