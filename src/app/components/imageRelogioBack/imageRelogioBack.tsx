import { SafeAreaView, ImageBackground } from "react-native";

export function ImageRelogioBack() {
  return (
    <ImageBackground
      source={require("@/assets/bgAgenda.jpg")}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: 16,
      }}
    ></ImageBackground>
  );
}
