import { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  ActivityIndicator,
  Alert,
  TextInput,
} from "react-native";

import * as yup from "yup";
import { saveProfile } from "@/utils/form/functions/saveProfile";

import { theme } from "@/theme/theme";
import { useUserStorage } from "@/store/user";
import { Input } from "@/app/components/input";
import { Button } from "@/app/components/button";
import { Controller, set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar } from "@/app/components/Avatar/Avatar";
import { ModalPicker } from "@/app/components/ModalPicker";
import { validaCPF, validaCep } from "@/utils/form/validations";
import { Aviso } from "@/app/components/Aviso/Aviso";
import {
  MaterialCommunityIcons,
  Entypo,
  Feather,
  FontAwesome,
} from "@expo/vector-icons";

export type UserFormDataProps = {
  nome: string;
  cep: string;
  cpf: string;
  celular: string;
};

export type UserPropsForm = UserFormDataProps & {
  avatar?: string | null;
  comproResidencia: string | null;
  bairro: string | null;
};

const userSchema = yup.object({
  nome: yup.string().required("Nome é obrigatório"),
  cep: yup.string().required("CEP é obrigatório"),
  cpf: yup
    .string()
    .required("CPF é obrigatório")
    .test("is-valid-cpf", "CPF inválido", (value) =>
      value ? validaCPF(value) : false
    )
    .required("CPF é obrigatório"),
  celular: yup
    .string()
    .matches(/^\(\d{2}\)\s\d{5}-\d{4}$/, "Celular inválido")
    .required("Celular é obrigatório"),
});

export default function ConfirmaPerfil() {
  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<UserFormDataProps>({
    mode: "onChange",
    resolver: yupResolver<UserFormDataProps>(userSchema),
  });

  const { userData, setUserData } = useUserStorage();

  const [isAvatar, setIsAvatar] = useState(false);
  const [avatar, setAvatar] = useState<any>(null);
  const [imagem, setImagem] = useState<any>(null);
  const [documentoUri, setDocumentoUri] = useState<any>(null);
  const [docName, setDocName] = useState("");
  const [bairro, setBairro] = useState("");
  const [isDoc, setIsDoc] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);
  const cep = watch("cep");
  const [isFocused, setIsFocused] = useState({
    nome: false,
    cep: false,
    cpf: false,
    celular: false,
  });

  useEffect(() => {
    if (cep?.length === 9) {
      validaCep({ cep, setError, setBairro });
    }
  }, [cep]);

  useEffect(() => {
    if (userData?.avatar && userData?.imageAdress) {
      setAvatar(userData.avatar);
      if (userData.imageAdress.includes("pdf")) {
        const extractDocName = (url: any) => {
          const prefix = "docName";
          const start = url.indexOf(prefix) + prefix.length;
          const end = url.indexOf(".pdf", start) + 4;
          return url.substring(start, end);
        };

        const docName = extractDocName(userData.imageAdress);
        setDocName(docName);
      } else {
        setImagem(userData.imageAdress);
      }
    }
  }, [userData]);

  function handleModalPicker() {
    setModalVisible(true);
    setIsAvatar(false);
  }

  function handleModalPickerAvatar() {
    setModalVisible(true);
    setIsAvatar(true);
  }

  function handleFocus(field: string) {
    setIsFocused((prev) => ({ ...prev, [field]: true }));
  }

  const handleBlur = (field: string) => {
    setIsFocused((prev) => ({ ...prev, [field]: false }));
  };

  async function handleSaveProfile(data: UserFormDataProps) {
    if (isDoc && !documentoUri) {
      Alert.alert("Atenção", "É necessário enviar um comprovante de endereço");
      return;
    } else if (!isDoc && !imagem) {
      Alert.alert("Atenção", "É necessário enviar um comprovante de endereço");
      return;
    }

    const dataSave = {
      ...data,
      bairro,
      avatar,
      comproResidencia: isDoc ? documentoUri : imagem,
    };

    if (userData) {
      await saveProfile(
        avatar,
        imagem,
        documentoUri,
        userData,
        dataSave,
        isDoc,
        docName,
        setUserData,
        setLoadingSend
      );
    }
  }

  return (
    <View className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 px-6"
        contentContainerStyle={{ paddingVertical: 16 }}
      >
        <Avatar onPress={handleModalPickerAvatar} avatar={avatar} />

        <View className="pt-4 gap-2">
          <Controller
            control={control}
            name="nome"
            render={({ field: { onChange } }) => (
              <Input.Root erroMessage={errors.nome?.message}>
                <Input.Label
                  label="Nome Completo"
                  className="text-gray-800 font-medium"
                />
                <Input.Container
                  erroMessage={errors.nome?.message}
                  isFocused={isFocused.nome}
                >
                  <Input.Icon
                    icon={
                      <MaterialCommunityIcons
                        name="format-text"
                        size={20}
                        color={theme.color.ligthGray[300]}
                      />
                    }
                  />
                  <Input.Comum
                    placeholder="Nome Completo"
                    onChangeText={onChange}
                    errorMessage={errors.nome?.message}
                    placeholderTextColor={theme.color.ligthGray[300]}
                    onFocus={() => handleFocus("nome")}
                    onBlur={() => handleBlur("nome")}
                  />
                </Input.Container>
              </Input.Root>
            )}
          />

          <Controller
            control={control}
            name="cep"
            render={({ field: { onChange } }) => (
              <Input.Root erroMessage={errors.cep?.message}>
                <Input.Label
                  label="CEP"
                  className="text-gray-800 font-medium"
                />
                <Input.Container
                  erroMessage={errors.cep?.message}
                  isFocused={isFocused.cep}
                >
                  <Input.Icon
                    icon={
                      <Entypo
                        name="location-pin"
                        size={20}
                        color={theme.color.ligthGray[300]}
                      />
                    }
                  />
                  <Input.Mask
                    type="zip-code"
                    placeholder="CEP"
                    onChangeText={onChange}
                    errorMessage={errors.cep?.message}
                    placeholderTextColor={theme.color.ligthGray[300]}
                    onFocus={() => handleFocus("cep")}
                    onBlur={() => handleBlur("cep")}
                  />
                </Input.Container>
              </Input.Root>
            )}
          />

          <Aviso text="Preciamos confirmar o seu endereço. Anexe uma foto de um comprovante de residência abaixo. Uma Conta de água ou luz no seu nome e no endereço com o mesmo CEP" />

          {imagem ? (
            <Image
              source={{ uri: imagem }}
              className="w-full bg-ligthGray-300 h-44 mt-4 rounded-sm"
            />
          ) : docName ? (
            <Text className="text-black font-medium">{docName}</Text>
          ) : null}

          <Button.Root
            onPress={handleModalPicker}
            variant="roudend1"
            className="mt-4 w-[280px] bg-[#3C98E3] self-center gap-3"
            activeOpacity={0.7}
          >
            <Button.Text
              title="COMPROVANTE DE ENDEREÇO"
              className="text-white"
            />
            <Button.Icon
              icon={
                <MaterialCommunityIcons
                  name="paperclip"
                  size={20}
                  color="#FFF"
                />
              }
            />
          </Button.Root>

          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange } }) => (
              <Input.Root erroMessage={errors.cpf?.message}>
                <Input.Label
                  label="CPF"
                  className="text-gray-800 font-medium"
                />
                <Input.Container
                  erroMessage={errors.cpf?.message}
                  isFocused={isFocused.cpf}
                >
                  <Input.Icon
                    icon={
                      <MaterialCommunityIcons
                        name="format-text"
                        size={20}
                        color={theme.color.ligthGray[300]}
                      />
                    }
                  />
                  <Input.Mask
                    type="cpf"
                    placeholder="CPF"
                    options={{
                      maskType: "BRL",
                    }}
                    onChangeText={onChange}
                    errorMessage={errors.cpf?.message}
                    placeholderTextColor={theme.color.ligthGray[300]}
                    onFocus={() => handleFocus("cpf")}
                    onBlur={() => handleBlur("cpf")}
                  />
                </Input.Container>
              </Input.Root>
            )}
          />

          <Controller
            control={control}
            name="celular"
            render={({ field: { onChange } }) => (
              <Input.Root erroMessage={errors.celular?.message}>
                <Input.Label
                  label="Número de Celular"
                  className="text-gray-800 font-medium"
                />
                <Input.Container
                  erroMessage={errors.celular?.message}
                  isFocused={isFocused.celular}
                >
                  <Input.Icon
                    icon={
                      <Feather
                        name="phone-call"
                        size={18}
                        color={theme.color.ligthGray[300]}
                      />
                    }
                  />
                  <Input.Mask
                    type="cel-phone"
                    placeholder="(61) 98000-0000"
                    options={{
                      maskType: "BRL",
                      withDDD: true,
                      dddMask: "(99) ",
                    }}
                    onChangeText={onChange}
                    errorMessage={errors.celular?.message}
                    placeholderTextColor={theme.color.ligthGray[300]}
                    onFocus={() => handleFocus("celular")}
                    onBlur={() => handleBlur("celular")}
                  />
                </Input.Container>
              </Input.Root>
            )}
          />

          <Button.Root
            variant="roudend1"
            className="mt-4 gap-4"
            disabled={loadingSend}
            onPress={handleSubmit(handleSaveProfile)}
          >
            {loadingSend ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <>
                <Button.Text title="SALVAR PERFIL" className="text-white" />
                <FontAwesome name="save" size={20} color="#FFF" />
              </>
            )}
          </Button.Root>
        </View>
      </ScrollView>

      {modalVisible && (
        <ModalPicker
          isAvatar={isAvatar}
          setAvatar={setAvatar}
          setImage={setImagem}
          setDocumento={setDocumentoUri}
          setDocName={setDocName}
          setIsDoc={setIsDoc}
          onClose={() => setModalVisible(false)}
        />
      )}
    </View>
  );
}
