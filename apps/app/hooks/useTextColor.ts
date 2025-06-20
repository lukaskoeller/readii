import { TThemedTextType } from "@/components/ThemedText";
import { useThemeColor } from "./useThemeColor";

export const useTextColor = (type: TThemedTextType) => {
  const colorText = useThemeColor({}, "text");
  const colorText2 = useThemeColor({}, "text2");

  if (
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
