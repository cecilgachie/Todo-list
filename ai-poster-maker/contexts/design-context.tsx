"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface DesignElement {
  id: string
  type: "text" | "image" | "shape"
  content: string
  x: number
  y: number
  width: number
  height: number
  style: {
    fontSize?: number
    fontFamily?: string
    color?: string
    backgroundColor?: string
    borderRadius?: number
  }
}

interface Design {
  id: string
  name: string
  elements: DesignElement[]
  canvas: {
    width: number
    height: number
    backgroundColor: string
  }
  template?: string
}

interface DesignContextType {
  currentDesign: Design | null
  setCurrentDesign: (design: Design) => void
  addElement: (element: Omit<DesignElement, "id">) => void
  updateElement: (id: string, updates: Partial<DesignElement>) => void
  deleteElement: (id: string) => void
  saveDesign: () => Promise<void>
  loadDesign: (id: string) => Promise<void>
  exportDesign: (format: "png" | "jpg" | "pdf") => Promise<void>
}

const DesignContext = createContext<DesignContextType | undefined>(undefined)

export function DesignProvider({ children }: { children: ReactNode }) {
  const [currentDesign, setCurrentDesign] = useState<Design | null>(null)

  const addElement = (element: Omit<DesignElement, "id">) => {
    if (!currentDesign) return

    const newElement: DesignElement = {
      ...element,
      id: Date.now().toString(),
    }

    setCurrentDesign({
      ...currentDesign,
      elements: [...currentDesign.elements, newElement],
    })
  }

  const updateElement = (id: string, updates: Partial<DesignElement>) => {
    if (!currentDesign) return

    setCurrentDesign({
      ...currentDesign,
      elements: currentDesign.elements.map((el) => (el.id === id ? { ...el, ...updates } : el)),
    })
  }

  const deleteElement = (id: string) => {
    if (!currentDesign) return

    setCurrentDesign({
      ...currentDesign,
      elements: currentDesign.elements.filter((el) => el.id !== id),
    })
  }

  const saveDesign = async () => {
    if (!currentDesign) return

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const savedDesigns = JSON.parse(localStorage.getItem("designs") || "[]")
    const existingIndex = savedDesigns.findIndex((d: Design) => d.id === currentDesign.id)

    if (existingIndex >= 0) {
      savedDesigns[existingIndex] = currentDesign
    } else {
      savedDesigns.push(currentDesign)
    }

    localStorage.setItem("designs", JSON.stringify(savedDesigns))
  }

  const loadDesign = async (id: string) => {
    const savedDesigns = JSON.parse(localStorage.getItem("designs") || "[]")
    const design = savedDesigns.find((d: Design) => d.id === id)

    if (design) {
      setCurrentDesign(design)
    }
  }

  const exportDesign = async (format: "png" | "jpg" | "pdf") => {
    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(`Exporting design as ${format}`)
  }

  return (
    <DesignContext.Provider
      value={{
        currentDesign,
        setCurrentDesign,
        addElement,
        updateElement,
        deleteElement,
        saveDesign,
        loadDesign,
        exportDesign,
      }}
    >
      {children}
    </DesignContext.Provider>
  )
}

export function useDesign() {
  const context = useContext(DesignContext)
  if (context === undefined) {
    throw new Error("useDesign must be used within a DesignProvider")
  }
  return context
}
