import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, Alert, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';
import { getCurrentUser, signOut } from '../../lib/appwrite';
import { useRouter } from 'expo-router';
import { icons, images } from '../../constants';

const adminProfile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

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

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View
          style={{
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <Image
            source={user.avatar || images.defaultAvatar}
            style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }}
          />
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{user.username}</Text>
          <Text style={{ fontSize: 16, color: '#888' }}>{user.email}</Text>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Profile Information</Text>
          <Text style={{ marginBottom: 5 }}>Username: {user.username}</Text>
          <Text style={{ marginBottom: 5 }}>Email: {user.email}</Text>
          <Text style={{ marginBottom: 5 }}>Account Type: {user.accountType}</Text>
        </View>

        <Button title="Edit Profile" onPress={() => Alert.alert('Edit Profile clicked')} />
        <View style={{ marginVertical: 10 }} />
        <Button title="Sign Out" onPress={handleSignOut} color="#ff6347" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default adminProfile;
