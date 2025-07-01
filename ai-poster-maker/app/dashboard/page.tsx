"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Grid3X3, List, Download, Share, MoreHorizontal, Sparkles, TrendingUp, Clock } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { DashboardLayout } from "@/components/dashboard-layout"

interface Design {
  id: string
  name: string
  thumbnail: string
  category: string
  createdAt: string
  updatedAt: string
  status: "draft" | "published"
  views: number
  downloads: number
}

const mockDesigns: Design[] = [
  {
    id: "1",
    name: "Summer Sale Flyer",
    thumbnail: "/placeholder.svg?height=200&width=150",
    category: "Marketing",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-16",
    status: "published",
    views: 245,
    downloads: 12,
  },
  {
    id: "2",
    name: "Event Poster",
    thumbnail: "/placeholder.svg?height=200&width=150",
    category: "Events",
    createdAt: "2024-01-14",
    updatedAt: "2024-01-14",
    status: "draft",
    views: 89,
    downloads: 3,
  },
  {
    id: "3",
    name: "Restaurant Menu",
    thumbnail: "/placeholder.svg?height=200&width=150",
    category: "Food & Beverage",
    createdAt: "2024-01-13",
    updatedAt: "2024-01-15",
    status: "published",
    views: 156,
    downloads: 8,
  },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const [designs, setDesigns] = useState<Design[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    // Load designs from localStorage or API
    const savedDesigns = localStorage.getItem("designs")
    if (savedDesigns) {
      setDesigns(JSON.parse(savedDesigns))
    } else {
      setDesigns(mockDesigns)
    }
  }, [])

  const filteredDesigns = designs.filter((design) => {
    const matchesSearch = design.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || design.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const stats = [
    {
      title: "Total Designs",
      value: designs.length,
      icon: Sparkles,
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: "Total Views",
      value: designs.reduce((sum, design) => sum + design.views, 0),
      icon: TrendingUp,
      change: "+23%",
      changeType: "positive" as const,
    },
    {
      title: "Downloads",
      value: designs.reduce((sum, design) => sum + design.downloads, 0),
      icon: Download,
      change: "+8%",
      changeType: "positive" as const,
    },
    {
      title: "Active Projects",
      value: designs.filter((d) => d.status === "draft").length,
      icon: Clock,
      change: "0%",
      changeType: "neutral" as const,
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
            <p className="text-gray-600 mt-1">Create amazing designs with the power of AI</p>
          </div>

          <Link href="/design">
            <Button size="lg" className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              New Design
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
                <p
                  className={`text-xs ${
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : stat.changeType === "negative"
                        ? "text-red-600"
                        : "text-gray-600"
                  }`}
                >
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search designs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">All Categories</option>
              <option value="Marketing">Marketing</option>
              <option value="Events">Events</option>
              <option value="Food & Beverage">Food & Beverage</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Designs Grid/List */}
        {filteredDesigns.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No designs found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || selectedCategory !== "all"
                  ? "Try adjusting your search or filters"
                  : "Start creating your first design"}
              </p>
              <Link href="/design">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Design
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
            }
          >
            {filteredDesigns.map((design) => (
              <Card key={design.id} className="group hover:shadow-lg transition-shadow">
                {viewMode === "grid" ? (
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={design.thumbnail || "/placeholder.svg"}
                        alt={design.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant={design.status === "published" ? "default" : "secondary"}>{design.status}</Badge>
                      </div>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg flex items-center justify-center gap-2">
                        <Button size="sm" variant="secondary">
                          Edit
                        </Button>
                        <Button size="sm" variant="secondary">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="secondary">
                          <Share className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{design.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{design.category}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{design.views} views</span>
                        <span>{design.downloads} downloads</span>
                      </div>
                    </div>
                  </CardContent>
                ) : (
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={design.thumbnail || "/placeholder.svg"}
                        alt={design.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{design.name}</h3>
                          <Badge variant={design.status === "published" ? "default" : "secondary"}>
                            {design.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{design.category}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{design.views} views</span>
                          <span>{design.downloads} downloads</span>
                          <span>Updated {new Date(design.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
