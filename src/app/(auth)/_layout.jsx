import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="signup"
        options={{
          title: "SignUp",
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: "Login",
        }}
      />
    </Stack>
  );
}
