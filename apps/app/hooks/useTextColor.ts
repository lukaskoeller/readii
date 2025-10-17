import { TThemedTextType } from "@/components/ThemedText";
import { useThemeColor } from "./useThemeColor";
import { colorsStatus, TColorStatus } from "@/constants/Colors";

export type TTextColor = "text" | "text2" | "text3" | TColorStatus;

export const useTextColor = (
  type: TThemedTextType | string,
  color?: TTextColor
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

  if (Object.keys(colorsStatus).some((key) => key === color)) {
    return colorsStatus[color as TColorStatus];
  }

  return colorText2;
};
