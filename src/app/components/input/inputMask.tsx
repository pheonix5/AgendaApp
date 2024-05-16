import { StyleSheet } from "react-native";
import { TextInputMask, TextInputMaskProps } from "react-native-masked-text";

export type InputProps = TextInputMaskProps & {
  errorMessage?: string | null
}

export function InputMask({ style, errorMessage, ...rest }: InputProps) {
  const invalid = !!errorMessage;
  return (
    <TextInputMask
      style={[styles.input, style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input:{
    flex: 1
  }
})