import { FC } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Link, LinkProps } from "expo-router";

export type TextLinkProps = {
  children: React.ReactNode;
} & LinkProps;

export const TextLink: FC<TextLinkProps> = ({ children, ...props }) => {
  const colorPrimary = useThemeColor({}, "primary");
  return (
    <Link
      {...props}
      style={{
        textDecorationLine: "underline",
        // ...BOLD_STYLE,
        color: colorPrimary,
      }}
    >
      {children}
    </Link>
  );
};
