import { Text, TextProps } from "react-native"

type Props = TextProps &{
  title: string
}

export function ButtonText({ title, className }: Props) {
  return (
    <Text className={`text-base font-titulo ${className}`}>
      {title}
    </Text>
  )
}