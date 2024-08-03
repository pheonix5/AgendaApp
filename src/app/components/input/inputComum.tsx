import { StyleSheet, TextInputProps, TextInput } from "react-native";

export type InputProps = TextInputProps & {
  errorMessage?: string | null;
};

export function InputComum({ style, errorMessage, ...rest }: InputProps) {
  const invalid = !!errorMessage;
  return <TextInput style={[styles.input, style]} {...rest} />;
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
  },
});
