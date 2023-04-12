import {
  StyleSheet,
  Text,
  Pressable,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { MaterialIcons, Entypo, AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import Chip from "../components/roundedChip";
import DynamicImage from "../components/dynamicImage";

export default function Home({ navigation }) {
  const bodyList = [
    "back",
    "cardio",
    "chest",
    "lower arms",
    "lower legs",
    "neck",
    "shoulders",
    "upper arms",
    "upper legs",
    "waist",
  ];

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ color: "black", fontSize: 20 }}>Welcome,</Text>
        <Text style={{ color: "black", fontSize: 26, fontWeight: "bold" }}>
          Let's Get In Shape,
        </Text>
      </View>
      <View style={styles.roundedContainer}>
        <Image style={styles.image} source={require("../../assets/gym.png")} />
        <Chip text="Exercises" height="18%" width="30%" />
        <View>
          <Text style={{ color: "black", fontSize: 24, fontWeight: "bold" }}>
            Workout Plan
          </Text>
          <Text style={{ color: "black", fontSize: 16, fontWeight: 400 }}>
            Start with your today's {"\n"}routine
          </Text>
        </View>
        <Pressable
          style={styles.roundedButton}
          onPress={() => {
            navigation.navigate("DailyWorkout");
          }}
        >
          <MaterialIcons name="fitness-center" size={26} color="white" />
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
              paddingRight: 8,
              paddingLeft: 10,
            }}
          >
            Let's go
          </Text>
        </Pressable>
      </View>
      <View>
        <Text style={{ color: "black", fontSize: 26, fontWeight: "bold" }}>
          Choose Exercises
        </Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10, height: "25%" }}
          horizontal={true}
          contentContainerStyle={{ flexGrow: 1 }}
          data={bodyList}
          ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.cardExercise}
              onPress={() => {
                navigation.navigate("Exercises", { item });
              }}
            >
              <DynamicImage imageName={item} />
              <Text
                style={{
                  color: "black",
                  fontSize: 18,
                  fontWeight: 500,
                  textTransform: "capitalize",
                  position: "absolute",
                  top: 55,
                  left: 7,
                }}
              >
                {item}
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 15,
                  fontWeight: 300,
                  position: "absolute",
                  top: 73,
                  left: 7,
                }}
              >
                10+ workouts
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  position: "absolute",
                  bottom: 15,
                  left: 7,
                }}
              >
                <Entypo name="stopwatch" size={22} color="black" />
                <Text
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontWeight: 500,
                    paddingLeft: 3,
                  }}
                >
                  45-60 min
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <TouchableOpacity
        style={styles.roundedContainer2}
        onPress={() => {
          navigation.navigate("GymsMap");
        }}
      >
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 26 }}>Gyms</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: 400, fontSize: 22 }}>near you</Text>
            <AntDesign name="arrowright" size={34} color="gold" />
          </View>
        </View>
        <Image
          style={styles.image2}
          source={require("../../assets/maps.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  scaffold: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  image: {
    position: "absolute",
    top: 3,
    right: -30,
    zIndex: -10,
    height: "130%",
    width: "80%",
  },
  image2: {
    position: "absolute",
    resizeMode: "cover",
    top: 0,
    right: 0,
    // zIndex: -10,
    overflow: "hidden",
    height: "165%",
    width: "60%",
  },
  cardExercise: {
    elevation: 2,
    flex: 1,
    width: 130,
    backgroundColor: "white",
    justifyContent: "space-evenly",
    height: "90%",
    borderRadius: 20,
  },
  container: {
    marginTop: "5%",
    padding: 20,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: "#f2f2f2",
  },
  roundedContainer: {
    backgroundColor: "gold",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "30%",
    borderRadius: 25,
    padding: 25,
  },
  roundedContainer2: {
    backgroundColor: "white",
    flexDirection: "row",
    height: "18%",
    borderRadius: 0,
    padding: 25,
  },
  roundedChip: {
    marginBottom: "4%",
    height: "18%",
    width: "30%",
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  roundedButton: {
    marginTop: "5%",
    padding: 4,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    height: "28%",
    width: "40%",
    borderRadius: 20,
    backgroundColor: "black",
  },
});
