import React, { useRef, useState } from "react";
import { View, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import Video from "react-native-video";
import Ionic from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";

const SingleReel = ({ reel, index, currentIndex }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const videoRef = useRef(null);

  const onBuffer = (buffer) => {
    console.log("buffring", buffer);
  };
  const onError = (error) => {
    console.log("error", error);
  };

  const [mute, setMute] = useState(false);

  const [like, setLike] = useState(reel.isLike);

  return (
    <View
      className={`relative justify-center items-center w-[${windowWidth}] h-[${windowHeight}]`}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setMute(!mute)}
        className="w-[100%] h-[100%] absolute"
      >
        <Video
          videoRef={videoRef}
          onBuffer={onBuffer}
          onError={onError}
          repeat={true}
          resizeMode="cover"
          paused={currentIndex == index ? false : true}
          source={{
            uri: reel.url,
          }}
          muted={mute}
          className="w-[100%] h-[100%] absolute"
        />
      </TouchableOpacity>
      <Ionic
        name="volume-mute"
        style={{
          fontSize: mute ? 20 : 0,
          color: "white",
          position: "absolute",
          backgroundColor: "rgba(52,52,52,0.6)",
          borderRadius: 100,
          padding: mute ? 20 : 0,
        }}
      />
      <View className={`absolute w-[${windowWidth}] z-[1] bottom-0 p-10`}>
        <View>
          <TouchableOpacity className="w-[150px]">
            <View>
              <View className="w-[32px] h-[32px] m-[10] rounded-[100px] bg-white">
                <Image
                  source={{
                    uri: "data:image/jpeg;base64,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",
                  }}
                  className="w-full h-full object-cover rounded-[100px]"
                />
              </View>
              <Text className="color-white text-[16px]">
                {reel.description}
              </Text>
            </View>
          </TouchableOpacity>
          <Text>{reel.description}</Text>
          <View>
            <Ionic
              name="ios-musical-note"
              style={{ color: "white", fontSize: 16 }}
            />
            <Text className="color-white">Original Audio</Text>
          </View>
        </View>
      </View>
      <View className="absolute bottom-10 right-0">
        <TouchableOpacity onPress={() => setLike(!like)} className="p-10">
          <AntDesign
            name={like ? "heart" : "hearto"}
            style={{ color: like ? "red" : "white", fontSize: 25 }}
          />
          <Text className="text-white">{reel.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity className="p-10">
          <Ionic
            name="ios-chatbubble-outline"
            className="color-white text-[25px]"
          />
        </TouchableOpacity>
        <TouchableOpacity className="p-10">
          <Ionic
            name="paper-plane-outline"
            className="color-white text-[25px]"
          />
        </TouchableOpacity>
        <TouchableOpacity className="p-10">
          <Feather name="more-vertical" className="color-white text-[25px]" />
        </TouchableOpacity>
        <View className="w-30 h-30 rounded border-[white] m-10">
          <Image
            source={reel.userDetails.avatar}
            className="w-[100%] h-[100%] rounded-[100px] object-cover"
          />
        </View>
      </View>
    </View>
  );
};

export default SingleReel;
