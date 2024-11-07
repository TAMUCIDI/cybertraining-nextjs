import type { MDXComponents } from 'mdx/types'
// TODO: change format of the mdx component.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}