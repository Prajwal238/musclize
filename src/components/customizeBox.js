import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";

export default function AlertModal(props) {
  const { isVisible, onClose, selectedExercise } = props;
  const [weights, setWeights] = useState(Array(4).fill(0));
  const [reps, setReps] = useState(Array(4).fill(8));

  const [addedExercises, setExercises] = useState([]);

  const addExercisesHandler = async () => {
    try {
      // console.log(JSON.stringify(addedExercises));
      if (addedExercises.length != 0) {
        await AsyncStorage.setItem(
          "DailyWorkoutRoutine",
          JSON.stringify(addedExercises)
        );
      }
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  const handleDone = () => {
    setExercises((addedExercises) => [...addedExercises, {...selectedExercise, reps: reps, weights: weights}]);
    onClose();
  };

  useEffect(() => {
    try {
      AsyncStorage.getItem("DailyWorkoutRoutine").then((val) => {
        if (val != null) {
          setExercises(JSON.parse(val));
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    addExercisesHandler();
  }, [addedExercises]);

  const renderRow = ({ item, index }) => {
    return (
      <View style={styles.rowContainer}>
        <Text style={styles.rowText}>Set {index + 1}:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={weights[index]}
            onValueChange={(itemValue) => {
              const newWeights = [...weights];
              newWeights[index] = itemValue;
              setWeights(newWeights);
            }}
          >
            {[...Array(21)].map((_, index) => (
              <Picker.Item
                key={index}
                style={styles.pickerText}
                label={`${(index) * 5}Kg`}
                value={(index) * 5}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={reps[index]}
            onValueChange={(itemValue) => {
              const newReps = [...reps];
              newReps[index] = itemValue;
              setReps(newReps);
            }}
          >
            {[...Array(18)].map((_, index) => (
              <Picker.Item
                key={index}
                style={styles.pickerText}
                label={`${index + 8} reps`}
                value={index + 8}
              />
            ))}
          </Picker>
        </View>
      </View>
    );
  };

  return (
    <Modal transparent visible={isVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <FlatList
            data={[...Array(4)]}
            keyExtractor={(_, index) => `${index}`}
            renderItem={renderRow}
          />
          <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
            <Text style={styles.doneButtonText}>Done</Text>
            <Icon name="check-circle" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "85%",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
    alignItems: "center",
  },
  rowText: {
    fontSize: 20,
    fontWeight: 500,
    marginRight: 10,
  },
  pickerText: {
    fontSize: 16,
  },
  pickerContainer: {
    flex: 1,
    margin: -5,
    flexDirection: "column",
    justifyContent: "center",
  },
  doneButton: {
    backgroundColor: "gold",
    borderRadius: 25,
    padding: 10,
    width: "50%",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
  },
  doneButtonText: {
    fontSize: 23,
    fontWeight: 600,
    marginRight: 10,
  },
});
