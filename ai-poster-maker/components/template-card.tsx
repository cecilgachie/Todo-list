"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Eye, Download, Heart, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { TemplatePreview } from "./template-preview"

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
  price?: number
  author?: string
  createdAt?: string
}

interface TemplateCardProps {
  template: Template
  viewMode: "grid" | "list"
}

export function TemplateCard({ template, viewMode }: TemplateCardProps) {
  const [showPreview, setShowPreview] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  if (viewMode === "list") {
    return (
      <>
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={template.thumbnail || "/placeholder.svg"}
                  alt={template.name}
                  className="w-20 h-16 object-cover rounded"
                />
                {template.premium && (
                  <Badge className="absolute -top-1 -right-1 text-xs bg-yellow-500 hover:bg-yellow-600">Pro</Badge>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">{template.name}</h3>
                  {template.popular && (
                    <Badge variant="secondary" className="text-xs">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-1">{template.category}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 mr-1" />
                    <span>{template.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Download className="w-3 h-3 mr-1" />
                    <span>{template.downloads.toLocaleString()}</span>
                  </div>
                  {template.author && <span>by {template.author}</span>}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => setShowPreview(true)}>
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </Button>
                <Link href={`/design?template=${template.id}`}>
                  <Button size="sm">Use Template</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {showPreview && <TemplatePreview template={template} onClose={() => setShowPreview(false)} />}
      </>
    )
  }

  return (
    <>
      <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            <img
              src={template.thumbnail || "/placeholder.svg"}
              alt={template.name}
              className="w-full h-64 object-cover transition-transform group-hover:scale-105"
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

            {/* Like button */}
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
            </Button>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button size="sm" variant="secondary" onClick={() => setShowPreview(true)}>
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Link href={`/design?template=${template.id}`}>
                <Button size="sm">Use Template</Button>
              </Link>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-gray-900 line-clamp-1">{template.name}</h3>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-sm text-gray-600 mb-3">{template.category}</p>

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

            <div className="flex flex-wrap gap-1 mb-3">
              {template.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {template.price && (
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-blue-600">KSh {template.price}</span>
                <span className="text-xs text-gray-500">One-time</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {showPreview && <TemplatePreview template={template} onClose={() => setShowPreview(false)} />}
    </>
  )
}
