"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Type,
  ImageIcon,
  Square,
  Circle,
  Download,
  Save,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Sparkles,
  Layers,
  Eye,
  EyeOff,
} from "lucide-react"
import { useDesign } from "@/contexts/design-context"
import { useAuth } from "@/contexts/auth-context"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AIContentGenerator } from "@/components/ai-content-generator"
import { ColorPicker } from "@/components/color-picker"
import { useToast } from "@/hooks/use-toast"

interface CanvasElement {
  id: string
  type: "text" | "image" | "shape"
  x: number
  y: number
  width: number
  height: number
  content: string
  style: {
    fontSize?: number
    fontFamily?: string
    color?: string
    backgroundColor?: string
    borderRadius?: number
    fontWeight?: string
    fontStyle?: string
    textDecoration?: string
    textAlign?: string
  }
  visible: boolean
}

export default function DesignPage() {
  const { user } = useAuth()
  const { currentDesign, setCurrentDesign, saveDesign, exportDesign } = useDesign()
  const { toast } = useToast()
  const canvasRef = useRef<HTMLDivElement>(null)

  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [showAIGenerator, setShowAIGenerator] = useState(false)
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 })
  const [zoom, setZoom] = useState(100)
  const [elements, setElements] = useState<CanvasElement[]>([])

  useEffect(() => {
    if (!currentDesign) {
      // Initialize new design
      const newDesign = {
        id: Date.now().toString(),
        name: "Untitled Design",
        elements: [],
        canvas: {
          width: 800,
          height: 600,
          backgroundColor: "#ffffff",
        },
      }
      setCurrentDesign(newDesign)
    } else {
      setElements(
        currentDesign.elements.map((el) => ({
          ...el,
          visible: true,
        })),
      )
    }
  }, [currentDesign, setCurrentDesign])

  const addTextElement = () => {
    const newElement: CanvasElement = {
      id: Date.now().toString(),
      type: "text",
      x: 100,
      y: 100,
      width: 200,
      height: 50,
      content: "Click to edit text",
      style: {
        fontSize: 24,
        fontFamily: "Inter",
        color: "#000000",
        textAlign: "left",
      },
      visible: true,
    }
    setElements([...elements, newElement])
  }

  const addImageElement = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const newElement: CanvasElement = {
            id: Date.now().toString(),
            type: "image",
            x: 150,
            y: 150,
            width: 200,
            height: 150,
            content: e.target?.result as string,
            style: {},
            visible: true,
          }
          setElements([...elements, newElement])
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  const addShapeElement = (shapeType: "rectangle" | "circle") => {
    const newElement: CanvasElement = {
      id: Date.now().toString(),
      type: "shape",
      x: 200,
      y: 200,
      width: 100,
      height: 100,
      content: shapeType,
      style: {
        backgroundColor: "#3B82F6",
        borderRadius: shapeType === "circle" ? 50 : 0,
      },
      visible: true,
    }
    setElements([...elements, newElement])
  }

  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    setElements(elements.map((el) => (el.id === id ? { ...el, ...updates } : el)))
  }

  const deleteElement = (id: string) => {
    setElements(elements.filter((el) => el.id !== id))
    if (selectedElement === id) {
      setSelectedElement(null)
    }
  }

  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    e.preventDefault()
    setSelectedElement(elementId)
    setIsDragging(true)

    const element = elements.find((el) => el.id === elementId)
    if (element) {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left - element.x,
          y: e.clientY - rect.top - element.y,
        })
      }
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && selectedElement) {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (rect) {
        const newX = e.clientX - rect.left - dragOffset.x
        const newY = e.clientY - rect.top - dragOffset.y

        updateElement(selectedElement, { x: newX, y: newY })
      }
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleSave = async () => {
    if (currentDesign) {
      const updatedDesign = {
        ...currentDesign,
        elements: elements.map(({ visible, ...el }) => el),
      }
      setCurrentDesign(updatedDesign)
      await saveDesign()
      toast({
        title: "Design saved",
        description: "Your design has been saved successfully.",
      })
    }
  }

  const handleExport = async (format: "png" | "jpg" | "pdf") => {
    await exportDesign(format)
    toast({
      title: "Export started",
      description: `Your design is being exported as ${format.toUpperCase()}.`,
    })
  }

  const selectedElementData = selectedElement ? elements.find((el) => el.id === selectedElement) : null

  return (
    <DashboardLayout>
      <div className="h-screen flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold">Design Editor</h1>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Undo className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Redo className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => setShowAIGenerator(true)}>
                <Sparkles className="mr-2 h-4 w-4" />
                AI Generate
              </Button>
              <Button variant="outline" onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button onClick={() => handleExport("png")} className="bg-blue-600 hover:bg-blue-700">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - Tools */}
          <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
            <div className="space-y-6">
              {/* Add Elements */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Add Elements</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" onClick={addTextElement}>
                    <Type className="mr-2 h-4 w-4" />
                    Text
                  </Button>
                  <Button variant="outline" size="sm" onClick={addImageElement}>
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Image
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => addShapeElement("rectangle")}>
                    <Square className="mr-2 h-4 w-4" />
                    Rectangle
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => addShapeElement("circle")}>
                    <Circle className="mr-2 h-4 w-4" />
                    Circle
                  </Button>
                </div>
              </div>

              {/* Layers */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Layers</h3>
                <div className="space-y-2">
                  {elements.map((element, index) => (
                    <div
                      key={element.id}
                      className={`flex items-center justify-between p-2 rounded cursor-pointer ${
                        selectedElement === element.id ? "bg-blue-100" : "hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedElement(element.id)}
                    >
                      <div className="flex items-center space-x-2">
                        {element.type === "text" && <Type className="h-4 w-4" />}
                        {element.type === "image" && <ImageIcon className="h-4 w-4" />}
                        {element.type === "shape" && <Square className="h-4 w-4" />}
                        <span className="text-sm truncate">
                          {element.type === "text" ? element.content : `${element.type} ${index + 1}`}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          updateElement(element.id, { visible: !element.visible })
                        }}
                      >
                        {element.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 bg-gray-100 p-8 overflow-auto">
            <div className="flex items-center justify-center min-h-full">
              <div
                ref={canvasRef}
                className="relative bg-white shadow-lg"
                style={{
                  width: canvasSize.width,
                  height: canvasSize.height,
                  transform: `scale(${zoom / 100})`,
                }}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {elements
                  .filter((el) => el.visible)
                  .map((element) => (
                    <div
                      key={element.id}
                      className={`absolute cursor-move ${selectedElement === element.id ? "ring-2 ring-blue-500" : ""}`}
                      style={{
                        left: element.x,
                        top: element.y,
                        width: element.width,
                        height: element.height,
                        ...element.style,
                      }}
                      onMouseDown={(e) => handleMouseDown(e, element.id)}
                    >
                      {element.type === "text" && (
                        <div
                          contentEditable
                          suppressContentEditableWarning
                          className="w-full h-full outline-none"
                          style={{
                            fontSize: element.style.fontSize,
                            fontFamily: element.style.fontFamily,
                            color: element.style.color,
                            fontWeight: element.style.fontWeight,
                            fontStyle: element.style.fontStyle,
                            textDecoration: element.style.textDecoration,
                            textAlign: element.style.textAlign as any,
                          }}
                          onBlur={(e) => {
                            updateElement(element.id, { content: e.target.textContent || "" })
                          }}
                        >
                          {element.content}
                        </div>
                      )}

                      {element.type === "image" && (
                        <img
                          src={element.content || "/placeholder.svg"}
                          alt="Design element"
                          className="w-full h-full object-cover"
                          style={{ borderRadius: element.style.borderRadius }}
                        />
                      )}

                      {element.type === "shape" && (
                        <div
                          className="w-full h-full"
                          style={{
                            backgroundColor: element.style.backgroundColor,
                            borderRadius: element.style.borderRadius,
                          }}
                        />
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Properties */}
          <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
            {selectedElementData ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Properties</h3>

                  {/* Position and Size */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="x">X</Label>
                        <Input
                          id="x"
                          type="number"
                          value={selectedElementData.x}
                          onChange={(e) =>
                            updateElement(selectedElementData.id, { x: Number.parseInt(e.target.value) })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="y">Y</Label>
                        <Input
                          id="y"
                          type="number"
                          value={selectedElementData.y}
                          onChange={(e) =>
                            updateElement(selectedElementData.id, { y: Number.parseInt(e.target.value) })
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="width">Width</Label>
                        <Input
                          id="width"
                          type="number"
                          value={selectedElementData.width}
                          onChange={(e) =>
                            updateElement(selectedElementData.id, { width: Number.parseInt(e.target.value) })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="height">Height</Label>
                        <Input
                          id="height"
                          type="number"
                          value={selectedElementData.height}
                          onChange={(e) =>
                            updateElement(selectedElementData.id, { height: Number.parseInt(e.target.value) })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Text Properties */}
                  {selectedElementData.type === "text" && (
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="fontSize">Font Size</Label>
                        <Slider
                          value={[selectedElementData.style.fontSize || 16]}
                          onValueChange={([value]) =>
                            updateElement(selectedElementData.id, {
                              style: { ...selectedElementData.style, fontSize: value },
                            })
                          }
                          max={72}
                          min={8}
                          step={1}
                        />
                      </div>

                      <div>
                        <Label htmlFor="fontFamily">Font Family</Label>
                        <select
                          className="w-full p-2 border border-gray-300 rounded-md"
                          value={selectedElementData.style.fontFamily || "Inter"}
                          onChange={(e) =>
                            updateElement(selectedElementData.id, {
                              style: { ...selectedElementData.style, fontFamily: e.target.value },
                            })
                          }
                        >
                          <option value="Inter">Inter</option>
                          <option value="Roboto">Roboto</option>
                          <option value="Open Sans">Open Sans</option>
                          <option value="Montserrat">Montserrat</option>
                          <option value="Playfair Display">Playfair Display</option>
                        </select>
                      </div>

                      <div>
                        <Label>Text Formatting</Label>
                        <div className="flex items-center space-x-2 mt-2">
                          <Button
                            variant={selectedElementData.style.fontWeight === "bold" ? "default" : "outline"}
                            size="sm"
                            onClick={() =>
                              updateElement(selectedElementData.id, {
                                style: {
                                  ...selectedElementData.style,
                                  fontWeight: selectedElementData.style.fontWeight === "bold" ? "normal" : "bold",
                                },
                              })
                            }
                          >
                            <Bold className="h-4 w-4" />
                          </Button>
                          <Button
                            variant={selectedElementData.style.fontStyle === "italic" ? "default" : "outline"}
                            size="sm"
                            onClick={() =>
                              updateElement(selectedElementData.id, {
                                style: {
                                  ...selectedElementData.style,
                                  fontStyle: selectedElementData.style.fontStyle === "italic" ? "normal" : "italic",
                                },
                              })
                            }
                          >
                            <Italic className="h-4 w-4" />
                          </Button>
                          <Button
                            variant={selectedElementData.style.textDecoration === "underline" ? "default" : "outline"}
                            size="sm"
                            onClick={() =>
                              updateElement(selectedElementData.id, {
                                style: {
                                  ...selectedElementData.style,
                                  textDecoration:
                                    selectedElementData.style.textDecoration === "underline" ? "none" : "underline",
                                },
                              })
                            }
                          >
                            <Underline className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label>Text Alignment</Label>
                        <div className="flex items-center space-x-2 mt-2">
                          <Button
                            variant={selectedElementData.style.textAlign === "left" ? "default" : "outline"}
                            size="sm"
                            onClick={() =>
                              updateElement(selectedElementData.id, {
                                style: { ...selectedElementData.style, textAlign: "left" },
                              })
                            }
                          >
                            <AlignLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            variant={selectedElementData.style.textAlign === "center" ? "default" : "outline"}
                            size="sm"
                            onClick={() =>
                              updateElement(selectedElementData.id, {
                                style: { ...selectedElementData.style, textAlign: "center" },
                              })
                            }
                          >
                            <AlignCenter className="h-4 w-4" />
                          </Button>
                          <Button
                            variant={selectedElementData.style.textAlign === "right" ? "default" : "outline"}
                            size="sm"
                            onClick={() =>
                              updateElement(selectedElementData.id, {
                                style: { ...selectedElementData.style, textAlign: "right" },
                              })
                            }
                          >
                            <AlignRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Color Properties */}
                  <div className="space-y-3">
                    {selectedElementData.type === "text" && (
                      <div>
                        <Label>Text Color</Label>
                        <ColorPicker
                          color={selectedElementData.style.color || "#000000"}
                          onChange={(color) =>
                            updateElement(selectedElementData.id, {
                              style: { ...selectedElementData.style, color },
                            })
                          }
                        />
                      </div>
                    )}

                    {(selectedElementData.type === "shape" || selectedElementData.type === "text") && (
                      <div>
                        <Label>Background Color</Label>
                        <ColorPicker
                          color={selectedElementData.style.backgroundColor || "#ffffff"}
                          onChange={(color) =>
                            updateElement(selectedElementData.id, {
                              style: { ...selectedElementData.style, backgroundColor: color },
                            })
                          }
                        />
                      </div>
                    )}
                  </div>

                  {/* Delete Button */}
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => deleteElement(selectedElementData.id)}
                  >
                    Delete Element
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 mt-8">
                <Layers className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>Select an element to edit its properties</p>
              </div>
            )}
          </div>
        </div>

        {/* AI Content Generator Modal */}
        {showAIGenerator && (
          <AIContentGenerator
            onClose={() => setShowAIGenerator(false)}
            onGenerate={(content) => {
              addTextElement()
              // Update the last added element with AI content
              const lastElement = elements[elements.length - 1]
              if (lastElement) {
                updateElement(lastElement.id, { content })
              }
            }}
          />
        )}
      </div>
    </DashboardLayout>
  )
}
