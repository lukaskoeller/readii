import { DefaultTreeAdapterTypes } from "parse5";

const MAX_PREVIEW_LENGTH = 220;

const getNodeText = (
  childNodes: DefaultTreeAdapterTypes.ChildNode[],
  currentText: string
) => {
  let text = currentText;
  for (const node of childNodes) {
    if (node.nodeName === "#text") {
      const nodeText = (node as DefaultTreeAdapterTypes.TextNode).value
        .replaceAll("\n", " ")
        .trim();
      text += ` ${nodeText}`;
      if (text.length > MAX_PREVIEW_LENGTH) return text;
    }
    if ("childNodes" in node && node.childNodes.length > 0) {
      text = getNodeText(node.childNodes, text);
      if (text.length > MAX_PREVIEW_LENGTH) return text;
    }
  }

  return text;
};

export const getPreviewText = (
  contentAst: DefaultTreeAdapterTypes.Document
) => {
  if (
    !contentAst ||
    !contentAst.childNodes ||
    contentAst.childNodes.length === 0
  ) {
    return "";
  }
  const previewText = getNodeText(contentAst.childNodes, "");

  return previewText.trim();
};

export const dayMonthYearFormat = Intl.DateTimeFormat(undefined, {
  day: "numeric",
  month: "numeric",
  year: "numeric",
});

/**
 * @license https://github.com/Chalarangelo/30-seconds-of-code?tab=CC-BY-4.0-1-ov-file#readme
 * Changes were applied
 * @see https://www.30secondsofcode.org/js/s/string-case-conversion/#convert-any-case-to-title-case
 */
export const toTitleCase = (string: string) => {
  const formattedString = string
    .toLocaleLowerCase()
    .match(/[\p{Letter}\p{Mark}\p{Number}\p{Symbol}]+/gu)
    ?.map((x) => x.charAt(0).toLocaleUpperCase() + x.slice(1))
    .join(" ");

  return formattedString ?? string;
};

/**
 * Recursively searches for a node and returns its value using the accessor function
 * @param childNodes The child nodes to search within
 * @param nodeName The node name to search for
 * @param accessorFn Function that receives the node and should return its value or `false` if not found
 * @returns The value of the node or `false` if not found
 */
export const getNodeValue = (
  childNodes: DefaultTreeAdapterTypes.Element["childNodes"],
  nodeName: DefaultTreeAdapterTypes.Element["nodeName"],
  accessorFn: (node: DefaultTreeAdapterTypes.ChildNode) => string | false
): string | false => {
  for (const node of childNodes) {
    if (node.nodeName !== nodeName) continue;

    const value = accessorFn(node);
    if (value) {
      return value;
    }
    const hasChildren = "childNodes" in node && node.childNodes.length > 0;
    if (hasChildren) {
      const childValue = getNodeValue(node.childNodes, nodeName, accessorFn);
      if (childValue) return childValue;
    }
    
  }
  return false;
};
