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
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { icons } from "../../constants";
import { createPetList } from "../../lib/appwrite";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { useGlobalContext } from "../../context/GlobalProvider";
import Date from "../../components/date";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    age: "",
    breed: "",
    color: "",
    species: "",
    gender: "",
    size: "",
    description: "",
    vaccination_status: false,
    adoption_fee: 0.0,
    adoption_status: "Available",
    image: null,
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formattedDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
    setForm({ ...form, age: formattedDate });
    hideDatePicker();
  };

  const submit = async () => {
    if (
      !form.name ||
      !form.age ||
      !form.breed ||
      !form.color ||
      !form.species ||
      !form.gender ||
      !form.size ||
      !form.description ||
      !form.adoption_status ||
      form.adoption_fee === 0.0 ||
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
        name: "",
        age: "",
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
          value={form.name}
          placeholder="Enter pet name..."
          handleChangeText={(e) => setForm({ ...form, name: e })}
          otherStyles="mt-10"
        />
        
        <Date form={form} setForm={setForm} />

        <View className="mt-7">
          <Text className="text-base text-gray-100 font-pmedium">Species</Text>
          <RNPickerSelect
            onValueChange={(value) => setForm({ ...form, species: value })}
            items={[
              { label: "Dog", value: "Dog" },
              { label: "Cat", value: "Cat" },
              { label: "Bird", value: "Bird" },
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
          title="Breed"
          value={form.breed}
          placeholder="Enter pet breed..."
          handleChangeText={(e) => setForm({ ...form, breed: e })}
          otherStyles="mt-7"
        />
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

        <View className="mt-7">
          <Text className="text-base text-gray-100 font-pmedium">
            Vaccination Status
          </Text>
          <View
            style={{
              borderWidth: 2,
              borderColor: "#000000",
              borderRadius: 8,
              marginTop: 10,
            }}
          >
            <RNPickerSelect
              onValueChange={(value) =>
                setForm({ ...form, vaccination_status: value })
              }
              items={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
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
        </View>

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
