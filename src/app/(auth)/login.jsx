import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter, Link } from "expo-router";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";

export default function login() {
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });
  const auth = getAuth();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, credential.email, credential.password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(setUser(user));
        router.replace("/(tabs)/feed");
      })
      .catch((error) => {
        console.warn(error.message);
      });
  };
  return (
    <View className="p-2">
      <TextInput
        placeholder="Email"
        className="border border-gray-400 py-2 px-3 rounded-lg mb-4 w-full"
        value={credential.email}
        onChangeText={(val) =>
          setCredential((prev) => {
            return { ...prev, email: val };
          })
        }
      />
      <TextInput
        placeholder="Password"
        className="border border-gray-400 py-2 px-3 rounded-lg mb-4 w-full"
        value={credential.password}
        onChangeText={(val) => {
          setCredential((prev) => {
            return { ...prev, password: val };
          });
        }}
        secureTextEntry
      />

      <TouchableOpacity
        className="bg-blue-500 py-3 px-4 rounded-lg items-center w-full"
        onPress={handleLogin}
      >
        <Text className="text-white font-bold">Login</Text>
      </TouchableOpacity>
      <View>
        <Text>
          Don't have Account ?{" "}
          <Link
            href="/(auth)/signup"
            className="underline text-[blue] cursor-pointer"
          >
            Sign Up
          </Link>
        </Text>
      </View>
    </View>
  );
}
