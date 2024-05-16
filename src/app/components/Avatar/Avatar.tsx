import { View, Image, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

import { Feather } from '@expo/vector-icons';
import { useUserStorage } from '@/store/user'
import { theme } from '@/theme/theme';

type AvatarProps = TouchableOpacityProps & {
  avatar?: any
}

export function Avatar({ avatar, ...rest }: AvatarProps) {
  const { userData } = useUserStorage()

  const translateY = useSharedValue(0)
  translateY.value = withRepeat(withTiming(5, { duration: 1000 }), -1, true);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }]
    }

  })

  return (
    <View className='w-full items-center justify-center'>
      <TouchableOpacity  className='items-center justify-center'{...rest}>
        {avatar ? (
          <Image source={{ uri: avatar }} className='w-40 h-40 rounded-full border-4 border-Cblue-500' />
        ) : (
          <View className='w-40 h-40 bg-ligthGray-300 rounded-full' />
        )}
        <Animated.View className='absolute z-50 opacity-80' style={animatedStyle}>
          <Feather
            name="upload"
            size={24}
            color={theme.color.ligthGray[100]}
          />
        </Animated.View>
      </TouchableOpacity >
    </View>
  );
}