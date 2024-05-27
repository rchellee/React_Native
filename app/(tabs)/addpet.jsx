import { useState } from "react";
import { router } from "expo-router";
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
    age: "",
    breed: "",
    color: "",
    species: "",
    gender: "",
    size: "",
    description: "",
    contact_num: "",
    adoption_fee: 0,
    adoption_status: "Available",
    vaccination_status: false,
    location: "",
    image: null,
    created_at: ""
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
      { label: "Doberman Pinscher", value: "Doberman Pinscher" },
      { label: "Australian Shepherd", value: "Australian Shepherd" },
      { label: "Shih Tzu", value: "Shih Tzu" },
      { label: "Pomeranian", value: "Pomeranian" },
      {
        label: "Cavalier King Charles Spaniel",
        value: "Cavalier King Charles Spaniel",
      },
      { label: "Basset Hound", value: "Basset Hound" },
      { label: "Bichon Frise", value: "Bichon Frise" },
      { label: "None", value: "None" },
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
      { label: "None", value: "None" },
    ],
  };

  const openPicker = async (selectType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          image: result.assets[0],
        });
      }

      if (selectType === "video") {
        setForm({
          ...form,
          video: result.assets[0],
        });
      }
    }
  };

  const submit = async () => {
    const missingFields = [];
    if (!form.Name) missingFields.push("Name");
    if (!form.age) missingFields.push("Age");
    if (!form.breed) missingFields.push("Breed");
    if (!form.color) missingFields.push("Color");
    if (!form.species) missingFields.push("Species");
    if (!form.gender) missingFields.push("Gender");
    if (!form.size) missingFields.push("Size");
    if (!form.description) missingFields.push("Description");
    if (!form.contact_num) missingFields.push("Contact Number");
    if (!form.location) missingFields.push("Location");
    if (!form.adoption_fee) form.adoption_fee = 0;
    if (!form.image) missingFields.push("Image");

    if (missingFields.length > 0) {
      return Alert.alert(
        "Please provide all fields",
        `The following fields are required: ${missingFields.join(", ")}`
      );
    }

    setUploading(true);
    try {
      const currentDate = new Date().toISOString().split('T')[0]; // Get current date and time in ISO format
    await createPetList({
      ...form,
      created_at: currentDate, // Set created_at to the current date and time
      userId: user.$id,
      });

      Alert.alert("Success", "Pet details uploaded successfully");
      router.push("/adopt");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        Name: "",
        age: "",
        breed: "",
        color: "",
        species: "",
        gender: "",
        size: "",
        description: "",
        contact_num: "",
        vaccination_status: false,
        adoption_fee: 0.0,
        location: "",
        adoption_status: "Available",
        image: null,
        created_at: "",
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

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Pet Image
          </Text>
        </View>

        <View className="mt-7 space-y-2">
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
                  Choose an Image
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="Pet Name"
          value={form.Name}
          placeholder="Enter your pet name..."
          handleChangeText={(e) => setForm({ ...form, Name: e })}
          otherStyles="mt-10"
        />
        <FormField
          title="Pet Age"
          value={form.age}
          placeholder="Enter your pet age..."
          handleChangeText={(e) => setForm({ ...form, age: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7">
          <Text className="text-base text-gray-100 font-pmedium">
            Species & Breed
          </Text>
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

        <View className="mt-7">
          <Text className="text-base text-gray-100 font-pmedium">Size</Text>
          <RNPickerSelect
            onValueChange={(value) => setForm({ ...form, size: value })}
            items={[
              { label: "Small", value: "Small" },
              { label: "Medium", value: "Medium" },
              { label: "Large", value: "Large" },
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
        <View className="mt-7">
          <Text className="text-base text-gray-100 font-pmedium">
            Vaccination Status
          </Text>
          <RNPickerSelect
            onValueChange={(value) =>
              setForm({ ...form, vaccination_status: value })
            }
            value={form.vaccination_status}
            items={[
              { label: "YES", value: true },
              { label: "NO", value: false },
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
          title="Contact Number"
          value={form.contact_num}
          placeholder="Enter contact number (09000000000)"
          handleChangeText={(e) => setForm({ ...form, contact_num: e })}
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
          title="Location"
          value={form.location}
          placeholder="Enter your location..."
          handleChangeText={(e) => setForm({ ...form, location: e })}
          otherStyles="mt-10"
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

        <CustomButton
          title="Submit & Post"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
