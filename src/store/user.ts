import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "@/firebase/firebaseConnection";

export type UserProps = {
  userId: string;
  avatar?: string;
  email: string;
  nome: string;
  situacaoAgenda: string;
  adressSend: boolean;
  cep: string;
  bairro?: string;
  confirmado: boolean;
  imageAdress: string;
  cpf: string;
  telefone: string;
};

type UserStoreProps = {
  userData: UserProps | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setUserData: (userData: UserProps) => void;
  setUserAsyncStorage: (userData: UserProps) => Promise<void>;
  getUserAsyncStorage: () => Promise<UserProps | undefined>;
  register: (email: string, senha: string, tipoAcao: string) => Promise<void>;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
};

export const useUserStorage = create<UserStoreProps>((set, get) => ({
  userData: {
    userId: "",
    avatar: "",
    email: "",
    nome: "",
    situacaoAgenda: "",
    adressSend: false,
    cep: "",
    bairro: "",
    confirmado: false,
    imageAdress: "",
    cpf: "",
    telefone: "",
  },
  loading: false,
  setLoading: (loading) => set({ loading }),
  setUserData: (userData) => set({ userData }),

  setUserAsyncStorage: async (userData) => {
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
  },

  getUserAsyncStorage: async () => {
    const userData = await AsyncStorage.getItem("userData");
    if (userData) {
      set({ userData: JSON.parse(userData) });
      return JSON.parse(userData) as UserProps;
    }
  },

  register: async (email, senha, tipoAcao) => {
    set({ loading: true });
    if (tipoAcao == "cadastro") {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, senha)
        .then(async (userCrendential) => {
          await firebase
            .firestore()
            .collection("users")
            .doc(userCrendential.user?.uid)
            .set({
              userId: userCrendential.user?.uid,
              avatar: "",
              email: email,
              nome: "",
              situacaoAgenda: "",
              adressSend: false,
              cep: "",
              bairro: "",
              confirmado: false,
              imageAdress: "",
              cpf: "",
              telefone: "",
            })
            .then(() => {
              const user = {
                userId: userCrendential.user!.uid,
                avatar: "",
                email: email,
                nome: "",
                situacaoAgenda: "",
                adressSend: false,
                cep: "",
                bairro: "",
                confirmado: false,
                imageAdress: "",
                cpf: "",
                telefone: "",
              };
              get().setUserData(user);
              get().setUserAsyncStorage(user);
              set({ loading: false });
            });
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            alert("Esse e-mail já está em uso");
          }
          set({ loading: false });
        });
    } else {
      get()
        .login(email, senha)
        .catch((error) => {
          if (error.code === "auth/invalid-credential") {
            alert("E-mail ou senha inválidos");
          }
          set({ loading: false });
        });
    }
  },

  login: async (email, senha) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, senha)
      .then(async (userCrendential) => {
        await firebase
          .firestore()
          .collection("users")
          .doc(userCrendential.user?.uid)
          .get()
          .then((snapshot) => {
            const userData = snapshot.data() as UserProps;
            get().setUserData(userData);
            get().setUserAsyncStorage(userData);
          });
        set({ loading: false });
      });
  },

  logout: async () => {
    await firebase.auth().signOut();
    await AsyncStorage.clear();
    set({ userData: null });
    set({ loading: false });
  },
}));
