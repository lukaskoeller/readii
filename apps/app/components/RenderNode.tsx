import { FC, useCallback } from "react";
import { WebView } from "react-native-webview";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import {
  Alert,
  Linking,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Radius, Spacing } from "@/constants/Sizes";
import {
  BOLD_STYLE,
  H1_STYLE,
  H2_STYLE,
  H3_STYLE,
  H4_STYLE,
  H5_STYLE,
  H6_STYLE,
  ITALIC_STYLE,
  TEXT_DEFAULT_STYLE,
  UNDERLINE_STYLE,
} from "@/constants/Styles";
import { useTextColor } from "@/hooks/useTextColor";
import { DefaultTreeAdapterTypes } from "parse5";
import { Image } from "expo-image";
import { z } from "zod/mini";
import { Video } from "./Video";
import { getNodeValue } from "@/core/utils";
import { RenderNodes } from "./RenderNodes";

const htmlInlineElements = [
  "a",
  "abbr",
  "acronym", // obsolete
  "b",
  "bdo",
  "big", // obsolete
  "br",
  "cite",
  "code",
  "dfn",
  "em",
  "i",
  "input",
  "kbd",
  "label",
  "map",
  "mark",
  "output",
  "q",
  "ruby",
  "s",
  "samp",
  "select",
  "small",
  "span",
  "strong",
  "sub",
  "sup",
  "textarea",
  "time",
  "tt", // obsolete
  "u",
  "var",
  "wbr",
] as const;

const getIsInlineElement = (nodeName: string | null) => {
  return (
    nodeName === "#text" ||
    htmlInlineElements.some((el) => el === nodeName?.toLowerCase())
  );
};

export type TRenderNodeProps = {
  node: DefaultTreeAdapterTypes.ChildNode;
  inheritStyles?: StyleProp<TextStyle>;
  url: string | undefined;
  nextNode: DefaultTreeAdapterTypes.ChildNode | null;
  preserveWhitespace?: boolean;
  /**
   * Is `true` if the parent is wrapped in a `<View>` (`<ThemedView>`) component.
   * This is important for subsequent text nodes to be rendered
   * in a separate `<Text>` (`<ThemedText>`) component.
   */
  isView?: boolean;
  /**
   * Whether sibling nodes contain at least one text node (`#text`)
   * This can be helpful to handle styling of certain elements different.
   * E.g. "img"
   */
  hasTextNodeSibling: boolean;
};

export const RenderNode: FC<TRenderNodeProps> = ({
  node,
  inheritStyles,
  url,
  nextNode,
  preserveWhitespace,
  isView,
  hasTextNodeSibling,
}) => {
  const colorBackground2 = useThemeColor({}, "background2");
  const colorPrimary = useThemeColor({}, "primary");
  const colorBorder = useThemeColor({}, "border");
  const textColor = useTextColor(node.nodeName);
  const href = (node.attrs ?? []).find((attr) => attr.name === "href")?.value;
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(href);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(href);
    } else {
      Alert.alert(`Don't know how to open this URL: ${href}`);
    }
  }, [href]);

  if (!node) return null;
  const { nodeName, value, childNodes = [], parentNode } = node;
  const isInlineElement = getIsInlineElement(nodeName);
  const shouldAddSingleWhitespace =
    !preserveWhitespace &&
    isInlineElement &&
    nextNode &&
    getIsInlineElement(nextNode.nodeName) &&
    (value?.endsWith("") || nextNode?.value?.startsWith(" "));
  const suffix = shouldAddSingleWhitespace ? " " : "";

  switch (nodeName) {
    case "#text": {
      if (preserveWhitespace) {
        return value;
      }

      if (value === "\n") return null;

      if (/^[\n\t]+$/.test(value)) return null;

      if (isView) {
        const trimmedValue = value.trim();
        if (!trimmedValue) return null;
        return (
          <ThemedText style={inheritStyles}>
            {trimmedValue.replaceAll(/[\n\t]/g, " ")}
          </ThemedText>
        );
      }

      if (parentNode?.nodeName === "#document-fragment") {
        return null;
      }

      if (shouldAddSingleWhitespace) {
        return `${value.trim().replaceAll(/[\n\t]/g, " ")} `;
      }

      return value.trim().replaceAll(/[\n\t]/g, "");
    }
    case "#comment":
      return null;
    case "p":
      if (childNodes.length === 0) return null;
      return (
        <ThemedText
          style={[inheritStyles, { marginBlock: Spacing.size2 }]}
          accessibilityRole="text"
        >
          <RenderNodes
            nodes={childNodes}
            url={url}
            preserveWhitespace={preserveWhitespace}
          />
          {suffix}
        </ThemedText>
      );
    case "span":
      return (
        <ThemedText style={[inheritStyles]} accessibilityRole="text">
          <RenderNodes
            nodes={childNodes}
            url={url}
            preserveWhitespace={preserveWhitespace}
          />
          {suffix}
        </ThemedText>
      );
    case "a":
      return (
        <ThemedText
          style={[inheritStyles, BOLD_STYLE, { color: colorPrimary }]}
          accessibilityRole="link"
          onPress={handlePress}
        >
          <RenderNodes
            nodes={childNodes}
            url={url}
            preserveWhitespace={preserveWhitespace}
          />
          {suffix}
        </ThemedText>
      );
    case "strong":
    case "b":
      return (
        <ThemedText
          style={[inheritStyles, BOLD_STYLE]}
          accessibilityRole="text"
        >
          <RenderNodes
            nodes={childNodes}
            url={url}
            preserveWhitespace={preserveWhitespace}
          />
          {suffix}
        </ThemedText>
      );
    case "em":
    case "i":
      return (
        <ThemedText
          style={[inheritStyles, ITALIC_STYLE]}
          accessibilityRole="text"
        >
          <RenderNodes
            nodes={childNodes}
            url={url}
            preserveWhitespace={preserveWhitespace}
            inheritStyles={ITALIC_STYLE}
          />
          {suffix}
        </ThemedText>
      );
    case "u":
      return (
        <ThemedText
          style={[inheritStyles, UNDERLINE_STYLE]}
          accessibilityRole="text"
        >
          <RenderNodes
            nodes={childNodes}
            url={url}
            preserveWhitespace={preserveWhitespace}
            inheritStyles={UNDERLINE_STYLE}
          />
          {suffix}
        </ThemedText>
      );
    case "code":
    case "samp":
    case "kbd":
      return (
        <ThemedText
          style={inheritStyles}
          accessibilityLabel={nodeName}
          type="code"
        >
          <RenderNodes
            nodes={childNodes}
            url={url}
            preserveWhitespace={preserveWhitespace}
          />
          {suffix}
        </ThemedText>
      );
    case "q":
      return (
        <ThemedText
          style={[inheritStyles, ITALIC_STYLE]}
          accessibilityLabel="quote"
        >
          {'"'}
          <RenderNodes
            nodes={childNodes}
            url={url}
            preserveWhitespace={preserveWhitespace}
          />
          {'"'}
          {suffix}
        </ThemedText>
      );
    case "br":
      return <Text>{"\n"}</Text>;
    case "pre":
      return (
        <ScrollView
          horizontal={true}
          style={{
            width: "100%",
            backgroundColor: colorBackground2,
            padding: Spacing.size2,
            borderRadius: Radius.size2,
            marginBlock: Spacing.size2,
            minWidth: "100%",
          }}
        >
          <ThemedView
            style={{
              minWidth: "100%",
            }}
          >
            <ThemedText
              style={inheritStyles}
              accessibilityLabel="code block"
              type="code"
            >
              <RenderNodes
                nodes={childNodes}
                url={url}
                preserveWhitespace={preserveWhitespace}
              />
            </ThemedText>
          </ThemedView>
        </ScrollView>
      );
    case "blockquote":
      return (
        <View
          style={{
            borderLeftWidth: Spacing.size1,
            borderLeftColor: "#ccc",
            paddingLeft: Spacing.size2,
            marginBlock: Spacing.size2,
          }}
          accessibilityLabel="blockquote"
        >
          <ThemedText style={[inheritStyles, ITALIC_STYLE]}>
            <RenderNodes
              nodes={childNodes}
              url={url}
              preserveWhitespace={preserveWhitespace}
            />
          </ThemedText>
        </View>
      );
    case "ul":
      return (
        <View
          style={{ marginVertical: Spacing.size2 }}
          accessibilityRole="list"
        >
          <RenderNodes
            nodes={childNodes}
            url={url}
            preserveWhitespace={preserveWhitespace}
            isView
          />
        </View>
      );
    case "ol":
      return (
        <View
          style={{ marginVertical: Spacing.size2 }}
          accessibilityRole="list"
        >
          {childNodes
            .filter((c: any) => c.nodeName === "li")
            .map((child: any, i: number) => (
              <ThemedText key={i}>
                {i + 1}.{" "}
                <RenderNodes
                  nodes={child.childNodes}
                  url={url}
                  preserveWhitespace={preserveWhitespace}
                />
              </ThemedText>
            ))}
        </View>
      );
    case "li":
      return (
        <ThemedText style={[inheritStyles, { marginLeft: Spacing.size4 }]}>
          •{" "}
          <RenderNodes
            nodes={childNodes}
            url={url}
            preserveWhitespace={preserveWhitespace}
          />
        </ThemedText>
      );
    case "svg":
      return null;
    case "div":
      if (childNodes.length === 0) return null;
      return (
        <ThemedView>
          <RenderNodes
            nodes={childNodes}
            url={url}
            preserveWhitespace={preserveWhitespace}
            isView
          />
        </ThemedView>
      );
    case "h1":
      return (
        <ThemedText style={inheritStyles} accessibilityRole="header" type="h1">
          <RenderNodes
            nodes={childNodes}
            url={url}
            preserveWhitespace={preserveWhitespace}
            inheritStyles={{ ...H1_STYLE, color: textColor }}
          />
          {suffix}
        </ThemedText>
      );
    case "h2":
      return (
        <ThemedText style={inheritStyles} accessibilityRole="header" type="h2">
          <RenderNodes
            nodes={childNodes}
            url={url}
            preserveWhitespace={preserveWhitespace}
            inheritStyles={{ ...H2_STYLE, color: textColor }}
          />
          {suffix}
        </ThemedText>
      );
    case "h3":
      return (
        <ThemedText style={inheritStyles} accessibilityRole="header" type="h3">
          <RenderNodes
            nodes={childNodes}
            url={url}
            preserveWhitespace={preserveWhitespace}
            inheritStyles={{ ...H3_STYLE, color: textColor }}
          />
          {suffix}
        </ThemedText>
      );
    case "h4":
      return (
        <ThemedText style={inheritStyles} accessibilityRole="header" type="h4">
          <RenderNodes
            nodes={childNodes}
            url={url}
            preserveWhitespace={preserveWhitespace}
            inheritStyles={{ ...H4_STYLE, color: textColor }}
          />
          {suffix}
        </ThemedText>
      );
    case "h5":
      return (
        <ThemedText style={inheritStyles} accessibilityRole="header" type="h5">
          <RenderNodes
            nodes={childNodes}
            url={url}
            preserveWhitespace={preserveWhitespace}
            inheritStyles={{ ...H5_STYLE, color: textColor }}
          />
          {suffix}
        </ThemedText>
      );
    case "h6":
      return (
        <ThemedText style={inheritStyles} accessibilityRole="header" type="h6">
          <RenderNodes
            nodes={childNodes}
            url={url}
            preserveWhitespace={preserveWhitespace}
            inheritStyles={{ ...H6_STYLE, color: textColor }}
          />
          {suffix}
        </ThemedText>
      );
    case "img": {
      const srcAttr = (node.attrs ?? []).find(
        (attr) => attr.name === "src"
      )?.value;
      const src: string | undefined = z.safeParse(
        z.catch(z.httpUrl(), `${url}${srcAttr}`),
        srcAttr
      ).data;

      const altText =
        (node.attrs ?? []).find((attr) => attr.name === "alt")?.value || "";
      const imgWidth = (node.attrs ?? []).find(
        (attr) => attr.name === "width"
      )?.value;
      const imgHeight = (node.attrs ?? []).find(
        (attr) => attr.name === "height"
      )?.value;
      const aspectRatio =
        Number(imgWidth) && Number(imgHeight)
          ? Number(imgWidth) / Number(imgHeight)
          : undefined;
      const isSmallImage = Number(imgWidth) && Number(imgWidth) < 100;

      if (hasTextNodeSibling) {
        // Treat as inline image
        return (
          <>
            <ThemedText> </ThemedText>
            <Image
              style={{
                width: TEXT_DEFAULT_STYLE.lineHeight,
                height: TEXT_DEFAULT_STYLE.lineHeight,
              }}
              source={src}
              alt={altText}
              contentFit="contain"
            />
            <ThemedText> </ThemedText>
          </>
        );
      }

      return (
        <ThemedView>
          <Image
            style={[
              styles.image,
              {
                width: isSmallImage ? Number(imgWidth) : "100%",
                aspectRatio: aspectRatio ?? 4 / 3,
                backgroundColor: colorBackground2,
                borderColor: colorBorder,
              },
            ]}
            source={src}
            alt={altText}
            contentFit="contain"
          />
        </ThemedView>
      );
    }
    case "video": {
      let videoSrcAttr = (node.attrs ?? []).find(
        (attr) => attr.name === "src"
      )?.value;
      if (!videoSrcAttr) {
        const videoSrc = getNodeValue(childNodes, "source", (n) => {
          return (n.attrs ?? []).find((attr) => attr.name === "src")?.value;
        });
        if (videoSrc) {
          videoSrcAttr = videoSrc;
        }
      }
      const posterSrcAttr = (node.attrs ?? []).find(
        (attr) => attr.name === "poster"
      )?.value;

      const videoSrc: string | undefined = z.safeParse(
        z.catch(z.httpUrl(), `${url}${videoSrcAttr}`),
        videoSrcAttr
      ).data;
      const posterSrc: string | undefined = z.safeParse(
        z.catch(z.httpUrl(), `${url}${posterSrcAttr}`),
        posterSrcAttr
      ).data;

      if (videoSrc) {
        return (
          <ThemedView>
            <Video source={videoSrc} poster={posterSrc} />
          </ThemedView>
        );
      }
      return null;
    }
    case "iframe":
      const iframeSrc = (node.attrs ?? []).find(
        (attr) => attr.name === "src"
      )?.value;
      if (iframeSrc) {
        return (
          <ThemedView>
            <WebView
              style={[styles.webview, { backgroundColor: colorBackground2 }]}
              source={{ uri: iframeSrc }}
            />
          </ThemedView>
        );
      }
      return null;
    case "dl":
      return (
        <ThemedView
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: Spacing.size3,
            marginBlock: Spacing.size1,
            overflow: "hidden",
          }}
        >
          <RenderNodes
            nodes={childNodes}
            url={url}
            preserveWhitespace={preserveWhitespace}
            isView
          />
        </ThemedView>
      );
    case "dt":
      return (
        <ThemedText
          style={[inheritStyles, BOLD_STYLE, { marginTop: Spacing.size2 }]}
        >
          <RenderNodes
            nodes={childNodes}
            url={url}
            preserveWhitespace={preserveWhitespace}
          />
          {suffix}
        </ThemedText>
      );
    case "dd":
      return (
        <ThemedText style={inheritStyles}>
          <RenderNodes
            nodes={childNodes}
            url={url}
            preserveWhitespace={preserveWhitespace}
          />
          {suffix}
        </ThemedText>
      );
    case "head":
    case "style":
    case "source": // @todo: Use additional sources in "img"
      return null;
    case "picture":
      return (
        <ThemedView>
          <RenderNodes
            nodes={childNodes}
            url={url}
            preserveWhitespace={false}
            isView
          />
        </ThemedView>
      );
    default:
      if (isInlineElement) {
        return (
          <ThemedText style={[inheritStyles, { color: textColor }]}>
            <RenderNodes
              nodes={childNodes}
              url={url}
              preserveWhitespace={preserveWhitespace}
            />
            {suffix}
          </ThemedText>
        );
      }
      return (
        <ThemedView>
          <RenderNodes
            nodes={childNodes}
            url={url}
            preserveWhitespace={preserveWhitespace}
            isView
          />
        </ThemedView>
      );
  }
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    minHeight: 20,
    flexGrow: 1,
    borderRadius: Radius.size5,
    marginBlock: Spacing.size3,
    borderWidth: 1,
  },
  webview: {
    marginBlock: Spacing.size3,
    width: "100%",
    aspectRatio: 8 / 5,
  },
});
