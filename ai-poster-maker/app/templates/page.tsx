"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Star, Eye, Download } from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"

interface Template {
  id: string
  name: string
  category: string
  thumbnail: string
  premium: boolean
  popular: boolean
  downloads: number
  rating: number
  tags: string[]
}

const mockTemplates: Template[] = [
  {
    id: "1",
    name: "Modern Business Flyer",
    category: "Business",
    thumbnail: "/placeholder.svg?height=300&width=200",
    premium: false,
    popular: true,
    downloads: 1250,
    rating: 4.8,
    tags: ["corporate", "professional", "blue"],
  },
  {
    id: "2",
    name: "Summer Sale Poster",
    category: "Marketing",
    thumbnail: "/placeholder.svg?height=300&width=200",
    premium: true,
    popular: true,
    downloads: 890,
    rating: 4.9,
    tags: ["sale", "colorful", "summer"],
  },
  {
    id: "3",
    name: "Event Announcement",
    category: "Events",
    thumbnail: "/placeholder.svg?height=300&width=200",
    premium: false,
    popular: false,
    downloads: 567,
    rating: 4.6,
    tags: ["event", "elegant", "minimal"],
  },
  {
    id: "4",
    name: "Restaurant Menu",
    category: "Food & Beverage",
    thumbnail: "/placeholder.svg?height=300&width=200",
    premium: true,
    popular: false,
    downloads: 423,
    rating: 4.7,
    tags: ["menu", "food", "elegant"],
  },
  {
    id: "5",
    name: "Fitness Gym Poster",
    category: "Fitness",
    thumbnail: "/placeholder.svg?height=300&width=200",
    premium: false,
    popular: true,
    downloads: 756,
    rating: 4.5,
    tags: ["fitness", "bold", "motivational"],
  },
  {
    id: "6",
    name: "Real Estate Flyer",
    category: "Real Estate",
    thumbnail: "/placeholder.svg?height=300&width=200",
    premium: true,
    popular: false,
    downloads: 334,
    rating: 4.8,
    tags: ["property", "professional", "clean"],
  },
]

const categories = [
  "All",
  "Business",
  "Marketing",
  "Events",
  "Food & Beverage",
  "Fitness",
  "Real Estate",
  "Education",
  "Healthcare",
  "Technology",
]

export default function TemplatesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showPremiumOnly, setShowPremiumOnly] = useState(false)
  const [showPopularOnly, setShowPopularOnly] = useState(false)

  const filteredTemplates = mockTemplates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory
    const matchesPremium = !showPremiumOnly || template.premium
    const matchesPopular = !showPopularOnly || template.popular

    return matchesSearch && matchesCategory && matchesPremium && matchesPopular
  })

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Templates</h1>
          <p className="text-gray-600">Choose from thousands of professionally designed templates</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-80">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-2">
              <Button
                variant={showPopularOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowPopularOnly(!showPopularOnly)}
              >
                <Star className="mr-2 h-4 w-4" />
                Popular
              </Button>
              <Button
                variant={showPremiumOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowPremiumOnly(!showPremiumOnly)}
              >
                Premium
              </Button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={template.thumbnail || "/placeholder.svg"}
                    alt={template.name}
                    className="w-full h-64 object-cover"
                  />

                  {/* Overlay badges */}
                  <div className="absolute top-2 left-2 flex gap-2">
                    {template.premium && <Badge className="bg-yellow-500 hover:bg-yellow-600">Premium</Badge>}
                    {template.popular && (
                      <Badge variant="secondary">
                        <Star className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Link href={`/design?template=${template.id}`}>
                      <Button size="sm">Use Template</Button>
                    </Link>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{template.category}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span>{template.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      <span>{template.downloads.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {template.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
