import React from 'react';
import { View, Text, Button, Alert, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';
import { signOut } from '../../lib/appwrite';
import { useRouter } from 'expo-router';

const adminHome = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      setIsLoggedIn(false);
      router.replace('/sign-in');
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            minHeight: Dimensions.get('window').height - 100,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
            Admin Dashboard
          </Text>

          <View style={{ marginBottom: 20 }}>
            <Text>Welcome to the admin dashboard!</Text>
            <Text>Here you can manage users, posts, and other admin tasks.</Text>
          </View>

          <Button title="Sign Out" onPress={handleSignOut} color="#ff6347" />

          {/* Add more admin-specific components and functionalities here */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default adminHome;
