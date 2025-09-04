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
  TextStyle,
  View,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { FontWeight, Radius, Spacing } from "@/constants/Sizes";
import {
  H1_STYLE,
  H2_STYLE,
  H3_STYLE,
  H4_STYLE,
  H5_STYLE,
  H6_STYLE,
} from "@/constants/Styles";
import { useTextColor } from "@/hooks/useTextColor";
import { DefaultTreeAdapterTypes } from "parse5";
import { Image } from "expo-image";
import { z } from "zod/mini";
import { Video } from "./Video";

const BOLD_STYLE = { fontWeight: FontWeight.bold } as const;
const ITALIC_STYLE = { fontStyle: "italic" } as const;
const UNDERLINE_STYLE = { textDecorationLine: "underline" } as const;

const htmlInlineElements = [
  "a",
  "abbr",
  "acronym", // obsolete
  "b",
  "bdo",
  "big", // obsolete
  "br",
  "button",
  "cite",
  "code",
  "dfn",
  "em",
  "i",
  "img",
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

type TRenderNodeProps = {
  node: DefaultTreeAdapterTypes.ChildNode;
  inheritStyles?: StyleProp<TextStyle>;
  url: string | undefined;
  nextNode: DefaultTreeAdapterTypes.ChildNode | null;
  preserveWhitespace?: boolean;
};

const RenderNode: FC<TRenderNodeProps> = ({
  node,
  inheritStyles,
  url,
  nextNode,
  preserveWhitespace,
}) => {
  const colorBackground2 = useThemeColor({}, "background2");
  const colorPrimary = useThemeColor({}, "primary");
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
      if (parentNode?.nodeName === "#document-fragment") {
        return null;
      }
      if (preserveWhitespace) {
        return value;
      }
      if (shouldAddSingleWhitespace) {
        return `${value.trim()} `;
      }

      return value.trim();
    }
    case "p":
      return (
        <>
          <ThemedText
            style={[inheritStyles, { marginBlock: Spacing.size2 }]}
            accessibilityRole="text"
          >
            {childNodes.map((child: any, i: number) => (
              <RenderNode
                node={child}
                url={url}
                key={i}
                nextNode={childNodes[i + 1] ?? null}
                preserveWhitespace={preserveWhitespace}
              />
            ))}
          </ThemedText>
          {suffix}
        </>
      );
    case "span":
      return (
        <>
          <ThemedText style={[inheritStyles]} accessibilityRole="text">
            {childNodes.map((child: any, i: number) => (
              <RenderNode
                node={child}
                url={url}
                key={i}
                nextNode={childNodes[i + 1] ?? null}
                preserveWhitespace={preserveWhitespace}
              />
            ))}
          </ThemedText>
          {suffix}
        </>
      );
    case "a":
      return (
        <>
          <ThemedText
            style={[inheritStyles, BOLD_STYLE, { color: colorPrimary }]}
            accessibilityRole="link"
            onPress={handlePress}
          >
            {childNodes.map((child: any, i: number) => (
              <RenderNode
                node={child}
                url={url}
                key={i}
                nextNode={childNodes[i + 1] ?? null}
                preserveWhitespace={preserveWhitespace}
              />
            ))}
          </ThemedText>
          {suffix}
        </>
      );
    case "strong":
    case "b":
      return (
        <>
          <ThemedText
            style={[inheritStyles, BOLD_STYLE]}
            accessibilityRole="text"
          >
            {childNodes.map((child: any, i: number) => (
              <RenderNode
                node={child}
                url={url}
                key={i}
                inheritStyles={BOLD_STYLE}
                nextNode={childNodes[i + 1] ?? null}
                preserveWhitespace={preserveWhitespace}
              />
            ))}
          </ThemedText>
          {suffix}
        </>
      );
    case "em":
    case "i":
      return (
        <>
          <ThemedText
            style={[inheritStyles, ITALIC_STYLE]}
            accessibilityRole="text"
          >
            {childNodes.map((child: any, i: number) => (
              <RenderNode
                node={child}
                url={url}
                key={i}
                inheritStyles={ITALIC_STYLE}
                nextNode={childNodes[i + 1] ?? null}
                preserveWhitespace={preserveWhitespace}
              />
            ))}
          </ThemedText>
          {suffix}
        </>
      );
    case "u":
      return (
        <>
          <ThemedText
            style={[inheritStyles, UNDERLINE_STYLE]}
            accessibilityRole="text"
          >
            {childNodes.map((child: any, i: number) => (
              <RenderNode
                node={child}
                url={url}
                key={i}
                inheritStyles={UNDERLINE_STYLE}
                nextNode={childNodes[i + 1] ?? null}
                preserveWhitespace={preserveWhitespace}
              />
            ))}
          </ThemedText>
          {suffix}
        </>
      );
    case "code":
    case "samp":
    case "kbd":
      return (
        <>
          <ThemedText
            style={inheritStyles}
            accessibilityLabel={nodeName}
            type="code"
          >
            {childNodes.map((child: any, i: number) => (
              <RenderNode
                node={child}
                url={url}
                key={i}
                nextNode={childNodes[i + 1] ?? null}
                preserveWhitespace={preserveWhitespace}
              />
            ))}
          </ThemedText>
          {suffix}
        </>
      );
    case "q":
      return (
        <>
          <ThemedText
            style={[inheritStyles, ITALIC_STYLE]}
            accessibilityLabel="quote"
          >
            {'"'}
            {childNodes.map((child: any, i: number) => (
              <RenderNode
                node={child}
                url={url}
                key={i}
                nextNode={childNodes[i + 1] ?? null}
                preserveWhitespace={preserveWhitespace}
              />
            ))}
            {'"'}
          </ThemedText>
          {suffix}
        </>
      );
    case "br":
      return "\n";
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
              {childNodes.map((child: any, i: number) => (
                <RenderNode
                  node={child}
                  url={url}
                  key={i}
                  nextNode={childNodes[i + 1] ?? null}
                  preserveWhitespace
                />
              ))}
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
            {childNodes.map((child: any, i: number) => (
              <RenderNode
                node={child}
                url={url}
                key={i}
                nextNode={childNodes[i + 1] ?? null}
                preserveWhitespace={preserveWhitespace}
              />
            ))}
          </ThemedText>
        </View>
      );
    case "ul":
      return (
        <View
          style={{ marginVertical: Spacing.size2 }}
          accessibilityRole="list"
        >
          {childNodes.map((child: any, i: number) => (
            <RenderNode
              node={child}
              url={url}
              key={i}
              nextNode={childNodes[i + 1] ?? null}
              preserveWhitespace={preserveWhitespace}
            />
          ))}
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
                {child.childNodes.map((c: any, j: number, arr: any[]) => (
                  <RenderNode
                    node={c}
                    url={url}
                    key={j}
                    nextNode={arr[j + 1] ?? null}
                    preserveWhitespace={preserveWhitespace}
                  />
                ))}
              </ThemedText>
            ))}
        </View>
      );
    case "li":
      return (
        <ThemedText style={[inheritStyles, { marginLeft: Spacing.size4 }]}>
          •{" "}
          {childNodes.map((child: any, i: number) => (
            <RenderNode
              node={child}
              url={url}
              key={i}
              nextNode={childNodes[i + 1] ?? null}
              preserveWhitespace={preserveWhitespace}
            />
          ))}
        </ThemedText>
      );
    case "div":
      return (
        <ThemedView>
          {childNodes.map((child: any, i: number) => (
            <RenderNode
              node={child}
              url={url}
              key={i}
              nextNode={childNodes[i + 1] ?? null}
              preserveWhitespace={preserveWhitespace}
            />
          ))}
        </ThemedView>
      );
    case "h1":
      return (
        <>
          <ThemedText
            style={inheritStyles}
            accessibilityRole="header"
            type="h1"
          >
            {childNodes.map((child: any, i: number) => (
              <RenderNode
                node={child}
                key={i}
                inheritStyles={{ ...H1_STYLE, color: textColor }}
                url={url}
                nextNode={childNodes[i + 1] ?? null}
                preserveWhitespace={preserveWhitespace}
              />
            ))}
          </ThemedText>
          {suffix}
        </>
      );
    case "h2":
      return (
        <>
          <ThemedText
            style={inheritStyles}
            accessibilityRole="header"
            type="h2"
          >
            {childNodes.map((child: any, i: number) => (
              <RenderNode
                node={child}
                key={i}
                inheritStyles={{ ...H2_STYLE, color: textColor }}
                url={url}
                nextNode={childNodes[i + 1] ?? null}
                preserveWhitespace={preserveWhitespace}
              />
            ))}
          </ThemedText>
          {suffix}
        </>
      );
    case "h3":
      return (
        <>
          <ThemedText
            style={inheritStyles}
            accessibilityRole="header"
            type="h3"
          >
            {childNodes.map((child: any, i: number) => (
              <RenderNode
                node={child}
                key={i}
                inheritStyles={{ ...H3_STYLE, color: textColor }}
                url={url}
                nextNode={childNodes[i + 1] ?? null}
                preserveWhitespace={preserveWhitespace}
              />
            ))}
          </ThemedText>
          {suffix}
        </>
      );
    case "h4":
      return (
        <>
          <ThemedText
            style={inheritStyles}
            accessibilityRole="header"
            type="h4"
          >
            {childNodes.map((child: any, i: number) => (
              <RenderNode
                node={child}
                key={i}
                inheritStyles={{ ...H4_STYLE, color: textColor }}
                url={url}
                nextNode={childNodes[i + 1] ?? null}
                preserveWhitespace={preserveWhitespace}
              />
            ))}
          </ThemedText>
          {suffix}
        </>
      );
    case "h5":
      return (
        <>
          <ThemedText
            style={inheritStyles}
            accessibilityRole="header"
            type="h5"
          >
            {childNodes.map((child: any, i: number) => (
              <RenderNode
                node={child}
                key={i}
                inheritStyles={{ ...H5_STYLE, color: textColor }}
                url={url}
                nextNode={childNodes[i + 1] ?? null}
                preserveWhitespace={preserveWhitespace}
              />
            ))}
          </ThemedText>
          {suffix}
        </>
      );
    case "h6":
      return (
        <>
          <ThemedText
            style={inheritStyles}
            accessibilityRole="header"
            type="h6"
          >
            {childNodes.map((child: any, i: number) => (
              <RenderNode
                node={child}
                key={i}
                inheritStyles={{ ...H6_STYLE, color: textColor }}
                url={url}
                nextNode={childNodes[i + 1] ?? null}
                preserveWhitespace={preserveWhitespace}
              />
            ))}
          </ThemedText>
          {suffix}
        </>
      );
    case "img": {
      const src = (node.attrs ?? []).find((attr) => attr.name === "src")?.value;
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
      let mainSrc;

      try {
        if (src && src.startsWith("http")) {
          mainSrc = src;
        } else {
          const newSrc = new URL(`${url}${src}`);
          mainSrc = newSrc.toString();
        }
      } catch {
        return null;
      }

      return (
        <ThemedView>
          <Image
            style={[styles.image, { aspectRatio }]}
            source={mainSrc}
            alt={altText}
            contentFit="cover"
          />
        </ThemedView>
      );
    }
    case "video": {
      const videoSrcAttr = (node.attrs ?? []).find(
        (attr) => attr.name === "src"
      )?.value;
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
    case "head":
      return null;
    // case: video, style, picture, source
    default:
      if (isInlineElement) {
        return (
          <>
            <ThemedText style={[inheritStyles, { color: textColor }]}>
              {childNodes.map((child: any, i: number) => (
                <RenderNode
                  node={child}
                  url={url}
                  key={i}
                  nextNode={childNodes[i + 1] ?? null}
                  preserveWhitespace={preserveWhitespace}
                />
              ))}
            </ThemedText>
            {suffix}
          </>
        );
      }
      return (
        <ThemedView>
          {childNodes.map((child: any, i: number) => (
            <RenderNode
              node={child}
              url={url}
              key={i}
              nextNode={childNodes[i + 1] ?? null}
              preserveWhitespace={preserveWhitespace}
            />
          ))}
        </ThemedView>
      );
  }
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    flex: 1,
    display: "flex",
    marginBlock: Spacing.size2,
    overflow: "hidden",
    borderRadius: Radius.size2,
  },
  webview: {
    marginBlock: Spacing.size3,
    width: "100%",
    aspectRatio: 8 / 5,
  },
});

export type HtmlViewerProps = {
  ast: DefaultTreeAdapterTypes.DocumentFragment;
  url: string | undefined;
};

export const HtmlViewer: FC<HtmlViewerProps> = ({ ast, url }) => {
  // parse5 AST root is usually 'document', so render its children
  if (!ast) return null;
  const { childNodes } = ast;

  return (
    <ThemedView>
      {childNodes.map((child: any, i: number) => (
        <RenderNode
          node={child}
          url={url}
          key={i}
          nextNode={childNodes[i + 1] ?? null}
        />
      ))}
    </ThemedView>
  );
};
