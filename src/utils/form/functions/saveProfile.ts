
import { UserProps, useUserStorage } from '@/store/user';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UserPropsForm } from '@/app/pages/confirmaPerfil/confirmaPerfil';
import firebase from '@/firebase/firebaseConnection';


export async function uploadImage(imageUri: string, dir: string, userId: string, isDoc?: boolean, docName?: string) {
  if (!imageUri) return;

  const pathPdfOrIgm = isDoc ? `docName${docName}` : 'img';

  const response = await fetch(imageUri);
  const blob = await response.blob();
  const storage = getStorage();
  const storageRef = ref(storage, `${dir}/${userId}+${pathPdfOrIgm}`);

  let url = "";

  try {
    await uploadBytes(storageRef, blob);
    url = await getDownloadURL(storageRef);
  } catch (error) {
    console.log(error)
  }

  return url;
}

export async function saveProfile(
  pathAvatar: any,
  pathImageDoc: any,
  pathDocument: any,
  dataStore: UserProps,
  dataForm: UserPropsForm,
  isDoc: boolean,
  docName: string,
  setUserData: (data: UserProps) => void,
  setLoadSend: (value: boolean) => void,
) {

  setLoadSend(true);
  const urlAvatar = await uploadImage(pathAvatar, 'avatar', dataStore.userId);
  const urlImage = await uploadImage(isDoc ? pathDocument : pathImageDoc, 'comprovante', dataStore.userId, isDoc, docName);


  const newUserdata = {
    userId: dataStore.userId,
    avatar: urlAvatar,
    nome: dataForm.nome,
    adressSend: urlImage ? true : false,
    cep: dataForm.cep,
    bairro: dataForm.bairro,
    confirmado: false,
    imageAdress: urlImage,
    cpf: dataForm.cpf,
    telefone: dataForm.celular,
  };

  await firebase.firestore().collection('users').doc(dataStore.userId).update(newUserdata)
    .then(() => {
      const updatedUserData: UserProps = {
        ...newUserdata,
        email: dataStore?.email!,
        imageAdress: newUserdata.imageAdress || '',
        bairro: newUserdata.bairro || undefined,
      };
      setUserData(updatedUserData);
      alert("Perfil salvo com sucesso");
      setLoadSend(false);
      return setUserData(updatedUserData);
    })
    .catch((error) => {
      console.log('Erro ao salvar perfil', error);
      setLoadSend(false);
    })

}