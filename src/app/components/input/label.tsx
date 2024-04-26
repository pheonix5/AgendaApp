import { Text, TextProps } from 'react-native'

type InputLabelProps = TextProps &{
  label: string
}

export function InputLabel({ label, className, ...rest }: InputLabelProps) {
  return <Text className={`text-white text-lg mb-2 ${className}`} {...rest}>{label}</Text>
}