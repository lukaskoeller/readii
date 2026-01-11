import { DefaultTreeAdapterTypes } from "parse5";
import { FC } from "react";
import { RenderNode, TRenderNodeProps } from "./RenderNode";

export type RenderNodesProps = {
  nodes: DefaultTreeAdapterTypes.ChildNode[];
} & Omit<TRenderNodeProps, "node" | "nextNode" | "hasTextNodeSibling">;

export const RenderNodes: FC<RenderNodesProps> = ({
  nodes,
  url,
  preserveWhitespace,
  isView,
}) => {
  const hasTextNodeSibling = nodes.some((node) => node.nodeName === "#text");

  return nodes.map((child: DefaultTreeAdapterTypes.ChildNode, i: number) => (
    <RenderNode
      node={child}
      url={url}
      key={i}
      nextNode={nodes[i + 1] ?? null}
      preserveWhitespace={preserveWhitespace}
      isView={isView}
      hasTextNodeSibling={hasTextNodeSibling}
    />
  ));
};
