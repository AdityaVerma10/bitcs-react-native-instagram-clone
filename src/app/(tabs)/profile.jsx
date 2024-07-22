import { View, Text, Image, Pressable } from "react-native";
import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useEffect } from "react";
import { fetchUserInfo, fetchUserPosts } from "../../store/userSlice";
import { useSelector, useDispatch } from "react-redux";

import { useRouter } from "expo-router";
export default function UserProfile() {
  const { loading, error, userDetails, userPosts } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    async function fetchData() {
      dispatch(fetchUserInfo(userDetails.uid));
      dispatch(fetchUserPosts(userDetails.uid));
    }
    fetchData();
  }, []);

  return (
    <>
      <Tabs.Screen
        options={{
          headerTitle: () => (
            <View className="flex flex-row w-full justify-between items-start ">
              <View className="flex flex-row items-center gap-2">
                <Text className="text-[1.5rem]">{userDetails?.username}</Text>
                <AntDesign name="down" size={20} color="black" />
              </View>
              <Pressable onPress={() => router.replace("/settings")}>
                <Feather name="settings" size={24} color="black" />
              </Pressable>
            </View>
          ),
        }}
      />
      {error ? (
        <View>
          <Text className="text-center p-4">{error}</Text>
        </View>
      ) : loading ? (
        <Text className="text-center p-4">Loading...</Text>
      ) : (
        <View className="flex flex-col gap-1">
          <View className="flex flex-row items-center p-2 gap-10">
            <Image
              source={{
                uri: userDetails.avatar,
              }}
              className="w-[70px] h-[70px] rounded-[100px]"
            />

            <View className="flex flex-row gap-8">
              <View>
                <Text className="text-center text-[1.2rem]">
                  {userPosts.length}
                </Text>
                <Text className="text-[1.2rem]">Posts</Text>
              </View>
              <View>
                <Text className="text-center text-[1.2rem]">
                  {userDetails.followers}
                </Text>
                <Text className="text-[1.2rem]">Followers</Text>
              </View>
              <View>
                <Text className="text-center text-[1.2rem]">
                  {userDetails.following}
                </Text>
                <Text className="text-[1.2rem]">Following</Text>
              </View>
            </View>
          </View>

          <View className="p-2">
            <Text className="text-[1.3rem]">{userDetails.name}</Text>
            <Text className="w-[300px]">{userDetails.bio}</Text>
          </View>

          <View className="flex flex-col gap-2">
            <Text className="text-[1.5rem] p-2">Posts</Text>
            <View className="flex flex-row flex-wrap gap-1 w-full">
              {userPosts.map((post) => (
                <Image
                  source={{
                    uri: post.url,
                  }}
                  className="w-[125px] h-[125px]"
                />
              ))}
            </View>
          </View>
        </View>
      )}
    </>
  );
}
