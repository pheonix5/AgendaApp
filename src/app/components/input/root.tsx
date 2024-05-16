import clsx from 'clsx'
import { View, ViewProps, Text } from 'react-native'

type InputRootProps = ViewProps & {
  erroMessage?: string | null
  children: React.ReactNode
  tipoAcao?: 'cadastro' | 'login'
}

const stringsRed = ['obrigatório', 'inválido', 'não encontrado', 'não possui bairro', 'Erro ao buscar']

export function InputRoot({ tipoAcao, erroMessage = null, className, children }: InputRootProps) {
  const invalid = !!erroMessage 
  const erroTextRed = stringsRed.some((redString) => erroMessage?.includes(redString))

  return (
    <View className={`${className}`}>
      {children}


      {invalid &&
        <Text className={clsx(`font-titulo mt-1`,
          tipoAcao ? 'text-white' : 'text-gray-800',
          erroTextRed ? 'text-red-400' : 'text-gray-800',
        )}>{erroMessage}</Text>
      }
    </View>
  )
}
