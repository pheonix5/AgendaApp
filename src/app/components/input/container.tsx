import { View, ViewProps, } from 'react-native'
import clsx from 'clsx'

type InputProps = ViewProps & {
  children: React.ReactNode
  isFocused?: boolean
}

export function InputContainer({ className, children }: InputProps) {
  return (
    <View className={`flex-row gap-4 bg-white p-3 px-4 rounded-md ${className}`}
    >
      {children}
    </View>
  )
}