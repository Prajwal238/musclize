import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { GOOGLE_MAP_PLACES_API_KEY } from "../../environments";
import { mapstyles } from "../utilities/mapstyles";
import { MaterialIcons } from "@expo/vector-icons";

export default function MyMap() {
  const [region, setRegion] = useState(null);
  const [gyms, setGyms] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({});

      setRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0021,
      });
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords.latitude},${coords.longitude}&radius=5000&type=gym&key=${GOOGLE_MAP_PLACES_API_KEY}`
      );
      const data = await response.json();
      console.log(data);
      setGyms(data.results.slice(0, 15));
    })();
  }, []);

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          style={styles.map}
          mapPadding={50}
          customMapStyle={mapstyles}
          region={region}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {gyms.map((gym) => (
            <Marker
              pinColor="#555555"
              key={gym.place_id}
              coordinate={{
                latitude: gym.geometry.location.lat,
                longitude: gym.geometry.location.lng,
              }}
              title={gym.name + `  ★ ${gym.rating ?? "--"}`}
            >
              <View>
                <MaterialIcons name="fitness-center" size={24} color="gold" />
              </View>
            </Marker>
          ))}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
