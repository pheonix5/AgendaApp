import { TextInput, TextInputProps } from 'react-native'
import clsx from 'clsx';

export type InputProps = TextInputProps & {
  errorMessage?: string | null
}
export function Input({ errorMessage = null, ...rest }: InputProps) {
  const invalid = !!errorMessage;

  return <TextInput
    className={clsx('flex-1')}
 
    {...rest}
  />
}
