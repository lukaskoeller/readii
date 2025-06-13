import { FC, ReactNode } from "react";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { FontSize, FontWeight, Radius, Spacing } from "@/constants/Sizes";

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

const renderNode = (
  node: any,
  key: number,
  colors: { colorBackground2: string }
): ReactNode => {
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
          style={{ marginBlockEnd: Spacing.size3 }}
          accessibilityRole="text"
        >
          {childNodes.map((child: any, i: number) =>
            renderNode(child, i, { colorBackground2: colors.colorBackground2 })
          )}
        </ThemedText>
      );
    case "strong":
    case "b":
      return (
        <ThemedText
          key={key}
          style={{ fontWeight: "bold" }}
          accessibilityRole="text"
        >
          {childNodes.map((child: any, i: number) =>
            renderNode(child, i, { colorBackground2: colors.colorBackground2 })
          )}
        </ThemedText>
      );
    case "em":
    case "i":
      return (
        <ThemedText
          key={key}
          style={{ fontStyle: "italic" }}
          accessibilityRole="text"
        >
          {childNodes.map((child: any, i: number) =>
            renderNode(child, i, { colorBackground2: colors.colorBackground2 })
          )}
        </ThemedText>
      );
    case "u":
      return (
        <ThemedText
          key={key}
          style={{ textDecorationLine: "underline" }}
          accessibilityRole="text"
        >
          {childNodes.map((child: any, i: number) =>
            renderNode(child, i, { colorBackground2: colors.colorBackground2 })
          )}
        </ThemedText>
      );
    case "code":
      return (
        <ThemedText
          key={key}
          style={{
            fontFamily: "monospace",
            backgroundColor: colors.colorBackground2,
            padding: 2,
          }}
          accessibilityLabel="code"
        >
          {childNodes.map((child: any, i: number) =>
            renderNode(child, i, { colorBackground2: colors.colorBackground2 })
          )}
        </ThemedText>
      );
    case "q":
      return (
        <ThemedText
          key={key}
          style={{ fontStyle: "italic" }}
          accessibilityLabel="quote"
        >
          {'"'}
          {childNodes.map((child: any, i: number) =>
            renderNode(child, i, { colorBackground2: colors.colorBackground2 })
          )}
          {'"'}
        </ThemedText>
      );
    case "br":
      return "\n";
    case "pre":
      return (
        <ThemedText
          key={key}
          style={{
            fontFamily: "monospace",
            backgroundColor: colors.colorBackground2,
            padding: Spacing.size2,
            borderRadius: Radius.size2,
            marginBlock: Spacing.size2,
          }}
          accessibilityLabel="code block"
        >
          {childNodes.map((child: any, i: number) =>
            renderNode(child, i, { colorBackground2: colors.colorBackground2 })
          )}
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
          <ThemedText style={{ fontStyle: "italic" }}>
            {childNodes.map((child: any, i: number) =>
              renderNode(child, i, {
                colorBackground2: colors.colorBackground2,
              })
            )}
          </ThemedText>
        </View>
      );
    case "ul":
      return (
        <View key={key} style={{ marginVertical: Spacing.size2 }} accessibilityRole="list">
          {childNodes.map((child: any, i: number) =>
            renderNode(child, i, { colorBackground2: colors.colorBackground2 })
          )}
        </View>
      );
    case "ol":
      return (
        <View key={key} style={{ marginVertical: Spacing.size2 }} accessibilityRole="list">
          {childNodes
            .filter((c: any) => c.nodeName === "li")
            .map((child: any, i: number) => (
              <ThemedText key={i}>
                {i + 1}.{" "}
                {child.childNodes.map((c: any, j: number) =>
                  renderNode(c, j, {
                    colorBackground2: colors.colorBackground2,
                  })
                )}
              </ThemedText>
            ))}
        </View>
      );
    case "li":
      return (
        <ThemedText key={key} style={{ marginLeft: Spacing.size3 }}>
          •{" "}
          {childNodes.map((child: any, i: number) =>
            renderNode(child, i, { colorBackground2: colors.colorBackground2 })
          )}
        </ThemedText>
      );
    case "div":
      return (
        <ThemedView key={key}>
          {childNodes.map((child: any, i: number) =>
            renderNode(child, i, { colorBackground2: colors.colorBackground2 })
          )}
        </ThemedView>
      );
    case "h1":
      return (
        <ThemedText
          key={key}
          style={{
            fontSize: FontSize.size8,
            fontWeight: FontWeight.bold,
            marginBlock: Spacing.size3,
          }}
          accessibilityRole="header"
        >
          {childNodes.map((child: any, i: number) =>
            renderNode(child, i, { colorBackground2: colors.colorBackground2 })
          )}
        </ThemedText>
      );
    case "h2":
      return (
        <ThemedText
          key={key}
          style={{
            fontSize: FontSize.size7,
            fontWeight: FontWeight.bold,
            marginBlock: Spacing.size3,
            paddingBlock: Spacing.size1,
          }}
          accessibilityRole="header"
        >
          {childNodes.map((child: any, i: number) =>
            renderNode(child, i, { colorBackground2: colors.colorBackground2 })
          )}
        </ThemedText>
      );
    case "h3":
      return (
        <ThemedText
          key={key}
          style={{
            fontSize: FontSize.size6,
            fontWeight: FontWeight.bold,
            marginBlock: Spacing.size2,
          }}
          accessibilityRole="header"
        >
          {childNodes.map((child: any, i: number) =>
            renderNode(child, i, { colorBackground2: colors.colorBackground2 })
          )}
        </ThemedText>
      );
    case "h4":
      return (
        <ThemedText
          key={key}
          style={{
            fontSize: FontSize.size4,
            fontWeight: FontWeight.bold,
            marginBlock: Spacing.size2,
          }}
          accessibilityRole="header"
        >
          {childNodes.map((child: any, i: number) =>
            renderNode(child, i, { colorBackground2: colors.colorBackground2 })
          )}
        </ThemedText>
      );
    case "h5":
      return (
        <ThemedText
          key={key}
          style={{
            fontSize: FontSize.size3,
            fontWeight: FontWeight.bold,
            marginBlock: Spacing.size2,
          }}
          accessibilityRole="header"
        >
          {childNodes.map((child: any, i: number) =>
            renderNode(child, i, { colorBackground2: colors.colorBackground2 })
          )}
        </ThemedText>
      );
    case "h6":
      return (
        <ThemedText
          key={key}
          style={{
            fontSize: FontSize.size2,
            fontWeight: FontWeight.bold,
            marginBlock: Spacing.size2,
          }}
          accessibilityRole="header"
        >
          {childNodes.map((child: any, i: number) =>
            renderNode(child, i, { colorBackground2: colors.colorBackground2 })
          )}
        </ThemedText>
      );
    default:
      // For unknown tags, just render children
      if (Array.isArray(childNodes)) {
        // If all children are inline, wrap in ThemedText for inline flow
        if (childNodes.every((c: any) => isInline(c.nodeName))) {
          return (
            <ThemedText key={key} accessibilityRole="text">
              {childNodes.map((child: any, i: number) =>
                renderNode(child, i, {
                  colorBackground2: colors.colorBackground2,
                })
              )}
            </ThemedText>
          );
        } else {
          return childNodes.map((child: any, i: number) =>
            renderNode(child, i, { colorBackground2: colors.colorBackground2 })
          );
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
        ? childNodes.map((child: any, i: number) =>
            renderNode(child, i, { colorBackground2 })
          )
        : null}
    </ThemedView>
  );
};
