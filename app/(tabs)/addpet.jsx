import { useState } from "react";
import { router } from "expo-router";
import { ResizeMode, Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

import { icons } from "../../constants";
import { createPetList } from "../../lib/appwrite";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    Name: "",
    breed: "",
    color: "",
    species: "",
    gender: "",
    size: "",
    description: "",
    adoption_fee: 0,
    adoption_status: "Available",
    image: null,
  });

  // Breeds
  const breedOptions = {
    Dog: [
      { label: "Labrador", value: "Labrador" },
      { label: "German Shepherd", value: "German Shepherd" },
      { label: "Golden Retriever", value: "Golden Retriever" },
      { label: "Poodle", value: "Poodle" },
      { label: "French Bulldog", value: "French Bulldog" },
      { label: "Beagle", value: "Beagle" },
      { label: "Bulldog", value: "Bulldog" },
      { label: "Yorkshire Terrier", value: "Yorkshire Terrier" },
      { label: "Dachshund", value: "Dachshund" },
      { label: "Boxer", value: "Boxer" },
      { label: "Rottweiler", value: "Rottweiler" },
      { label: "Doberman Pinscher", value:  "Doberman Pinscher" },
      { label: "Australian Shepherd", value: "Australian Shepherd" },
      { label: "Shih Tzu", value: "Shih Tzu" },
      { label: "Pomeranian", value: "Pomeranian" },
      { label: "Cavalier King Charles Spaniel", value: "Cavalier King Charles Spaniel" },
      { label: "Basset Hound", value: "Basset Hound" },
      { label: "Bichon Frise", value: "Bichon Frise" },
      { label: "None", value: "None"},
    ],
    Cat: [
      { label: "Maine Coon", value: "Maine Coon" },
      { label: "Siamese", value: "Siamese" },
      { label: "Persian", value: "Persian" },
      { label: "British Shorthair", value: "British Shorthair" },
      { label: "Ragdoll", value: "Ragdoll" },
      { label: "Abyssinian", value: "Abyssinian" },
      { label: "Scottish Fold", value: "Scottish Fold" },
      { label: "Sphynx", value: "Sphynx" },
      { label: "Bengal", value: "Bengal" },
      { label: "Russian Blue", value: "Russian Blue" },
      { label: "Norwegian Forest Cat", value: "Norwegian Forest Cat" },
      { label: "Siberian Forest Cat", value: "Siberian Forest Cat" },
      { label: "American Shorthair", value: "American Shorthair" },
      { label: "Exotic Shorthair", value: "Exotic Shorthair" },
      { label: "Bombay", value: "Bombay" },
      { label: "Burmese", value: "Burmese" },
      { label: "Oriental Shorthair", value: "Oriental Shorthair" },
      { label: "None", value: "None"},
    ],
  };
  const openPicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setForm({
        ...form,
        image: result,
      });
    }
  };

  const submit = async () => {
    if (
      !form.Name ||
      !form.breed ||
      !form.color ||
      !form.species ||
      !form.gender ||
      !form.size ||
      !form.description ||
      !form.adoption_status ||
      form.adoption_fee === 0 ||
      !form.image
    ) {
      return Alert.alert("Please provide all fields");
    }

    setUploading(true);
    try {
      await createPetList({
        ...form,
        userId: user.$id,
      });

      Alert.alert("Success", "Pet details uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        Name: "",
        breed: "",
        color: "",
        species: "",
        gender: "",
        size: "",
        description: "",
        vaccination_status: false,
        adoption_fee: 0.0,
        adoption_status: "",
        image: null,
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">
          Add Pet Details
        </Text>

        <FormField
          title="Pet Name"
          value={form.Name}
          placeholder="Enter pet name..."
          handleChangeText={(e) => setForm({ ...form, Name: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7">
          <Text className="text-base text-gray-100 font-pmedium">Species & Breed</Text>
          <RNPickerSelect
            onValueChange={(value) => setForm({ ...form, species: value })}
            items={[
              { label: "Dog", value: "Dog" },
              { label: "Cat", value: "Cat" },
            ]}
            style={{
              inputIOS: {
                paddingVertical: 12,
                paddingHorizontal: 10,
                color: "black",
                paddingRight: 30,
                backgroundColor: "white",
              },
              inputAndroid: {
                paddingVertical: 8,
                paddingHorizontal: 10,
                color: "black",
                paddingRight: 30,
                backgroundColor: "white",
              },
              placeholder: {
                color: "#7b7b8b",
              },
            }}
          />
        </View>
        {form.species && (
          <RNPickerSelect
            onValueChange={(value) => setForm({ ...form, breed: value })}
            value={form.breed}
            items={breedOptions[form.species]}
            style={{
              inputIOS: {
                paddingVertical: 12,
                paddingHorizontal: 10,
                color: "black",
                paddingRight: 30,
                backgroundColor: "white",
                marginTop: 10,
              },
              inputAndroid: {
                paddingVertical: 8,
                paddingHorizontal: 10,
                color: "black",
                paddingRight: 30,
                backgroundColor: "white",
                marginTop: 10,
              },
              placeholder: {
                color: "#7b7b8b",
              },
            }}
          />
        )}
        <FormField
          title="Color"
          value={form.color}
          placeholder="Enter pet color..."
          handleChangeText={(e) => setForm({ ...form, color: e })}
          otherStyles="mt-7"
        />
        <View className="mt-7">
          <Text className="text-base text-gray-100 font-pmedium">Gender</Text>
          <RNPickerSelect
            onValueChange={(value) => setForm({ ...form, gender: value })}
            items={[
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
            ]}
            style={{
              inputIOS: {
                paddingVertical: 12,
                paddingHorizontal: 10,
                color: "black",
                paddingRight: 30,
                backgroundColor: "white",
              },
              inputAndroid: {
                paddingVertical: 8,
                paddingHorizontal: 10,
                color: "black",
                paddingRight: 30,
                backgroundColor: "white",
              },
              placeholder: {
                color: "#7b7b8b",
              },
            }}
          />
        </View>
        <FormField
          title="Size"
          value={form.size}
          placeholder="Enter pet size..."
          handleChangeText={(e) => setForm({ ...form, size: e })}
          otherStyles="mt-7"
        />
        <FormField
          title="Description"
          value={form.description}
          placeholder="Enter pet description..."
          handleChangeText={(e) => setForm({ ...form, description: e })}
          otherStyles="mt-7"
        />

        <FormField
          title="Adoption Fee"
          value={form.adoption_fee.toString()}
          placeholder="Enter adoption fee..."
          keyboardType="numeric"
          handleChangeText={(e) =>
            setForm({ ...form, adoption_fee: parseFloat(e) })
          }
          otherStyles="mt-7"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Pet Image
          </Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.image ? (
              <Image
                source={{ uri: form.image.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  alt="upload"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose Image
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
