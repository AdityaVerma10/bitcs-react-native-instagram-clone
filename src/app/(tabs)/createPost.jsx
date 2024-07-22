import { View, Text, TextInput, Image, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../../firebase/upload";
import { insertPost } from "../../firebase/methods";

import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { insertNewPost } from "../../store/postsSlice";
import { insertNewUserPost } from "../../store/userSlice";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const user = useSelector((state) => state.user.userDetails);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = getAuth();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (image) {
      const uploadedUrl = await uploadImage(image);
      if (uploadedUrl) {
        const post = {
          id: Date.now().toString(),
          userId: auth.currentUser.uid,
          caption,
          url: uploadedUrl,
          likes: 0,
        };
        const savePost = await insertPost(post);

        if (savePost) {
          dispatch(
            insertNewPost({
              ...post,
              userDetails: {
                avatar: user.avatar,
                username: user.username,
              },
            })
          );
          dispatch(insertNewUserPost(post));
          router.replace("/(tabs)/feed");
        }
      }
    }
  };
  return (
    <View className=" flex flex-col  gap-10">
      {image ? (
        <Image
          source={{
            uri: image,
          }}
          className="w-[400px] h-[400px]"
        />
      ) : (
        <Text className="text-center text-[1.5rem] pt-2">
          Please Upload Image !
        </Text>
      )}

      <Text
        className="text-[blue] text-[1.4rem]  underline  text-center"
        onPress={pickImage}
      >
        {image ? "Change" : "Upload"}
      </Text>

      <TextInput
        placeholder="Caption"
        value={caption}
        onChangeText={setCaption}
        className="border border-gray-400 ml-2 w-[27.1rem] py-2 px-3 rounded-lg mb-4  "
      />

      <Text
        className="bg-blue-500 py-3 px-4 rounded-lg self-center w-[6rem] text-center text-[1.2rem] "
        onPress={handleSave}
      >
        Save
      </Text>
    </View>
  );
}
