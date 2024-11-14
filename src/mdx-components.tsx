import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { MDXComponents } from 'mdx/types'
// TODO: change format of the mdx component.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // 使用ReactMarkdown来支持Markdown格式
    Markdown: (props) => <ReactMarkdown {...props} />,
    h1: (props) => <h1 className="text-5xl text-base-content font-bold mt-10 mb-10" {...props} />,
    h2: (props) => <h2 className="text-5xl text-base-content font-semibold mt-5 mb-5" {...props} />,
    h3: (props) => <h3 className="text-4xl text-base-content font-medium mt-3 mb-3" {...props} />,
    p: (props) => <p className="max-w-4xl text-xl text-base-content leading-relaxed mt-3 mb-3 break-all" {...props} />,
    // 添加对普通文本的支持
    text: (props) => <span className="text-xl text-base-content mt-3 mb-3" {...props} />,
    // 添加其他Markdown元素的样式
    ul: (props) => <ul className="list-disc list-inside mb-2 text-base-content" {...props} />,
    ol: (props) => <ol className="list-decimal list-inside mb-2 text-base-content" {...props} />,
    li: (props) => <li className="text-xl text-base-content leading-relaxed mt-3 mb-3" {...props} />,
    blockquote: (props) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-2" {...props} />
    ),
    // 可以继续添加更多组件支持
  }
}