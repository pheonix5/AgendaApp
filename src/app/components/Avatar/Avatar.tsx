import {
  View,
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { Feather } from "@expo/vector-icons";
import { useUserStorage } from "@/store/user";
import { theme } from "@/theme/theme";

type AvatarProps = TouchableOpacityProps & {
  avatar?: any;
  trashIcon?: boolean;
  cleanAvatar?: () => void;
};

export function Avatar({
  avatar,
  cleanAvatar,
  trashIcon,
  ...rest
}: AvatarProps) {
  const translateY = useSharedValue(0);
  translateY.value = withRepeat(withTiming(5, { duration: 1000 }), -1, true);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <View className="w-full items-center justify-center">
      <View className="relative">
        <TouchableOpacity className="items-center justify-center" {...rest}>
          {avatar ? (
            <Image
              source={{ uri: avatar }}
              className="w-40 h-40 rounded-full border-4 border-Cblue-500"
            />
          ) : (
            <View className="w-40 h-40 bg-ligthGray-300 rounded-full" />
          )}
          <Animated.View
            className="absolute z-50 opacity-80"
            style={animatedStyle}
          >
            <Feather
              name="upload"
              size={24}
              color={theme.color.ligthGray[100]}
            />
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity
          className="absolute -right-11 bottom-2 flex justify-center items-center w-10 h-10 bg-Cblue-500 rounded-full"
          onPress={cleanAvatar && cleanAvatar}
        >
          <Feather name="trash-2" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
