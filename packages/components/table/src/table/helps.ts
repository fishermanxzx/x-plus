import { TreeProps } from './defaults'

const transformTreeProps = (treeProps: TreeProps) => {
  let hasChildrenProp = 'hasChildren'
  let childrenProp = 'children'
  let expandProp = 'expand'
  if (treeProps) {
    hasChildrenProp = treeProps.hasChildren ?? 'hasChildren'
    childrenProp = treeProps.children ?? 'children'
    expandProp = treeProps.expand ?? 'expand'
  }
  return {
    hasChildrenProp,
    childrenProp,
    expandProp
  }
}
export { transformTreeProps }
