import { View, Text, Button, Image, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { signOut } from "firebase/auth";
import { useRouter } from "expo-router";
import { auth } from "../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../firebase/methods";
import { updateUserProfile } from "../store/userSlice";
import { pickImage } from "../utilities/imagePicker";
import { uploadImage } from "../firebase/upload";
import { FontAwesome } from "@expo/vector-icons";

export default function settings() {
  const user = useSelector((state) => state.user.userDetails);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({
    name: user.name,
    username: user.username,
    bio: user.bio,
  });

  const router = useRouter();
  if (!user) router.replace("/(auth)/login");

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        router.replace("/(auth)/login");
      })
      .catch((error) => {
        console.warn(error);
      });
  };
  const handleChange = (fieldValue) => {
    setUserDetails((prev) => {
      return { ...prev, ...fieldValue };
    });
  };
  const handlePickImage = async () => {
    const res = await pickImage();
    console.log(res);
    if (res) setImage(res);
  };
  const handlSave = async () => {
    if (image) {
      const url = await uploadImage(image);
      if (url) {
        const docId = user.uid;
        const upadatedDetails = { ...userDetails, avatar: url };
        const res = await updateUserDetails(docId, upadatedDetails);
        if (res) dispatch(updateUserProfile(upadatedDetails));
        router.replace("/(tabs)/profile");
        console.log(res);
      }
    } else {
      const docId = user.uid;
      const res = await updateUserDetails(docId, userDetails);
      if (res) dispatch(updateUserProfile(userDetails));
      router.replace("/(tabs)/profile");
      console.log(res);
    }
  };
  return (
    <ScrollView>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Settings",
          headerRight: () => (
            <Button
              onPress={handleSignOut}
              title="Logout"
              className="bg-blue-500 py-3 px-4 rounded-lg self-center w-[6rem] text-center text-[1.2rem] lowercase"
            />
          ),
        }}
      />
      <View className="flex flex-col gap-4 pt-3">
        <View className="flex gap-3">
          {image ? (
            <Image
              source={{
                uri: image,
              }}
              className="w-[300px] h-[300px] rounded-[200px] self-center"
            />
          ) : user.avatar ? (
            <Image
              source={{
                uri: user.avatar,
              }}
              className="w-[300px] h-[300px] rounded-[200px] self-center"
            />
          ) : (
            <FontAwesome
              name="user"
              size={250}
              color="black"
              className="self-center border p-8 rounded-[200px]"
            />
          )}

          <Text
            className="text-[blue] text-[1.4rem]  underline  text-center"
            onPress={handlePickImage}
          >
            Change
          </Text>
        </View>

        <TextInput
          value={userDetails.name}
          onChangeText={(val) => handleChange({ name: val })}
          placeholder="Name"
          className="border border-gray-400 ml-2 w-[27.1rem] py-2 px-3 rounded-lg mb-4  "
        />

        <TextInput
          value={userDetails.username}
          onChangeText={(val) => handleChange({ username: val })}
          placeholder="Username"
          className="border border-gray-400 ml-2 w-[27.1rem] py-2 px-3 rounded-lg mb-4  "
        />

        <TextInput
          value={userDetails.bio}
          onChangeText={(val) => handleChange({ bio: val })}
          placeholder="Bio"
          className="border border-gray-400 ml-2 w-[27.1rem] py-2 px-3 rounded-lg mb-4  "
        />
        <View className="flex flex-row gap-10 mt-3 justify-center">
          <Text
            className="bg-blue-500 py-3 px-4 w-[6rem] rounded-lg self-center text-center text-white text-[1.2rem] "
            onPress={() => router.replace("/(tabs)/profile")}
          >
            Back
          </Text>

          <Text
            className="bg-blue-500 py-3 px-4 w-[6rem] rounded-lg self-center text-center text-white text-[1.2rem] "
            onPress={handlSave}
          >
            Save
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
