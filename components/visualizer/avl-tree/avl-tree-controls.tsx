"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { AVLTreeControlsProps } from "./types"

export function AVLTreeControls({
  onInsert,
  onDelete,
  onClear,
  rotationHistory,
}: AVLTreeControlsProps) {
  const [value, setValue] = useState("")

  const handleInsert = () => {
    const num = Number(value)
    if (!isNaN(num)) {
      onInsert(num)
      setValue("")
    }
  }

  const handleDelete = () => {
    const num = Number(value)
    if (!isNaN(num)) {
      onDelete(num)
      setValue("")
    }
  }

  return (
    <div className="space-y-4">
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg">Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value"
              onKeyDown={(e) => e.key === 'Enter' && handleInsert()}
              className="flex-1"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <Button onClick={handleInsert}>Insert</Button>
            <Button onClick={handleDelete} variant="secondary">Delete</Button>
            <Button variant="destructive" onClick={onClear}>
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {rotationHistory.length > 0 && (
  <Card className="bg-white/10 backdrop-blur-md border border-white/10 shadow-lg transition-all duration-300 hover:shadow-xl">
    <CardHeader>
      <CardTitle className="text-lg text-white">Rotation History</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col gap-2">
        {rotationHistory.map((rotation, index) => (
          <div
            key={index}
            className="bg-orange-500/10 text-green-400 px-3 py-1.5 rounded-md text-sm font-medium border border-orange-500/20 shadow-inner hover:bg-orange-500/20 transition-colors duration-200"
          >
            {rotation}
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)}

    </div>
  )
}


