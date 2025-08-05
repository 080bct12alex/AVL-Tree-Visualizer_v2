import { useState, useCallback } from "react"
import { AVLTreeNode } from "@/components/visualizer/avl-tree/types"

// Unique ID counter for each node
let nodeIdCounter = 0

// Custom React Hook for AVL Tree logic
export function useAVLTree() {
  const [tree, setTree] = useState<AVLTreeNode | null>(null)
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([])
  const [rotationHistory, setRotationHistory] = useState<string[]>([])

  // Highlight a node temporarily (for visual feedback)
  const highlightNode = useCallback((nodeId: string) => {
    setHighlightedNodes(prev => [...prev, nodeId])
    setTimeout(() => {
      setHighlightedNodes(prev => prev.filter(id => id !== nodeId))
    }, 2500)
  }, [])

  // Get height of a node
  const getHeight = (node: AVLTreeNode | null): number => {
    return node ? node.height : 0
  }

  // Calculate balance factor of a node
  const getBalance = (node: AVLTreeNode | null): number => {
    return node ? getHeight(node.left) - getHeight(node.right) : 0
  }

  // Recalculate and return updated height
  const updateHeight = (node: AVLTreeNode): number => {
    return Math.max(getHeight(node.left), getHeight(node.right)) + 1
  }

  // Right Rotation (LL case)
  const rightRotate = (y: AVLTreeNode): AVLTreeNode => {
    highlightNode(y.id)
    const x = y.left!
    const T2 = x.right

    x.right = y
    y.left = T2

    y.height = updateHeight(y)
    x.height = updateHeight(x)

    setRotationHistory(prev => [...prev, `Right rotation at node ${y.value}`])
    return x
  }

  // Left Rotation (RR case)
  const leftRotate = (x: AVLTreeNode): AVLTreeNode => {
    highlightNode(x.id)
    const y = x.right!
    const T2 = y.left

    y.left = x
    x.right = T2

    x.height = updateHeight(x)
    y.height = updateHeight(y)

    setRotationHistory(prev => [...prev, `Left rotation at node ${x.value}`])
    return y
  }

  // Insert a value into the AVL tree
  const insert = (value: number) => {
    if (isNaN(value)) return

    const insertNode = (node: AVLTreeNode | null): AVLTreeNode => {
      if (!node) {
        const newNodeId = `node-${nodeIdCounter++}`
        highlightNode(newNodeId)
        return {
          id: newNodeId,
          value,
          height: 1,
          left: null,
          right: null,
        }
      }

      const newNode = { ...node }

      if (value < newNode.value) {
        newNode.left = insertNode(newNode.left)
      } else if (value > newNode.value) {
        newNode.right = insertNode(newNode.right)
      } else {
        return newNode // Duplicates not allowed
      }

      newNode.height = updateHeight(newNode)
      const balance = getBalance(newNode)

      if (balance > 1 && value < newNode.left!.value) {
        return rightRotate(newNode) // LL
      }
      if (balance < -1 && value > newNode.right!.value) {
        return leftRotate(newNode) // RR
      }
      if (balance > 1 && value > newNode.left!.value) {
        newNode.left = leftRotate(newNode.left!)
        return rightRotate(newNode) // LR
      }
      if (balance < -1 && value < newNode.right!.value) {
        newNode.right = rightRotate(newNode.right!)
        return leftRotate(newNode) // RL
      }

      return newNode
    }

    setTree(prevTree => insertNode(prevTree))
  }

  // Helper: Find the node with minimum value (used during deletion)
  const findMin = (node: AVLTreeNode): AVLTreeNode => {
    return node.left ? findMin(node.left) : node
  }

  // Delete a value from the AVL tree
  const deleteNode = (value: number) => {
    if (isNaN(value)) return

    const deleteNodeHelper = (
      node: AVLTreeNode | null,
      val: number
    ): AVLTreeNode | null => {
      if (!node) return null

      if (val < node.value) {
        node.left = deleteNodeHelper(node.left, val)
      } else if (val > node.value) {
        node.right = deleteNodeHelper(node.right, val)
      } else {
        highlightNode(node.id)

        // Node with one child or none
        if (!node.left || !node.right) {
          return node.left || node.right
        }

        // Node with two children
        const successor = findMin(node.right)
        node.value = successor.value
        node.right = deleteNodeHelper(node.right, successor.value)
      }

      node.height = updateHeight(node)
      const balance = getBalance(node)

      // LL
      if (balance > 1 && getBalance(node.left) >= 0) {
        return rightRotate(node)
      }

      // LR
      if (balance > 1 && getBalance(node.left) < 0) {
        node.left = leftRotate(node.left!)
        return rightRotate(node)
      }

      // RR
      if (balance < -1 && getBalance(node.right) <= 0) {
        return leftRotate(node)
      }

      // RL
      if (balance < -1 && getBalance(node.right) > 0) {
        node.right = rightRotate(node.right!)
        return leftRotate(node)
      }

      return node
    }

    setTree(prevTree => deleteNodeHelper(prevTree, value))
  }

  // Clear the entire tree and history
  const clear = () => {
    setTree(null)
    setHighlightedNodes([])
    setRotationHistory([])
  }

  return {
    tree,
    highlightedNodes,
    rotationHistory,
    insert,
    delete: deleteNode,
    clear,
  }
}
