import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import Chip from "../components/roundedChip";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { AppBar, IconButton } from "@react-native-material/core";
import { Share } from "react-native";

export default function Routine({ route, navigation }) {
  const [workoutRoutine, setRoutine] = useState([]);
  const [i, setIndex] = useState(0);

  if (workoutRoutine != null) {
    var workoutTemplate = "";
    for (let index = 0; index < workoutRoutine.length; index++) {
      workoutTemplate += `Workout: ${workoutRoutine[index]?.name}: \n \n`;
      for (let k = 0; k < 4; k++) {
        workoutTemplate += `Set ${k+1}:\n - Weight: ${workoutRoutine[index].weights[k]} \n - Reps: ${workoutRoutine[index].reps[k]}\n`;
      }
      workoutTemplate += "\n";
    }
  }
  const message = workoutTemplate;
  /* In order to use react-native-share in expo I think I need to eject the expo app to
  download this dependency as for some reason Expo isnt allowing */

  // const shareWorkout = async () => {
  //   const shareOptions = {
  //     message: workoutTemplate,
  //   };

  //   try {
  //     const shareResponse = await Share.open(shareOptions);
  //   } catch (error) {
  //     console.log("Share Error: ", error);
  //   }
  // };

  const shareWorkout = async () => {
    try {
      const result = await Share.share({
        message: message,
      });
      if (result.action === Share.sharedAction) {
        console.log("Content shared successfully");
      } else if (result.action === Share.dismissedAction) {
        console.log("Content sharing dismissed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      AsyncStorage.getItem("DailyWorkoutRoutine").then((val) => {
        setRoutine(JSON.parse(val));
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <View style={styles.scaffold}>
      {workoutRoutine === null ? (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image
            source={{
              uri: "https://img.freepik.com/free-vector/dumbbell-exercise-concept-illustration_114360-9069.jpg?w=2000",
            }}
            style={{ width: "60%", height: "60%", borderRadius: 25 }}
          />
          <Text
            style={{
              color: "black",
              fontSize: 20,
              fontWeight: 300,
              padding: 20,
            }}
          >
            No workouts available in your{"\n"}Daily Routine : (
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <AppBar
            title="Today's Workout"
            color="white"
            style={{ marginTop: 15 }}
            elevation={0}
            leading={
              <IconButton
                icon={
                  <Ionicons name="ios-chevron-back" size={24} color="black" />
                }
                onPress={navigation.goBack}
              />
            }
            trailing={
              <IconButton
                icon={
                  <Octicons
                    name="share"
                    size={24}
                    color="black"
                    onPress={() => shareWorkout()}
                  />
                }
              />
            }
          />
          <View style={styles.backgroundImageContainer}>
            <Image
              source={{ uri: workoutRoutine[i]?.gifUrl }}
              style={{ width: "100%", height: "100%", borderRadius: 25 }}
            />
          </View>
          <View style={styles.exerciseListContainer}>
            <FlatList
              style={{ padding: 20, marginTop: 15 }}
              data={workoutRoutine}
              ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
              renderItem={({ index, item: exercise }) => (
                <View>
                  <View
                    style={[
                      {
                        borderColor: i === index ? "black" : null,
                        borderWidth: i === index ? 2 : 0,
                      },
                      styles.exerciseRowBox,
                    ]}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        setIndex(index);
                      }}
                    >
                      <View style={{ width: "100%", marginTop: 4 }}>
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
                            {exercise.name}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Chip text={exercise.bodyPart} width="50%" />
                          <Chip text={exercise.target} width="50%" />
                        </View>
                        <Chip text={exercise.equipment} width="70%" />
                      </View>
                      {i === index
                        ? exercise.reps.map((rep, j) => {
                            return (
                              <View
                                key={j}
                                style={{ flexDirection: "row", marginTop: 5 }}
                              >
                                <View
                                  style={{
                                    height: 30,
                                    width: 30,
                                    borderRadius: 50,
                                    backgroundColor: "black",
                                    alignItems: "center",
                                  }}
                                >
                                  <Text
                                    style={{ color: "white", fontSize: 20 }}
                                  >
                                    {j + 1}
                                  </Text>
                                </View>
                                <Text
                                  style={{
                                    fontSize: 22,
                                    fontWeight: "bold",
                                    marginHorizontal: 15,
                                  }}
                                >
                                  {rep}reps {"\t \t \t \t \t"} /
                                  {exercise.weights[j]}Kgs
                                </Text>
                              </View>
                            );
                          })
                        : null}
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scaffold: {
    flex: 1,
    backgroundColor: "white",
  },
  backgroundImageContainer: {
    flex: 0.4,
    marginTop: 30,
  },
  exerciseListContainer: {
    flex: 0.6,
    backgroundColor: "#f2f2f2",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    overflow: "hidden",
  },
  exerciseRowBox: {
    flexDirection: "row",
    elevation: 1,
    justifyContent: "space-between",
    flex: 1,
    borderRadius: 25,
    padding: 16,
    backgroundColor: "gold",
  },
});
