import {
  View,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { theme } from "@/theme/theme";

import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
  useAnimatedStyle,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";

type ModalPickerProps = {
  isAvatar: boolean;
  setImage?: any;
  setAvatar?: any;
  setDocumento?: any;
  setDocName?: (name: string) => void;
  setIsDoc?: (isDoc: boolean) => void;
  onClose?: () => void;
  onChangeAvatar?: (avatar: string) => void;
};

const ABSOLUTFILL = "top-0 bottom-0 left-0 right-0";

export function ModalPicker({
  isAvatar,
  setImage,
  setAvatar,
  setDocumento,
  setDocName,
  setIsDoc,
  onClose,
  onChangeAvatar,
}: ModalPickerProps) {
  const offset = useSharedValue(0);
  const pan = Gesture.Pan()
    .shouldCancelWhenOutside(true)
    .onChange((event) => {
      const offsetDelta = event.changeY + offset.value;
      const clamp = Math.max(-20, offsetDelta);

      offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
    })
    .onFinalize(() => {
      if (offset.value < 300 / 3) {
        offset.value = withSpring(0);
      } else {
        offset.value = withTiming(256, {}, () => {
          runOnJS(handleClose)();
        });
      }
    });

  const translateY = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: isAvatar ? [4, 4] : [4, 2],
      quality: 1,
    });

    if (!result.canceled) {
      if (isAvatar && setAvatar) {
        setAvatar(result.assets[0].uri);
        onClose?.();
      } else {
        setImage(result.assets[0].uri);
        setDocName?.("");
        onClose?.();
      }
      onChangeAvatar && onChangeAvatar(result.assets[0].uri);
    }

    setIsDoc?.(false);
  };

  const takePhoto = async () => {
    let photoResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: isAvatar ? [4, 4] : [4, 2],
      quality: 1,
    });

    if (!photoResult.canceled) {
      if (isAvatar && setAvatar) {
        setAvatar(photoResult.assets[0].uri);
        onClose?.();
      } else {
        setImage(photoResult.assets[0].uri);
        onClose?.();
      }
      onChangeAvatar && onChangeAvatar(photoResult.assets[0].uri);
    }
    setIsDoc?.(false);
  };

  const takeDocument = async () => {
    let documentResult = await DocumentPicker.getDocumentAsync({
      type: ["image/jpeg", "image/png", "application/pdf"],
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (!documentResult.canceled) {
      if (documentResult.assets[0].mimeType === "image/*") {
        setImage(documentResult.assets[0].uri);
        setDocName?.("");
      } else {
        const docName = documentResult.assets[0]?.name ?? "";
        setDocName?.(docName);
        setImage(null);
        setDocumento(documentResult.assets[0].uri);
      }
      onClose?.();
      console.log(documentResult);
    }

    setIsDoc?.(true);
  };

  function handleClose() {
    offset.value = 0;
    onClose?.();
  }

  return (
    <View className="flex-1 justify-end absolute -bottom-2 top-0 left-0 right-0">
      <TouchableWithoutFeedback onPress={onClose}>
        <View className={`absolute ${ABSOLUTFILL} bg-black/50`} />
      </TouchableWithoutFeedback>

      <GestureDetector gesture={pan}>
        <Animated.View
          className="w-full h-[268] bg-Cblue-400 items-center p-2 rounded-tl-3xl rounded-tr-3xl"
          style={translateY}
          entering={SlideInDown}
          exiting={SlideOutDown}
        >
          <View className="w-[50%] self-end flex-row justify-between mr-4 mt-1">
            <MaterialCommunityIcons
              name="drag-horizontal"
              size={24}
              color={theme.color.ligthGray[100]}
            />
            <FontAwesome
              name="close"
              size={24}
              color={theme.color.ligthGray[100]}
              onPress={handleClose}
            />
          </View>

          <Text className="font-medium text-lg text-ligthGray-100  text-center">
            Selecione o arquivo
          </Text>

          <View className="flex-1 w-full flex-row gap-6 justify-center">
            <TouchableOpacity
              className="items-center justify-center"
              onPress={takePhoto}
            >
              <AntDesign
                name="camera"
                size={32}
                color={theme.color.ligthGray[100]}
              />
              <Text className="text-ligthGray-100 text-base font-medium">
                Camera
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="items-center  justify-center"
              onPress={pickImage}
            >
              <Entypo
                name="image-inverted"
                size={32}
                color={theme.color.ligthGray[100]}
              />
              <Text className="text-ligthGray-100 text-base font-medium">
                Galeria
              </Text>
            </TouchableOpacity>

            {!isAvatar && (
              <TouchableOpacity
                className="items-center text-base justify-center"
                onPress={takeDocument}
              >
                <Ionicons
                  name="document"
                  size={32}
                  color={theme.color.ligthGray[100]}
                />
                <Text className="text-ligthGray-100 font-medium">
                  Documento
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}
