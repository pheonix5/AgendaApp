import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  useNavigation,
  NavigationProp,
  StackActions,
} from "@react-navigation/native";
import firebase from "firebase/compat";

import { UserProps, useUserStorage } from "@/store/user";

import { theme } from "@/theme/theme";
import { Avatar } from "@/app/components/Avatar/Avatar";
import { ModalPicker } from "@/app/components/ModalPicker";
import Constants from "expo-constants";
import { InputLabel } from "@/app/components/input/label";
import { TabHomeParamList } from "@/routes/AppRoutes/app.routes";
import {
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { uploadImage } from "@/utils/form/functions/saveProfile";

export default function Perfil() {
  const { logout } = useUserStorage();
  const navigation = useNavigation<NavigationProp<TabHomeParamList>>();
  const { userData, setUserData } = useUserStorage();
  const [modalVisible, setModalVisible] = useState(false);
  const [isAvatar, setIsAvatar] = useState(false);
  const [avatar, setAvatar] = useState("");

  function handleSair() {
    logout()
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "StackAgenda" }],
        });
      })
      .catch((error) => {
        console.log("error ao sair", error);
      });
  }

  function handleModalPickerAvatar() {
    setModalVisible(true);
    setIsAvatar(true);
  }
  async function chageAvatarFirebase(avatar: string) {
    if (userData?.userId) {
      const urlAvatar = await uploadImage(avatar, "avatar", userData.userId);

      if (urlAvatar) {
        await firebase
          .firestore()
          .collection("users")
          .doc(userData.userId)
          .update({
            avatar: urlAvatar,
          });

        setUserData({ ...userData, avatar: urlAvatar } as UserProps);
      }
    }
  }

  async function handleCleanAvatar() {
    try {
      await firebase
        .firestore()
        .collection("users")
        .doc(userData?.userId)
        .update({
          avatar: "",
        });

      setUserData({ ...userData, avatar: "" } as UserProps);
    } catch (error) {
      console.log("error ao limpar avatar", error);
    }
  }

  return (
    <View
      className="flex-1"
      style={{ paddingTop: Constants.statusBarHeight + 10 }}
    >
      <TouchableOpacity className="px-6 items-end" onPress={handleSair}>
        <AntDesign name="logout" size={26} color={theme.color.Cblue[500]} />
      </TouchableOpacity>
      <View className="flex-1 px-6 gap-4">
        <Avatar
          avatar={userData?.avatar}
          onPress={handleModalPickerAvatar}
          cleanAvatar={handleCleanAvatar}
        />

        <View>
          <InputLabel
            label="Nome completo"
            className="font-titulo text-Cgray-200 text-base"
          />
          <View className="w-full flex-row gap-3  bg-gray-200 border border-Cgray-200 p-2 rounded">
            <MaterialCommunityIcons
              name="format-text"
              size={24}
              color={theme.color.Cgray[100]}
            />
            <Text className="text-base text-Cgray-200">{userData?.nome}</Text>
          </View>
        </View>

        <View>
          <InputLabel
            label="Número de Celular"
            className="font-titulo text-Cgray-200 text-base"
          />
          <View className="w-full flex-row gap-5  bg-gray-200 border border-Cgray-200 p-2 rounded">
            <Feather
              name="phone-call"
              size={24}
              color={theme.color.Cgray[100]}
            />
            <Text className="text-base text-Cgray-200">
              {userData?.telefone}
            </Text>
          </View>
        </View>

        <View>
          <InputLabel
            label="Email"
            className="font-titulo text-Cgray-200 text-base "
          />
          <View className="w-full flex-row gap-5  bg-gray-200 border border-Cgray-200 p-2 rounded">
            <MaterialIcons
              name="mail-outline"
              size={24}
              color={theme.color.Cgray[100]}
            />
            <Text className="text-base text-Cgray-200">{userData?.email}</Text>
          </View>
        </View>
      </View>

      {modalVisible && (
        <ModalPicker
          isAvatar={isAvatar}
          setAvatar={setAvatar}
          onClose={() => setModalVisible(false)}
          onChangeAvatar={(avatar) => chageAvatarFirebase(avatar)}
        />
      )}
    </View>
  );
}
