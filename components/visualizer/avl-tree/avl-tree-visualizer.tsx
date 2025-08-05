
"use client"

import { AVLTreeControls } from "@/components/visualizer/avl-tree/avl-tree-controls"
import { AVLTreeDisplay } from "@/components/visualizer/avl-tree/avl-tree-display"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAVLTree } from "@/hooks/use-avl-tree"
import { AVLTreeAnalysis } from "./avl-tree-analysis"


export function AVLTreeVisualizer() {
  const {
    tree,
    highlightedNodes,
    insert,
    delete: deleteNode,
    clear,
    rotationHistory,
  } = useAVLTree()

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">AVL Tree</h1>
        <p className="text-muted-foreground">
          A self-balancing binary search tree where the heights of the two child subtrees
          of any node differ by at most one.
        </p>
      </div>

      <Tabs defaultValue="visualization" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          
        </TabsList>

        <TabsContent value="visualization" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-1 space-y-6">
              <AVLTreeControls
                onInsert={insert}
                onDelete={deleteNode}
                onClear={clear}
                rotationHistory={rotationHistory}
              />
            </div>
            <div className="xl:col-span-2">
              <AVLTreeDisplay
                tree={tree}
                highlightedNodes={highlightedNodes}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analysis">
          <AVLTreeAnalysis tree={tree} />
        </TabsContent>

        
      </Tabs>
    </div>
  )
}


