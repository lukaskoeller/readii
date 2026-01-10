import { DefaultTreeAdapterTypes } from "parse5";
import { FC } from "react";
import { RenderNode, TRenderNodeProps } from "./HtmlView";
import { ThemedView } from "./ThemedView";

export type RenderNodesProps = {
  nodes: DefaultTreeAdapterTypes.ChildNode[];
} & Omit<TRenderNodeProps, "node" | "nextNode">;

export const RenderNodes: FC<RenderNodesProps> = ({
  nodes,
  url,
  preserveWhitespace,
}) => {
  return nodes.map((child: DefaultTreeAdapterTypes.ChildNode, i: number) => (
    <RenderNode
      node={child}
      url={url}
      key={i}
      nextNode={nodes[i + 1] ?? null}
      preserveWhitespace={preserveWhitespace}
    />
  ));
  //   // Group nodes into sections where each section starts with a media node
  //   let isLastSectionMedia = false;
  //   const nodeSections: DefaultTreeAdapterTypes.ChildNode[][] = [];

  //   nodes.forEach((node) => {
  //     if (
  //       node.nodeName === "img" ||
  //       node.nodeName === "picture" ||
  //       node.nodeName === "video"
  //     ) {
  //       nodeSections.push([node]);
  //       isLastSectionMedia = true;
  //     } else {
  //       if (isLastSectionMedia) {
  //         isLastSectionMedia = false;
  //         nodeSections.at(-1)?.push(node);
  //       } else {
  //         nodeSections.push([node]);
  //       }
  //     }
  //   });

  //   return nodeSections.map(
  //     (nodesSection: DefaultTreeAdapterTypes.ChildNode[], i: number) => (
  //       <ThemedView key={i}>
  //         {nodesSection.map(
  //           (child: DefaultTreeAdapterTypes.ChildNode, j: number) => (
  //             <RenderNode
  //               node={child}
  //               url={url}
  //               key={j}
  //               nextNode={nodes[i + 1] ?? null}
  //               preserveWhitespace={preserveWhitespace}
  //             />
  //           )
  //         )}
  //       </ThemedView>
  //     )
  //   );
};
