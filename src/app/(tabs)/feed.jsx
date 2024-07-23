import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, updateLikes } from "../../store/postsSlice";
import { getPosts, updateLikesByDocId } from "../../firebase/methods";
import { FontAwesome } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { fetchUserInfo } from "../../store/userSlice";

export default function Feed() {
  const { loading, error, posts } = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user.userDetails);
  const router = useRouter();
  const dispatch = useDispatch();
  const [like, setLike] = useState(Array(posts.length).fill(false));
  if (!user) router.replace("/(auth)/login");

  useEffect(() => {
    async function fetchdata() {
      dispatch(fetchPosts());
      dispatch(fetchUserInfo(user.uid));
    }
    fetchdata();
  }, []);

  const handleLikes = async (likesDetail) => {
    const res = await updateLikesByDocId(likesDetail);
    if (res) dispatch(updateLikes(likesDetail));
  };
  return (
    <ScrollView>
      {error ? (
        <View>
          <Text className="text-center p-4">{error}</Text>
        </View>
      ) : loading ? (
        <Text className="text-center p-4">Loading...</Text>
      ) : (
        <View className="flex gap-3 pt-1">
          {posts ? (
            posts.map((post, index) => (
              <View
                key={index}
                className="flex gap-2 pb-2 p-1 border-b-[1px] border-[black]"
              >
                <View className="flex flex-row items-center justify-between ">
                  <View className="flex flex-row  items-center gap-4">
                    <Image
                      source={{ uri: post.userDetails.avatar }}
                      className="w-[35px] h-[35px] rounded-3xl"
                    />
                    <Text>{post.userDetails.username}</Text>
                  </View>

                  <Entypo name="dots-three-vertical" size={15} color="black" />
                </View>
                <Image
                  source={{ uri: post.url }}
                  className="w-full h-[350px]"
                />

                <View className="flex flex-row gap-4">
                  <Pressable
                    onPress={() => {
                      like[index]
                        ? handleLikes({
                            docId: post.docId,
                            id: post.id,
                            likes: post.likes - 1,
                          })
                        : handleLikes({
                            docId: post.docId,
                            id: post.id,
                            likes: post.likes + 1,
                          });
                      setLike((prev) => {
                        let newArr = [...prev];
                        newArr[index] = !newArr[index];
                        return newArr;
                      });
                    }}
                  >
                    <FontAwesome
                      name={like[index] ? "heart" : "heart-o"}
                      size={24}
                      color={like[index] ? "red" : "black"}
                    />
                  </Pressable>

                  <FontAwesome name="comment-o" size={24} color="black" />

                  <SimpleLineIcons name="paper-plane" size={24} color="black" />
                </View>

                <Text>{post.likes} Likes</Text>

                <Text>{post.caption}</Text>
              </View>
            ))
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}
