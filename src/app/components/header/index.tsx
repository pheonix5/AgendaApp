import { Text, TextProps, View, ViewProps } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

type HeaderTextProps = TextProps & {
  title: string;
};

type HeaderIconProps = {
  children: React.ReactNode;
};

function Header({ children, ...rest }: ViewProps) {
  return <View {...rest}>{children}</View>;
}

function Title({ title, className, ...rest }: HeaderTextProps) {
  return (
    <Text
      className={`text-3xl font-titulo text-Cgray-300 text-center ${className}`}
      {...rest}
    >
      {title}
    </Text>
  );
}

function Icon({ children }: HeaderIconProps) {
  return <FontAwesome6>{children}</FontAwesome6>;
}

Header.Title = Title;
Header.Icon = Icon;

export { Header };
