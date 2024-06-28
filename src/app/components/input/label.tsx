/* eslint-disable react/react-in-jsx-scope */
import { Text, TextProps } from 'react-native'
import clsx from 'clsx'

type InputLabelProps = TextProps & {
  label: string
}

export function InputLabel({ label, className, ...rest }: InputLabelProps) {
  return <Text
    className={clsx(`text-lg mb-2  ${className}`,
    
    )}
    {...rest}
  >
    {label}
  </Text>
}