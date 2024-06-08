import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';
import { getCurrentUser, signOut } from '../../lib/appwrite';
import { useRouter } from 'expo-router';
import { icons, images } from '../../constants';
import InfoBox from "../../components/InfoBox";

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
    <SafeAreaView className="bg-primary h-full">
              <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 50, marginLeft: 20, color: '#fff'}}>Welcome back!</Text>
      <ScrollView contentContainerStyle={{ padding: 20 }}>

        <View className="w-full flex justify-center items-center mt-1 mb-8 px-5">
        <TouchableOpacity
          onPress={handleSignOut}
          className="flex w-full items-end mb-10"
        >
          <Image
            source={icons.logout}
            resizeMode="contain"
            className="w-6 h-6"
          />
        </TouchableOpacity>

        <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center ">
          <Image
            source={{ uri: user?.avatar }}
            className="w-[90%] h-[90%] rounded-lg"
            resizeMode="cover"
          />
        </View>

        <InfoBox
          title={user?.username}
          containerStyles="mt-5"
          titleStyles="text-lg"
        />
        <Text style={{ fontSize: 16, color: '#888' }}>{user?.email}</Text>
                <View style={{ marginBottom: 10 }}>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default adminProfile;
