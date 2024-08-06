import { View, Text, Image } from "react-native";
import Constants from "expo-constants";

export default function AlertaAgendaVazia() {
  return (
    <View
      className="flex-1"
      style={{ paddingTop: Constants.statusBarHeight }}
    ></View>
  );
}
