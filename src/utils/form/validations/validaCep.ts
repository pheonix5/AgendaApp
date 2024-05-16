//https://viacep.com.br/ws
import { UserFormDataProps } from "@/app/pages/confirmaPerfil/confirmaPerfil";
import axios from "axios";
import { UseFormSetError } from "react-hook-form";

type fecthBairroProps = {
  cep: string | undefined;
  setError: UseFormSetError<UserFormDataProps>
  setBairro: (bairro: string ) => void
}


export async function validaCep({ cep, setError, setBairro }: fecthBairroProps) {
  await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => {
      if (response.data.erro) {
        setError('cep', { type: 'manual', message: 'CEP não encontrado' });
      } else if (response.data.bairro) {
        setError('cep', { type: 'manual', message: `${response.data.bairro} - ${response.data.uf.toUpperCase()}` });
        setBairro(response.data.bairro);
      } else if (response.data.bairro === '') {
        setError('cep', { type: 'manual', message: `CEP não possui bairro!  ${response.data.uf.toUpperCase()}` });
        setBairro('');
      }
    })
    .catch(() => {
      setError('cep', { type: 'manual', message: 'Erro ao buscar CEP' });
    });
}
