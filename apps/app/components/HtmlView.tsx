import { FC, useCallback } from "react";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { Alert, Linking, StyleProp, TextStyle, View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { FontSize, FontWeight, Radius, Spacing } from "@/constants/Sizes";
import { H1_STYLE, H2_STYLE, H3_STYLE, H4_STYLE, H5_STYLE, H6_STYLE } from "@/constants/Styles";
import { useTextColor } from "@/hooks/useTextColor";

const BOLD_STYLE = { fontWeight: FontWeight.bold } as const;
const ITALIC_STYLE = { fontStyle: "italic" } as const;
const UNDERLINE_STYLE = { textDecorationLine: "underline" } as const;

export type HtmlViewerProps = {
  ast: any;
};

// Helper to check if a tag is inline
const isInline = (tag: string) =>
  [
    "strong",
    "b",
    "em",
    "i",
    "u",
    "span",
    "a",
    "code",
    "q",
    "#text",
    "br",
  ].includes(tag);

type TRenderNodeProps = {
  node: any;
  inheritStyles?: StyleProp<TextStyle>;
};

const RenderNode: FC<TRenderNodeProps> = ({
  node,
  inheritStyles,
}) => {
  const colorBackground2 = useThemeColor({}, "background2");
  const colorPrimary = useThemeColor({}, "primary");
  const textColor = useTextColor(node.nodeName)
  const url = (node.attrs ?? []).find((attr) => attr.name === "href")?.value;
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  if (!node) return null;
  const { nodeName, value, childNodes = [] } = node;

  if (nodeName === "#text") {
    return value.trim();
  }
  switch (nodeName) {
    case "p":
      return (
        <ThemedText
          style={[
            inheritStyles,
            { marginBlockEnd: Spacing.size3, fontSize: FontSize.size2 },
          ]}
          accessibilityRole="text"
        >
          {childNodes.map((child: any, i: number) => (
            <RenderNode
              node={child}
              key={i}
            />
          ))}
        </ThemedText>
      );
    case "a":
      return (
        <>
          {" "}
          <ThemedText
            style={[inheritStyles, BOLD_STYLE, { color: colorPrimary }]}
            accessibilityRole="link"
            onPress={handlePress}
          >
            {childNodes.map((child: any, i: number) => (
              <RenderNode
                node={child}
                key={i}
              />
            ))}
          </ThemedText>{" "}
        </>
      );
    case "strong":
    case "b":
      return (
        <>
          {" "}
          <ThemedText
            style={[inheritStyles, BOLD_STYLE]}
            accessibilityRole="text"
          >
            {childNodes.map((child: any, i: number) => (
              <RenderNode
                node={child}
                key={i}
                inheritStyles={BOLD_STYLE}
              />
            ))}
          </ThemedText>{" "}
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
              key={i}
              inheritStyles={UNDERLINE_STYLE}
            />
          ))}
        </ThemedText>
      );
    case "code":
      return (
        <>
          {" "}
          <ThemedText
            style={inheritStyles}
            accessibilityLabel="code"
            type="code"
          >
            {childNodes.map((child: any, i: number) => (
              <RenderNode
                node={child}
                key={i}
              />
            ))}
          </ThemedText>{" "}
        </>
      );
    case "q":
      return (
        <ThemedText
          style={[inheritStyles, ITALIC_STYLE]}
          accessibilityLabel="quote"
        >
          {'"'}
          {childNodes.map((child: any, i: number) => (
            <RenderNode
              node={child}
              key={i}
            />
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
              fontFamily: "monospace",
              backgroundColor: colorBackground2,
              padding: Spacing.size2,
              borderRadius: Radius.size2,
              marginBlock: Spacing.size2,
            },
          ]}
          accessibilityLabel="code block"
        >
          {childNodes.map((child: any, i: number) => (
            <RenderNode
              node={child}
              key={i}
            />
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
              <RenderNode
                node={child}
                key={i}
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
              key={i}
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
                {child.childNodes.map((c: any, j: number) => (
                  <RenderNode
                    node={c}
                    key={j}
                  />
                ))}
              </ThemedText>
            ))}
        </View>
      );
    case "li":
      return (
        <ThemedText
          style={[inheritStyles, { marginLeft: Spacing.size3 }]}
        >
          •{" "}
          {childNodes.map((child: any, i: number) => (
            <RenderNode
              node={child}
              key={i}
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
              key={i}
            />
          ))}
        </ThemedView>
      );
    case "h1":
      return (
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
            />
          ))}
        </ThemedText>
      );
    case "h2":
      return (
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
            />
          ))}
        </ThemedText>
      );
    case "h3":
      return (
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
            />
          ))}
        </ThemedText>
      );
    case "h4":
      return (
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
            />
          ))}
        </ThemedText>
      );
    case "h5":
      return (
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
            />
          ))}
        </ThemedText>
      );
    case "h6":
      return (
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
            />
          ))}
        </ThemedText>
      );
    default:
      // For unknown tags, just render children
      if (Array.isArray(childNodes)) {
        // If all children are inline, wrap in ThemedText for inline flow
        if (childNodes.every((c: any) => isInline(c.nodeName))) {
          return (
            <ThemedText accessibilityRole="text">
              {childNodes.map((child: any, i: number) => (
                <RenderNode
                  node={child}
                  key={i}
                />
              ))}
            </ThemedText>
          );
        } else {
          return childNodes.map((child: any, i: number) => (
            <RenderNode
              node={child}
              key={i}
            />
          ));
        }
      }
      return null;
  }
};

export const HtmlViewer: FC<HtmlViewerProps> = ({ ast }) => {
  // parse5 AST root is usually 'document', so render its children
  if (!ast) return null;
  const { childNodes } = ast;
  return (
    <ThemedView>
      {Array.isArray(childNodes)
        ? childNodes.map((child: any, i: number) => (
            <RenderNode node={child} key={i} />
          ))
        : null}
    </ThemedView>
  );
};
