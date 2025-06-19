import { FC, useCallback } from "react";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { Alert, Linking, StyleProp, TextStyle, View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { FontSize, FontWeight, Radius, Spacing } from "@/constants/Sizes";

const BOLD_STYLE = { fontWeight: "bold" } as const;
const ITALIC_STYLE = { fontStyle: "italic" } as const;
const UNDERLINE_STYLE = { textDecorationLine: "underline" } as const;
const H1_STYLE = {
  fontSize: FontSize.size8,
  fontWeight: FontWeight.bold,
  marginBlock: Spacing.size3,
} as const;
const H2_STYLE = {
  fontSize: FontSize.size7,
  fontWeight: FontWeight.bold,
  marginBlock: Spacing.size3,
  paddingBlock: Spacing.size1,
  lineHeight: FontSize.size7 * 1.3,
} as const;
const H3_STYLE = {
  fontSize: FontSize.size6,
  fontWeight: FontWeight.bold,
  marginBlock: Spacing.size2,
} as const;
const H4_STYLE = {
  fontSize: FontSize.size4,
  fontWeight: FontWeight.bold,
  marginBlock: Spacing.size2,
} as const;
const H5_STYLE = {
  fontSize: FontSize.size3,
  fontWeight: FontWeight.bold,
  marginBlock: Spacing.size2,
} as const;
const H6_STYLE = {
  fontSize: FontSize.size2,
  fontWeight: FontWeight.bold,
  marginBlock: Spacing.size2,
} as const;

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
  key: number;
  colors: { colorBackground2: string };
  inheritStyles?: StyleProp<TextStyle>;
};

const RenderNode: FC<TRenderNodeProps> = ({
  node,
  key,
  colors,
  inheritStyles,
}) => {
  const url = node.attributes?.href || "";
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
          key={key}
          style={[inheritStyles, { marginBlockEnd: Spacing.size3 }]}
          accessibilityRole="text"
        >
          {childNodes.map((child: any, i: number) => (
            <RenderNode
              node={child}
              key={i}
              colors={{ colorBackground2: colors.colorBackground2 }}
            />
          ))}
        </ThemedText>
      );
    case "a":
      return (
        <>
          {" "}
          <ThemedText
            key={key}
            style={inheritStyles}
            accessibilityRole="link"
            onPress={handlePress}
          >
            {childNodes.map((child: any, i: number) => (
              <RenderNode
                node={child}
                key={i}
                colors={{ colorBackground2: colors.colorBackground2 }}
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
            key={key}
            style={[inheritStyles, BOLD_STYLE]}
            accessibilityRole="text"
          >
            {childNodes.map((child: any, i: number) => (
              <RenderNode
                node={child}
                key={i}
                colors={{ colorBackground2: colors.colorBackground2 }}
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
          key={key}
          style={[inheritStyles, ITALIC_STYLE]}
          accessibilityRole="text"
        >
          {childNodes.map((child: any, i: number) => (
            <RenderNode
              node={child}
              key={i}
              colors={{ colorBackground2: colors.colorBackground2 }}
              inheritStyles={ITALIC_STYLE}
            />
          ))}
        </ThemedText>
      );
    case "u":
      return (
        <ThemedText
          key={key}
          style={[inheritStyles, UNDERLINE_STYLE]}
          accessibilityRole="text"
        >
          {childNodes.map((child: any, i: number) => (
            <RenderNode
              node={child}
              key={i}
              colors={{ colorBackground2: colors.colorBackground2 }}
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
            key={key}
            style={[
              inheritStyles,
              {
                fontFamily: "monospace",
                backgroundColor: colors.colorBackground2,
                padding: 2,
                borderRadius: Radius.size3,
              },
            ]}
            accessibilityLabel="code"
          >
            {childNodes.map((child: any, i: number) => (
              <RenderNode
                node={child}
                key={i}
                colors={{ colorBackground2: colors.colorBackground2 }}
              />
            ))}
          </ThemedText>{" "}
        </>
      );
    case "q":
      return (
        <ThemedText
          key={key}
          style={[inheritStyles, ITALIC_STYLE]}
          accessibilityLabel="quote"
        >
          {'"'}
          {childNodes.map((child: any, i: number) => (
            <RenderNode
              node={child}
              key={i}
              colors={{ colorBackground2: colors.colorBackground2 }}
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
          key={key}
          style={[
            inheritStyles,
            {
              fontFamily: "monospace",
              backgroundColor: colors.colorBackground2,
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
              colors={{ colorBackground2: colors.colorBackground2 }}
            />
          ))}
        </ThemedText>
      );
    case "blockquote":
      return (
        <View
          key={key}
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
                colors={{ colorBackground2: colors.colorBackground2 }}
              />
            ))}
          </ThemedText>
        </View>
      );
    case "ul":
      return (
        <View
          key={key}
          style={{ marginVertical: Spacing.size2 }}
          accessibilityRole="list"
        >
          {childNodes.map((child: any, i: number) => (
            <RenderNode
              node={child}
              key={i}
              colors={{ colorBackground2: colors.colorBackground2 }}
            />
          ))}
        </View>
      );
    case "ol":
      return (
        <View
          key={key}
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
                    colors={{ colorBackground2: colors.colorBackground2 }}
                  />
                ))}
              </ThemedText>
            ))}
        </View>
      );
    case "li":
      return (
        <ThemedText
          key={key}
          style={[inheritStyles, { marginLeft: Spacing.size3 }]}
        >
          •{" "}
          {childNodes.map((child: any, i: number) => (
            <RenderNode
              node={child}
              key={i}
              colors={{ colorBackground2: colors.colorBackground2 }}
            />
          ))}
        </ThemedText>
      );
    case "div":
      return (
        <ThemedView key={key}>
          {childNodes.map((child: any, i: number) => (
            <RenderNode
              node={child}
              key={i}
              colors={{ colorBackground2: colors.colorBackground2 }}
            />
          ))}
        </ThemedView>
      );
    case "h1":
      return (
        <ThemedText
          key={key}
          style={[inheritStyles, H1_STYLE]}
          accessibilityRole="header"
        >
          {childNodes.map((child: any, i: number) => (
            <RenderNode
              node={child}
              key={i}
              colors={{ colorBackground2: colors.colorBackground2 }}
              inheritStyles={H1_STYLE}
            />
          ))}
        </ThemedText>
      );
    case "h2":
      return (
        <ThemedText
          key={key}
          style={[inheritStyles, H2_STYLE]}
          accessibilityRole="header"
        >
          {childNodes.map((child: any, i: number) => (
            <RenderNode
              node={child}
              key={i}
              colors={{ colorBackground2: colors.colorBackground2 }}
              inheritStyles={H2_STYLE}
            />
          ))}
        </ThemedText>
      );
    case "h3":
      return (
        <ThemedText
          key={key}
          style={[inheritStyles, H3_STYLE]}
          accessibilityRole="header"
        >
          {childNodes.map((child: any, i: number) => (
            <RenderNode
              node={child}
              key={i}
              colors={{ colorBackground2: colors.colorBackground2 }}
              inheritStyles={H3_STYLE}
            />
          ))}
        </ThemedText>
      );
    case "h4":
      return (
        <ThemedText
          key={key}
          style={[inheritStyles, H4_STYLE]}
          accessibilityRole="header"
        >
          {childNodes.map((child: any, i: number) => (
            <RenderNode
              node={child}
              key={i}
              colors={{ colorBackground2: colors.colorBackground2 }}
              inheritStyles={H4_STYLE}
            />
          ))}
        </ThemedText>
      );
    case "h5":
      return (
        <ThemedText
          key={key}
          style={[inheritStyles, H5_STYLE]}
          accessibilityRole="header"
        >
          {childNodes.map((child: any, i: number) => (
            <RenderNode
              node={child}
              key={i}
              colors={{ colorBackground2: colors.colorBackground2 }}
              inheritStyles={H5_STYLE}
            />
          ))}
        </ThemedText>
      );
    case "h6":
      return (
        <ThemedText
          key={key}
          style={[inheritStyles, H6_STYLE]}
          accessibilityRole="header"
        >
          {childNodes.map((child: any, i: number) => (
            <RenderNode
              node={child}
              key={i}
              colors={{ colorBackground2: colors.colorBackground2 }}
              inheritStyles={H6_STYLE}
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
            <ThemedText key={key} accessibilityRole="text">
              {childNodes.map((child: any, i: number) => (
                <RenderNode
                  node={child}
                  key={i}
                  colors={{ colorBackground2: colors.colorBackground2 }}
                />
              ))}
            </ThemedText>
          );
        } else {
          return childNodes.map((child: any, i: number) => (
            <RenderNode
              node={child}
              key={i}
              colors={{ colorBackground2: colors.colorBackground2 }}
            />
          ));
        }
      }
      return null;
  }
};

export const HtmlViewer: FC<HtmlViewerProps> = ({ ast }) => {
  // parse5 AST root is usually 'document', so render its children
  const colorBackground2 = useThemeColor({}, "background2");
  if (!ast) return null;
  const { childNodes } = ast;
  return (
    <ThemedView>
      {Array.isArray(childNodes)
        ? childNodes.map((child: any, i: number) => (
            <RenderNode node={child} key={i} colors={{ colorBackground2 }} />
          ))
        : null}
    </ThemedView>
  );
};
