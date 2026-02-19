import Image from "next/image";
import React from "react";
import { getStrapiMediaUrl } from "@/lib/strapi";

interface TextNode {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

interface LinkNode {
  type: "link";
  url: string;
  children: TextNode[];
}

interface ListItemNode {
  type: "list-item";
  children: (TextNode | LinkNode)[];
}

interface Block {
  type: "paragraph" | "heading" | "list" | "image" | "quote" | "code";
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  format?: "ordered" | "unordered";
  children: (TextNode | LinkNode | ListItemNode)[];
  image?: {
    url: string;
    alternativeText: string | null;
    width: number;
    height: number;
    caption: string | null;
  };
}

// Heading size map — matches the article's h1 style hierarchy
const headingClasses: Record<number, string> = {
  1: "text-3xl md:text-4xl font-bold text-[#12323A] leading-tight mt-10 mb-4",
  2: "text-2xl md:text-3xl font-bold text-[#12323A] leading-snug mt-8 mb-3",
  3: "text-xl md:text-2xl font-semibold text-[#12323A] leading-snug mt-6 mb-3",
  4: "text-lg font-semibold text-[#12323A] mt-5 mb-2",
  5: "text-base font-semibold text-[#12323A] mt-4 mb-2",
  6: "text-sm font-semibold text-[#388AA3] uppercase tracking-widest mt-4 mb-2",
};

export const BlocksRenderer = ({ blocks }: { blocks: Block[] }) => {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="space-y-0 text-[#12323A]/85 text-[1.0625rem] leading-[1.8]">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading": {
            const level = block.level || 2;
            const Tag = `h${level}` as React.ElementType;
            return (
              <Tag
                key={index}
                className={headingClasses[level] ?? headingClasses[2]}
              >
                {block.children.map((child, i) => renderChild(child, i))}
              </Tag>
            );
          }

          case "paragraph": {
            // Skip empty paragraphs
            if (
              block.children?.length === 1 &&
              (block.children[0] as TextNode).text === ""
            )
              return <div key={index} className="h-3" />;

            return (
              <p
                key={index}
                className="mt-5 first:mt-0 text-[#12323A]/80 leading-[1.85]"
              >
                {block.children.map((child, i) => renderChild(child, i))}
              </p>
            );
          }

          case "list": {
            const ListTag = block.format === "ordered" ? "ol" : "ul";
            const listClass =
              block.format === "ordered"
                ? "list-decimal pl-6 mt-5 space-y-2 text-[#12323A]/80"
                : "mt-5 space-y-2 text-[#12323A]/80";

            return (
              <ListTag key={index} className={listClass}>
                {block.children.map((item, i) => (
                  <li
                    key={i}
                    className={
                      block.format === "unordered"
                        ? "flex items-start gap-2 before:content-['•'] before:text-[#0FA5A1] before:font-bold before:text-lg before:leading-normal"
                        : "leading-relaxed"
                    }
                  >
                    <span>
                      {(item as ListItemNode).children.map((child, ci) =>
                        renderChild(child, ci),
                      )}
                    </span>
                  </li>
                ))}
              </ListTag>
            );
          }

          case "quote": {
            return (
              <blockquote
                key={index}
                className="mt-6 mb-6 border-l-4 border-[#0FA5A1] pl-5 py-1 bg-[#0FA5A1]/5 rounded-r-lg italic text-[#12323A]/70"
              >
                {block.children.map((child, i) => renderChild(child, i))}
              </blockquote>
            );
          }

          case "code": {
            return (
              <pre
                key={index}
                className="mt-6 mb-6 bg-[#12323A]/5 border border-[#12323A]/10 rounded-xl p-5 overflow-x-auto text-sm font-mono text-[#12323A]/80 leading-relaxed"
              >
                <code>
                  {block.children.map((child, i) => renderChild(child, i))}
                </code>
              </pre>
            );
          }

          case "image": {
            const imgUrl = getStrapiMediaUrl(block.image?.url || null);
            if (!imgUrl) return null;
            return (
              <figure key={index} className="mt-8 mb-8">
                <div className="relative w-full overflow-hidden rounded-2xl bg-gray-100">
                  <Image
                    src={imgUrl}
                    alt={block.image?.alternativeText || "Article Image"}
                    width={block.image?.width || 900}
                    height={block.image?.height || 500}
                    className="object-cover w-full h-auto"
                  />
                </div>
                {block.image?.caption && (
                  <figcaption className="text-center text-sm text-[#6B8D96] mt-3 italic">
                    {block.image.caption}
                  </figcaption>
                )}
              </figure>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
};

function renderChild(node: TextNode | LinkNode | ListItemNode, index: number) {
  if (node.type === "text") {
    let content: React.ReactNode = node.text;

    if (node.bold)
      content = (
        <strong key={index} className="font-bold text-[#12323A]">
          {content}
        </strong>
      );
    if (node.italic)
      content = (
        <em key={index} className="italic">
          {content}
        </em>
      );
    if (node.underline)
      content = (
        <u key={index} className="underline underline-offset-2">
          {content}
        </u>
      );
    if (node.strikethrough)
      content = (
        <s key={index} className="line-through opacity-60">
          {content}
        </s>
      );
    if (node.code)
      content = (
        <code
          key={index}
          className="bg-[#0FA5A1]/10 text-[#0FA5A1] rounded px-1.5 py-0.5 font-mono text-[0.875em] font-semibold"
        >
          {content}
        </code>
      );

    return <span key={index}>{content}</span>;
  }

  if (node.type === "link") {
    return (
      <a
        key={index}
        href={node.url}
        className="text-[#0FA5A1] font-medium underline underline-offset-4 hover:text-[#388AA3] transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {node.children.map((child, i) => renderChild(child, i))}
      </a>
    );
  }

  return null;
}
