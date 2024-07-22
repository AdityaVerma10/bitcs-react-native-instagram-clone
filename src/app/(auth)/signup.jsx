import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { insertUserDetails } from "../../firebase/methods";
import { setUser } from "../../store/userSlice";
import { useRouter } from "expo-router";

const RegisterScreen = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDetails);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setFullName] = useState("");
  const [username, setUserName] = useState("");

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        console.warn("user Create Sucessfully");
        const docId = await insertUserDetails({
          id: auth.currentUser.uid,
          email,
          password,
          name,
          username,
          bio: "",
          followers: 0,
          following: 0,
          avatar:
            "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721433600&semt=sph",
        });
        if (docId) {
          dispatch(
            setUser({
              ...res.user,
              docId,
            })
          );
        }
        console.warn(res.user);
        router.replace("/(tabs)/feed");
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  return (
    <View className="flex justify-center items-center px-4 p-3">
      <TextInput
        className="border border-gray-400 py-2 px-3 rounded-lg mb-4 w-full"
        placeholder="Full Name"
        value={name}
        onChangeText={setFullName}
      />
      <TextInput
        className="border border-gray-400 py-2 px-3 rounded-lg mb-4 w-full"
        placeholder="Username"
        value={username}
        onChangeText={setUserName}
      />
      <TextInput
        className="border border-gray-400 py-2 px-3 rounded-lg mb-4 w-full"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="border border-gray-400 py-2 px-3 rounded-lg mb-4 w-full"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        className="bg-blue-500 py-3 px-4 rounded-lg items-center w-full"
        onPress={handleRegister}
      >
        <Text className="text-white font-bold">Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
