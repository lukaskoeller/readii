import { FC } from "react";
import {
  FlatList,
} from "react-native";
import { DefaultTreeAdapterTypes } from "parse5";
import { RenderNode } from "./RenderNode";

export type HtmlViewerProps = {
  ast: DefaultTreeAdapterTypes.DocumentFragment;
  url: string | undefined;
};

/**
 * 
 * @deprecated
 */
export const HtmlViewer: FC<HtmlViewerProps> = ({ ast, url }) => {
  // parse5 AST root is usually 'document', so render its children
  if (!ast) return null;
  const { childNodes } = ast;

  return (
    <FlatList
      scrollEnabled={false}
      data={childNodes}
      renderItem={({ item, index }) => (
        <RenderNode
          node={item}
          url={url}
          key={index}
          nextNode={childNodes[index + 1] ?? null}
          isView
        />
      )}
    />
  );
};
