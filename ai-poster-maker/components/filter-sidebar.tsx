"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { X, Filter } from "lucide-react"

interface FilterSidebarProps {
  onFiltersChange: (filters: any) => void
  isOpen: boolean
  onClose: () => void
}

const categories = [
  { id: "business", name: "Business", count: 245 },
  { id: "marketing", name: "Marketing", count: 189 },
  { id: "events", name: "Events", count: 156 },
  { id: "food", name: "Food & Beverage", count: 134 },
  { id: "fitness", name: "Fitness", count: 98 },
  { id: "real-estate", name: "Real Estate", count: 87 },
  { id: "education", name: "Education", count: 76 },
  { id: "healthcare", name: "Healthcare", count: 65 },
  { id: "technology", name: "Technology", count: 54 },
  { id: "beauty", name: "Beauty", count: 43 },
]

const orientations = [
  { id: "portrait", name: "Portrait" },
  { id: "landscape", name: "Landscape" },
  { id: "square", name: "Square" },
]

const colors = [
  { id: "blue", name: "Blue", color: "#3B82F6" },
  { id: "red", name: "Red", color: "#EF4444" },
  { id: "green", name: "Green", color: "#10B981" },
  { id: "yellow", name: "Yellow", color: "#F59E0B" },
  { id: "purple", name: "Purple", color: "#8B5CF6" },
  { id: "pink", name: "Pink", color: "#EC4899" },
  { id: "gray", name: "Gray", color: "#6B7280" },
  { id: "black", name: "Black", color: "#1F2937" },
]

const styles = [
  { id: "modern", name: "Modern" },
  { id: "minimal", name: "Minimal" },
  { id: "vintage", name: "Vintage" },
  { id: "bold", name: "Bold" },
  { id: "elegant", name: "Elegant" },
  { id: "playful", name: "Playful" },
]

export function FilterSidebar({ onFiltersChange, isOpen, onClose }: FilterSidebarProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedOrientations, setSelectedOrientations] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [showPremiumOnly, setShowPremiumOnly] = useState(false)
  const [showFreeOnly, setShowFreeOnly] = useState(false)

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const updated = checked ? [...selectedCategories, categoryId] : selectedCategories.filter((id) => id !== categoryId)
    setSelectedCategories(updated)
    updateFilters({ categories: updated })
  }

  const handleOrientationChange = (orientationId: string, checked: boolean) => {
    const updated = checked
      ? [...selectedOrientations, orientationId]
      : selectedOrientations.filter((id) => id !== orientationId)
    setSelectedOrientations(updated)
    updateFilters({ orientations: updated })
  }

  const handleColorChange = (colorId: string, checked: boolean) => {
    const updated = checked ? [...selectedColors, colorId] : selectedColors.filter((id) => id !== colorId)
    setSelectedColors(updated)
    updateFilters({ colors: updated })
  }

  const handleStyleChange = (styleId: string, checked: boolean) => {
    const updated = checked ? [...selectedStyles, styleId] : selectedStyles.filter((id) => id !== styleId)
    setSelectedStyles(updated)
    updateFilters({ styles: updated })
  }

  const updateFilters = (newFilters: any) => {
    onFiltersChange({
      categories: selectedCategories,
      orientations: selectedOrientations,
      colors: selectedColors,
      styles: selectedStyles,
      priceRange,
      showPremiumOnly,
      showFreeOnly,
      ...newFilters,
    })
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedOrientations([])
    setSelectedColors([])
    setSelectedStyles([])
    setPriceRange([0, 5000])
    setShowPremiumOnly(false)
    setShowFreeOnly(false)
    onFiltersChange({})
  }

  const activeFiltersCount =
    selectedCategories.length +
    selectedOrientations.length +
    selectedColors.length +
    selectedStyles.length +
    (showPremiumOnly ? 1 : 0) +
    (showFreeOnly ? 1 : 0)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-40 lg:relative lg:inset-auto">
      {/* Mobile overlay */}
      <div className="fixed inset-0 bg-black/50 lg:hidden" onClick={onClose} />

      {/* Sidebar */}
      <Card className="fixed left-0 top-0 h-full w-80 overflow-y-auto lg:relative lg:w-full lg:h-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
            {activeFiltersCount > 0 && <Badge variant="secondary">{activeFiltersCount}</Badge>}
          </CardTitle>
          <div className="flex items-center gap-2">
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Price Type */}
          <div>
            <h3 className="font-medium mb-3">Price</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="free"
                  checked={showFreeOnly}
                  onCheckedChange={(checked) => {
                    setShowFreeOnly(checked as boolean)
                    if (checked) setShowPremiumOnly(false)
                    updateFilters({ showFreeOnly: checked, showPremiumOnly: false })
                  }}
                />
                <Label htmlFor="free">Free Templates</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="premium"
                  checked={showPremiumOnly}
                  onCheckedChange={(checked) => {
                    setShowPremiumOnly(checked as boolean)
                    if (checked) setShowFreeOnly(false)
                    updateFilters({ showPremiumOnly: checked, showFreeOnly: false })
                  }}
                />
                <Label htmlFor="premium">Premium Templates</Label>
              </div>
            </div>
          </div>

          <Separator />

          {/* Categories */}
          <div>
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={category.id}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                    />
                    <Label htmlFor={category.id} className="text-sm">
                      {category.name}
                    </Label>
                  </div>
                  <span className="text-xs text-gray-500">{category.count}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Orientation */}
          <div>
            <h3 className="font-medium mb-3">Orientation</h3>
            <div className="space-y-2">
              {orientations.map((orientation) => (
                <div key={orientation.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={orientation.id}
                    checked={selectedOrientations.includes(orientation.id)}
                    onCheckedChange={(checked) => handleOrientationChange(orientation.id, checked as boolean)}
                  />
                  <Label htmlFor={orientation.id} className="text-sm">
                    {orientation.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Colors */}
          <div>
            <h3 className="font-medium mb-3">Colors</h3>
            <div className="grid grid-cols-4 gap-2">
              {colors.map((color) => (
                <div key={color.id} className="flex flex-col items-center space-y-1">
                  <div
                    className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-all ${
                      selectedColors.includes(color.id) ? "border-gray-900 scale-110" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.color }}
                    onClick={() => handleColorChange(color.id, !selectedColors.includes(color.id))}
                  />
                  <span className="text-xs text-gray-600">{color.name}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Styles */}
          <div>
            <h3 className="font-medium mb-3">Styles</h3>
            <div className="flex flex-wrap gap-2">
              {styles.map((style) => (
                <Badge
                  key={style.id}
                  variant={selectedStyles.includes(style.id) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleStyleChange(style.id, !selectedStyles.includes(style.id))}
                >
                  {style.name}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Price Range */}
          <div>
            <h3 className="font-medium mb-3">Price Range</h3>
            <div className="space-y-3">
              <Slider
                value={priceRange}
                onValueChange={(value) => {
                  setPriceRange(value)
                  updateFilters({ priceRange: value })
                }}
                max={5000}
                min={0}
                step={100}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>KSh {priceRange[0]}</span>
                <span>KSh {priceRange[1]}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
