import { TThemedTextType } from "@/components/ThemedText";
import { useThemeColor } from "./useThemeColor";

export const useTextColor = (
  type: TThemedTextType | string,
  color?: "text" | "text2" | "text3"
) => {
  const colorText = useThemeColor({}, "text");
  const colorText2 = useThemeColor({}, "text2");
  const colorText3 = useThemeColor({}, "text3");

  if (color === "text2") {
    return colorText2;
  }

  if (color === "text3") {
    return colorText3;
  }

  if (
    color === "text" ||
    type === "h1" ||
    type === "h2" ||
    type === "h3" ||
    type === "h4" ||
    type === "h5" ||
    type === "h6"
  ) {
    return colorText;
  }

  return colorText2;
};
