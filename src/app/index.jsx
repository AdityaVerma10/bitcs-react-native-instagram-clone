import { Redirect } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { useEffect } from "react";

function Home() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userDetails);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return user ? (
    <Redirect href={"/(tabs)/feed"} />
  ) : (
    <Redirect href={"/(auth)/login"} />
  );
}

export default Home;
