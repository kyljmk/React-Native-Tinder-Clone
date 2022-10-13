import {
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  View,
  StyleSheet,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../Firebase";
import generateId from "../lib/GenerateId";

const dummyData = [
  {
    firstName: "John",
    lastName: "Dorian",
    occupation: "Doctor",
    photoURL:
      "https://static.wikia.nocookie.net/scrubs/images/c/c9/S9-HQ-JD.jpg/revision/latest?cb=20091118154026",
    age: 36,
    id: 123,
  },
  {
    firstName: "David",
    lastName: "Beckham",
    occupation: "Football Club Owner",
    photoURL:
      "https://upload.wikimedia.org/wikipedia/commons/9/9e/Beckswimbledon.jpg",
    age: 47,
    id: 456,
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const { logout, user } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const swipeRef = useRef(null);

  useLayoutEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (snapshot) => {
        if (!snapshot.exists()) {
          navigation.navigate("Modal");
        }
      }),
    []
  );

  useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      const passes = await getDocs(
        collection(db, "users", user.uid, "passes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const swipes = await getDocs(
        collection(db, "users", user.uid, "swipes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const passedUserIds = passes.length > 0 ? passes : ["test"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["test"];

      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds, ...swipedUserIds])
        ),
        (snapshot) => {
          setProfiles(
            snapshot.docs
              .filter((doc) => doc.id !== user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
    };

    fetchCards();
    return unsub;
  }, [db]);

  const swipeLeft = (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    console.log(`You swiped PASS on ${userSwiped.displayName}`);

    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  };

  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    const loggedInProfile = await (
      await getDoc(doc(db, "users", user.uid))
    ).data();

    getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
      (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          console.log(`You've matched with ${userSwiped.displayName}`);

          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );

          setDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)), {
            users: {
              [user.uid]: loggedInProfile,
              [userSwiped.id]: userSwiped,
            },
            usersMatched: [user.uid, userSwiped.id],
            timestamp: serverTimestamp(),
          });

          navigation.navigate("Match", {
            loggedInProfile,
            userSwiped,
          });
        } else {
          console.log(
            `You swiped MATCH on ${userSwiped.displayName} (${userSwiped.job})`
          );
          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );
        }
      }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.profileImageContainer} onPress={logout}>
          <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoImageContainer}
          onPress={() => navigation.navigate("Modal")}
        >
          <Image
            source={require("../tinderlogo.png")}
            style={styles.logoImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={50} color="#fe3c72" />
        </TouchableOpacity>
      </View>
      <View style={styles.swiper}>
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={profiles}
          stackSize={5}
          cardIndex={0}
          verticalSwipe={false}
          animateCardOpacity
          onSwipedLeft={(cardIndex) => {
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            swipeRight(cardIndex);
          }}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                  fontSize: 40,
                  marginRight: 10,
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  color: "#4ded30",
                  fontSize: 40,
                  marginLeft: 10,
                },
              },
            },
          }}
          renderCard={(card) =>
            card ? (
              <View key={card.id} style={styles.swiperCard}>
                <Image
                  style={styles.swiperCardImage}
                  source={{ uri: card.photoURL }}
                />
                <View style={styles.imageTextContainer}>
                  <Text style={styles.imageTextName}>
                    {card.displayName}, {card.age}
                  </Text>
                  <Text style={styles.imageTextJob}>{card.job}</Text>
                </View>
              </View>
            ) : (
              <View
                style={[
                  styles.swiperCard,
                  { alignItems: "center", justifyContent: "center" },
                ]}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}
                >
                  No more profiles
                </Text>
                <Image
                  style={{ height: 90, width: 90 }}
                  source={{ uri: "https://links.papareact.com/6gb" }}
                />
              </View>
            )
          }
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonCross}
          onPress={() => swipeRef.current.swipeLeft()}
        >
          <Entypo name="cross" size={50} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonHeart}
          onPress={() => swipeRef.current.swipeRight()}
        >
          <AntDesign name="heart" size={32} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
    paddingHorizontal: 10,
  },
  profileImageContainer: {},

  profileImage: {
    width: 50,
    height: 50,
    borderRadius: "50%",
  },

  logoImageContainer: {
    width: 70,
    height: 70,
  },

  logoImage: {
    width: 70,
    height: 70,
  },

  swiper: {
    flex: 1,
    marginTop: -15,
  },

  swiperCard: {
    backgroundColor: "white",
    height: "72%",
    borderRadius: 20,
    position: "relative",
    shadowColor: "000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },

  swiperCardImage: {
    position: "absolute",
    top: 0,
    height: "100%",
    width: "100%",
    borderRadius: 15,
  },

  imageTextContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    width: "100%",
    height: 80,
    paddingHorizontal: 20,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: "center",
  },

  imageTextName: {
    fontSize: 25,
  },

  imageTextAge: {
    fontWeight: "bold",
    fontSize: 25,
  },

  imageTextJob: {
    color: "grey",
    fontSize: 20,
    marginTop: 5,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },

  buttonCross: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    width: 70,
    height: 70,
    backgroundColor: "rgba(255,0,0, 0.3)",
  },

  buttonHeart: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    width: 70,
    height: 70,
    backgroundColor: "rgba(50,205,50, 0.3)",
  },
});

export default HomeScreen;
