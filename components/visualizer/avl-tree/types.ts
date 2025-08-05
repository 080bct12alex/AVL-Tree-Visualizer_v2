// START OF FILE: components/visualizer/avl-tree/types.ts

export interface AVLTreeNode {
  id: string
  value: number
  height: number
  left: AVLTreeNode | null
  right: AVLTreeNode | null
}

export interface AVLTreeAnalysis {
  nodeCount: number
  height: number
  leafCount: number
  isBalanced: boolean
  minValue: number | null
  maxValue: number | null
  internalNodes: number
  balanceFactors: { [key: string]: number }
  perfectlyBalanced: boolean
}

export interface AVLTreeControlsProps {
  onInsert: (value: number) => void
  onDelete: (value: number) => void
  onClear: () => void
  rotationHistory: string[]
}

// END OF FILE: components/visualizer/avl-tree/types.ts
