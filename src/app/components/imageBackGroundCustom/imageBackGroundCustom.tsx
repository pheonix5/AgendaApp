import { ImageBackground, ImageBackgroundProps } from "react-native";

type ImageBackgroundCustomProps = ImageBackgroundProps;

export function ImageBackGroundCustom({ source }: ImageBackgroundCustomProps) {
  return (
    <ImageBackground
      source={source}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: 16,
      }}
    />
  );
}
