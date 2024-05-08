import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Date = ({ form, setForm }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    setForm({ ...form, age: formattedDate });
    hideDatePicker();
  };

  return (
    <>
      <TouchableOpacity onPress={showDatePicker} style={{ flexDirection: "row" }}>
        <Text className="text-base text-gray-100 font-pmedium">BirthDate:</Text>
        <Text className="flex-1 text-white font-psemibold text-base">
          {form.age ? form.age : "mm/dd/yyyy"}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};

export default Date;
