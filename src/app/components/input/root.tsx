import { View, ViewProps, Text } from 'react-native'

type InputRootProps = ViewProps & {
  erroMessage?: string | null
  children: React.ReactNode
  tipoAcao?: 'cadastro' | 'login'
}

export function InputRoot({tipoAcao ,erroMessage, className,  children }: InputRootProps) {
  const invalid = !!erroMessage

  return (
    <View className={`${className}`}>
      {children}
     {invalid &&
      tipoAcao === 'cadastro' && <Text className='text-white font-titulo'>{erroMessage}</Text>
    }
    </View>
  )
}
