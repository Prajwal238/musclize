import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { registerRootComponent } from "expo";
import Home from "./screens/home";
import Exercises from "./screens/exercises";
import Routine from "./screens/routine";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import MyMap from "./components/map";

const Stack = createStackNavigator();

const clearStorageIfNewDay = async () => {
  try {
    const lastClearedDate = await AsyncStorage.getItem("lastClearedDate");
    const currentDate = new Date().toISOString().split("T")[0];
    console.log(lastClearedDate, " ", currentDate);
    if (lastClearedDate !== currentDate) {
      await AsyncStorage.removeItem('DailyWorkoutRoutine');
      await AsyncStorage.setItem("lastClearedDate", currentDate);
      console.log("Async storage cleared successfully");
    }
  } catch (e) {
    console.log("Error while clearing data", e);
  }
};

const startClearStorageInterval = () => {
  // Check every hour if a new day has started
  const intervalId = setInterval(clearStorageIfNewDay, 60 * 60 * 1000);
  // Clear the interval on unmount
  return () => clearInterval(intervalId);
};

export default function App() {
  useEffect(startClearStorageInterval, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Exercises"
          component={Exercises}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DailyWorkout"
          component={Routine}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="GymsMap"
          component={MyMap}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);
