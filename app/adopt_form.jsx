import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Alert, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { createAdoptionRequest, updatePetAdoptionStatus } from "../lib/appwrite";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";

const AdoptForm = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const route = useRoute();
  const {
    Name,
    age,
    species,
    breed,
    color,
    gender,
    size,
    adoption_fee,
    vaccination_status,
    description,
    contact_num,
    location,
    image,
    created_at,
    username,
    email,
    adoption_status,
  } = route.params;
  const [form, setForm] = useState({
    adopterName: "",
    adopterContact: "",
    adopterAddress: "",
    message: "",
    requested_at: "",
    status: "Pending",
  });

  const submit = async () => {
    const missingFields = [];
    if (!form.adopterName) missingFields.push("Adopter Name");
    if (!form.adopterContact) missingFields.push("Adopter Contact");
    if (!form.adopterAddress) missingFields.push("Adopter Address");
    if (!form.message) missingFields.push("Message");

    if (missingFields.length > 0) {
      return Alert.alert(
        "Please provide all fields",
        `The following fields are required: ${missingFields.join(", ")}`
      );
    }

    setUploading(true);
    try {
      const currentDate = new Date().toISOString().split("T")[0];
      await createAdoptionRequest({
        ...form,
        requested_at: currentDate,
        PetName: Name,
        userId: user.$id,
        age,
        species,
        breed,
        color,
        gender,
        size,
        adoption_fee,
        vaccination_status,
        description,
        contact_num,
        location,
        image,
      });

      await updatePetAdoptionStatus(Name, { adoption_status: "Pending" });

      Alert.alert("Success", "Adoption request submitted successfully");
      router.push("/adopt");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        adopterName: "",
        adopterContact: "",
        adopterAddress: "",
        message: "",
        requested_at: "",
        status: "Pending"
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">
          Adoption Request Form
        </Text>

        <FormField
          title="Adopter Name"
          value={form.adopterName}
          placeholder="Enter your Fullname..."
          handleChangeText={(e) => setForm({ ...form, adopterName: e })}
          otherStyles="mt-10"
        />

        <FormField
          title="Contact Number"
          value={form.adopterContact}
          placeholder="Enter your contact number..."
          handleChangeText={(e) => setForm({ ...form, adopterContact: e })}
          otherStyles="mt-7"
        />

        <FormField
          title="Address"
          value={form.adopterAddress}
          placeholder="Enter your address..."
          handleChangeText={(e) => setForm({ ...form, adopterAddress: e })}
          otherStyles="mt-7"
        />

        <FormField
          title="Message"
          value={form.message}
          placeholder="Enter your message..."
          handleChangeText={(e) => setForm({ ...form, message: e })}
          otherStyles="mt-7"
        />

        <CustomButton
          title="Submit Request"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdoptForm;
