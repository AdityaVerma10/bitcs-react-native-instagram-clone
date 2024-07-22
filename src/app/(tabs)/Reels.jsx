import { useEffect, useState } from "react";

import { SwiperFlatList } from "react-native-swiper-flatlist";
import SingleReel from "../../components/singleReel";

const ReelsComponent = () => {
  const [reels, setReels] = useState([]);
  useEffect(() => {
    async function getReels() {
      const res = await getReels();
      if (res) setReels(res);
    }
  }, []);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChangeIndexValue = ({ index }) => {
    setCurrentIndex(index);
  };

  return (
    <SwiperFlatList
      vertical={true}
      onChangeIndex={handleChangeIndexValue}
      data={reels}
      renderItem={({ reel, index }) => (
        <SingleReel reel={reel} index={index} currentIndex={currentIndex} />
      )}
      keyExtractor={(item, index) => index}
    />
  );
};

export default ReelsComponent;
