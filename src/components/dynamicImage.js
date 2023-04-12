import { Image, StyleSheet } from "react-native";
import { imageUrls } from "../utilities/imageUrls";

export default function DynamicImage(props) {
  const imgName =  props.imageName.replace(/\s/g, '')
  return <Image style={styles.icon} source={imageUrls[imgName].uri} />;
}

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    top: 10,
    left: 5,
    height: "30%",
    width: "40%",
  },
});
