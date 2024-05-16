import { View, ViewProps, Text } from 'react-native'
import clsx from 'clsx'

type InputProps = ViewProps & {
  children: React.ReactNode
  isFocused?: boolean
  erroMessage?: string | null
}

export function InputContainer({ className, children, isFocused, erroMessage, }: InputProps) {
  const invalid = !!erroMessage && !erroMessage.includes('-')

  return (
    <View className={clsx(`border-[1px] flex-row gap-4 items-center py-2 px-4 rounded-md ${className}`,
      isFocused ? 'bg-blue-100 ' : 'bg-white',
      isFocused && !invalid ? 'border-blue-500' : invalid ? 'border-red-400 ' : 'border-ligthGray-300',
    )}
    >
      {children}
    </View>
  )
}