import React from "react";
import { Tabs } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function TabsLayout() {
  const user = useSelector((state) => state.user.userDetails);
  return (
    <Tabs
      screenOptions={{ tabBarActiveTintColor: "black", tabBarShowLabel: false }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          headerTitle: () => (
            <View className="flex flex-row gap-4 items-start ">
              <FontAwesome name="instagram" size={30} color="blue" />
              <Text className="text-[1.5rem]">For You</Text>
            </View>
          ),
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="createPost"
        options={{
          headerTitle: "Create Post",
          tabBarIcon: ({ color }) => (
            <Entypo name="squared-plus" size={26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "Profile",
          tabBarIcon: ({ color }) => (
            <Entypo name="user" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
