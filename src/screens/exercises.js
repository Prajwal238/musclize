import { useEffect, useState } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import Chip from "../components/roundedChip";
import AlertModal from "../components/customizeBox";

export default function Exercises({ route, navigation }) {
  const [targetExercises, setTarget] = useState([]);
  const [chosenExercise, setChosenExercise] = useState([]);
  const [showBox, setShowBox] = useState(false);
  const TARGET_EXERCISE_API_URL =
    "https://exercisedb.p.rapidapi.com/exercises/bodyPart/";
  // const [addedExercises, setExercises] = useState([]);

  // const addExercisesHandler = async () => {
  //   try {
  //     if (addedExercises.length != 0) {
  //       await AsyncStorage.setItem(
  //         "DailyWorkoutRoutine",
  //         JSON.stringify(addedExercises)
  //       );
  //     }
  //   } catch (err) {
  //     console.log(`Error: ${err}`);
  //   }
  // };

  // const onPressHandler = (index) => {
  //   setExercises((addedExercises) => [
  //     ...addedExercises,
  //     targetExercises[index],
  //   ]);
  // };

  const getTargetExercisesFromApi = async (bodypart) => {
    try {
      const resp = await fetch(TARGET_EXERCISE_API_URL + bodypart, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "17fe19ad9cmsh235edbfa6ee90cep175045jsnf837ffc63e88",
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      });
      const json = await resp.json();
      setTarget(json);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   try {
  //     AsyncStorage.getItem("DailyWorkoutRoutine").then((val) => {
  //       if (val != null) {
  //         setExercises(JSON.parse(val));
  //       }
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  useEffect(() => {
    getTargetExercisesFromApi(route.params.item);
  }, [route.params]);

  // useEffect(() => {
  //   addExercisesHandler();
  // }, [addedExercises]);

  console.log(targetExercises.length);
  return (
    <View style={{ marginTop: "15%", padding: 15 }}>
      <AlertModal
        isVisible={showBox}
        onClose={() => setShowBox(false)}
        selectedExercise={chosenExercise}
      />
      <Text
        style={{
          color: "black",
          fontSize: 28,
          fontWeight: "bold",
          textTransform: "capitalize",
        }}
      >
        {route.params.item} Workout {"\n"}Exercises
      </Text>
      <FlatList
        style={{ marginTop: "5%" }}
        data={targetExercises}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        renderItem={({ item, index }) => (
          <View style={styles.exerciseRowBox}>
            <View style={{ width: "60%", marginTop: 4 }}>
              <View>
                <Text
                  style={{
                    color: "black",
                    fontSize: 22,
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    marginBottom: 6,
                  }}
                >
                  {item.name}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Chip text={item.bodyPart} width="50%" />

                <Chip text={item.target} width="50%" />
              </View>
              <Chip text={item.equipment} width="70%" />

              <Pressable
                style={styles.roundedButton}
                onPress={() => {
                  setChosenExercise(targetExercises[index]);
                  setShowBox(true);
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    fontWeight: "bold",
                    paddingRight: 8,
                    paddingLeft: 10,
                  }}
                >
                  Add
                </Text>
                <Ionicons name="add-circle-outline" size={30} color="white" />
              </Pressable>
            </View>
            <View
              style={{
                borderWidth: 2,
                borderColor: "black",
                borderRadius: 25,
                width: "40%",
                height: "100%",
                overflow: "hidden",
                marginLeft: 8,
              }}
            >
              <Image
                source={{ uri: item.gifUrl }}
                style={{ width: "100%", height: "100%", borderRadius: 25 }}
              />
            </View>
          </View>
        )}
        keyExtractor={(item, index) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  exerciseRowBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    borderRadius: 25,
    padding: 16,
    backgroundColor: "gold",
  },

  roundedButton: {
    marginTop: "6%",
    padding: 4,
    alignItems: "center",
    flexDirection: "row",
    height: 40,
    width: 90,
    borderRadius: 20,
    backgroundColor: "black",
  },
});
