import { FC, useCallback } from "react";
import { WebView } from "react-native-webview";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import {
  Alert,
  Linking,
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

const BOLD_STYLE = { fontWeight: FontWeight.bold } as const;
const ITALIC_STYLE = { fontStyle: "italic" } as const;
const UNDERLINE_STYLE = { textDecorationLine: "underline" } as const;

type TRenderNodeProps = {
  node: DefaultTreeAdapterTypes.ChildNode;
  inheritStyles?: StyleProp<TextStyle>;
  url: string | undefined;
};

const RenderNode: FC<TRenderNodeProps> = ({ node, inheritStyles, url }) => {
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

  switch (nodeName) {
    case "#text":
      if (value.trim() === "") {
        return null; // Ignore empty text nodes
      }

      if (
        parentNode?.nodeName === "h1" ||
        parentNode?.nodeName === "h2" ||
        parentNode?.nodeName === "h3" ||
        parentNode?.nodeName === "h4" ||
        parentNode?.nodeName === "h5" ||
        parentNode?.nodeName === "h6"
      ) {
        return `${value.trim()} `;
      }

      if (
        parentNode?.nodeName === "body" ||
        parentNode?.nodeName === "picture"
      ) {
        return (
          <ThemedText
            style={[inheritStyles, { color: textColor }]}
            accessibilityRole="text"
          >
            {value}
          </ThemedText>
        )
      }

      return value;
    case "p":
      return (
        <ThemedText
          style={[inheritStyles, { marginBlock: Spacing.size2 }]}
          accessibilityRole="text"
        >
          {childNodes.map((child: any, i: number) => (
            <RenderNode node={child} url={url} key={i} />
          ))}
        </ThemedText>
      );
    case "span":
      return (
        <ThemedText style={[inheritStyles]} accessibilityRole="text">
          {childNodes.map((child: any, i: number) => (
            <RenderNode node={child} url={url} key={i} />
          ))}
        </ThemedText>
      );
    case "a":
      return (
        <ThemedText
          style={[inheritStyles, BOLD_STYLE, { color: colorPrimary }]}
          accessibilityRole="link"
          onPress={handlePress}
        >
          {childNodes.map((child: any, i: number) => (
            <RenderNode node={child} url={url} key={i} />
          ))}
        </ThemedText>
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
              />
            ))}
          </ThemedText>
        </>
      );
    case "em":
    case "i":
      return (
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
            />
          ))}
        </ThemedText>
      );
    case "u":
      return (
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
            />
          ))}
        </ThemedText>
      );
    case "code":
      return (
        <ThemedText style={inheritStyles} accessibilityLabel="code" type="code">
          {childNodes.map((child: any, i: number) => (
            <RenderNode node={child} url={url} key={i} />
          ))}
        </ThemedText>
      );
    case "q":
      return (
        <ThemedText
          style={[inheritStyles, ITALIC_STYLE]}
          accessibilityLabel="quote"
        >
          {'"'}
          {childNodes.map((child: any, i: number) => (
            <RenderNode node={child} url={url} key={i} />
          ))}
          {'"'}
        </ThemedText>
      );
    case "br":
      return "\n";
    case "pre":
      return (
        <ThemedText
          style={[
            inheritStyles,
            {
              backgroundColor: colorBackground2,
              padding: Spacing.size2,
              borderRadius: Radius.size2,
              marginBlock: Spacing.size2,
            },
          ]}
          accessibilityLabel="code block"
          type="code"
        >
          {childNodes.map((child: any, i: number) => (
            <RenderNode node={child} url={url} key={i} />
          ))}
        </ThemedText>
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
              <RenderNode node={child} url={url} key={i} />
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
            <RenderNode node={child} url={url} key={i} />
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
                {child.childNodes.map((c: any, j: number) => (
                  <RenderNode node={c} url={url} key={j} />
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
            <RenderNode node={child} url={url} key={i} />
          ))}
        </ThemedText>
      );
    case "div":
      return (
        <ThemedView>
          {childNodes.map((child: any, i: number) => (
            <RenderNode node={child} url={url} key={i} />
          ))}
        </ThemedView>
      );
    case "h1":
      return (
        <ThemedText style={inheritStyles} accessibilityRole="header" type="h1">
          {childNodes.map((child: any, i: number) => (
            <RenderNode
              node={child}
              key={i}
              inheritStyles={{ ...H1_STYLE, color: textColor }}
              url={url}
            />
          ))}
        </ThemedText>
      );
    case "h2":
      return (
        <ThemedText style={inheritStyles} accessibilityRole="header" type="h2">
          {childNodes.map((child: any, i: number) => (
            <RenderNode
              node={child}
              key={i}
              inheritStyles={{ ...H2_STYLE, color: textColor }}
              url={url}
            />
          ))}
        </ThemedText>
      );
    case "h3":
      return (
        <ThemedText style={inheritStyles} accessibilityRole="header" type="h3">
          {childNodes.map((child: any, i: number) => (
            <RenderNode
              node={child}
              key={i}
              inheritStyles={{ ...H3_STYLE, color: textColor }}
              url={url}
            />
          ))}
        </ThemedText>
      );
    case "h4":
      return (
        <ThemedText style={inheritStyles} accessibilityRole="header" type="h4">
          {childNodes.map((child: any, i: number) => (
            <RenderNode
              node={child}
              key={i}
              inheritStyles={{ ...H4_STYLE, color: textColor }}
              url={url}
            />
          ))}
        </ThemedText>
      );
    case "h5":
      return (
        <ThemedText style={inheritStyles} accessibilityRole="header" type="h5">
          {childNodes.map((child: any, i: number) => (
            <RenderNode
              node={child}
              key={i}
              inheritStyles={{ ...H5_STYLE, color: textColor }}
              url={url}
            />
          ))}
        </ThemedText>
      );
    case "h6":
      return (
        <ThemedText style={inheritStyles} accessibilityRole="header" type="h6">
          {childNodes.map((child: any, i: number) => (
            <RenderNode
              node={child}
              key={i}
              inheritStyles={{ ...H6_STYLE, color: textColor }}
              url={url}
            />
          ))}
        </ThemedText>
      );
    case "img":
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
      return (
        <ThemedView>
          {childNodes.map((child: any, i: number) => (
            <RenderNode node={child} url={url} key={i} />
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
  ast: DefaultTreeAdapterTypes.Document;
  url: string | undefined;
};

export const HtmlViewer: FC<HtmlViewerProps> = ({ ast, url }) => {
  // parse5 AST root is usually 'document', so render its children
  if (!ast) return null;
  const { childNodes } = ast;

  return (
    <ThemedView>
      {childNodes.map((child: any, i: number) => (
        <RenderNode node={child} url={url} key={i} />
      ))}
    </ThemedView>
  );
};
