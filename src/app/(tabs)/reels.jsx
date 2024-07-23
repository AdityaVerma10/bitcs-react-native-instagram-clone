import { useEffect, useState } from "react";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import SingleReel from "../../components/singleReel";
import { getReels } from "../../firebase/methods";

const ReelsComponent = () => {
  const [reels, setReels] = useState([]);
  useEffect(() => {
    async function getdata() {
      const res = await getReels();
      if (res) setReels(res);
    }
    getdata();
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
