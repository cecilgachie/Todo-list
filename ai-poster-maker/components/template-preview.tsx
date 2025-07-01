"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Download, Star, Heart, Share2, Palette, Type, ImageIcon } from "lucide-react"
import Link from "next/link"

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

interface TemplatePreviewProps {
  template: Template
  onClose: () => void
}

const templateDetails = {
  description:
    "A modern and professional business flyer template perfect for promoting your services or products. Features clean typography and customizable color schemes.",
  features: ["Fully customizable", "High-resolution export", "Multiple color schemes", "Professional fonts included"],
  dimensions: "8.5 x 11 inches (Letter)",
  formats: ["PNG", "JPG", "PDF"],
  colors: ["#3B82F6", "#EF4444", "#10B981", "#F59E0B"],
  fonts: ["Inter", "Roboto", "Open Sans"],
}

export function TemplatePreview({ template, onClose }: TemplatePreviewProps) {
  const [activeTab, setActiveTab] = useState("preview")
  const [isLiked, setIsLiked] = useState(false)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex h-full">
          {/* Preview Section */}
          <div className="flex-1 bg-gray-50 p-8 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                {template.premium && <Badge className="bg-yellow-500">Premium</Badge>}
                {template.popular && (
                  <Badge variant="secondary">
                    <Star className="w-3 h-3 mr-1" />
                    Popular
                  </Badge>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-center">
              <img
                src={template.thumbnail || "/placeholder.svg"}
                alt={template.name}
                className="max-w-full max-h-[600px] object-contain shadow-lg rounded-lg"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="w-96 bg-white border-l overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{template.name}</h2>
                  <p className="text-gray-600">{template.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" onClick={() => setIsLiked(!isLiked)}>
                    <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="font-medium">{template.rating}</span>
                  <span className="text-gray-500 ml-1">(124 reviews)</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Download className="w-4 h-4 mr-1" />
                  <span>{template.downloads.toLocaleString()}</span>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="preview">Details</TabsTrigger>
                  <TabsTrigger value="customize">Customize</TabsTrigger>
                  <TabsTrigger value="specs">Specs</TabsTrigger>
                </TabsList>

                <TabsContent value="preview" className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-sm text-gray-600">{templateDetails.description}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Features</h3>
                    <ul className="space-y-1">
                      {templateDetails.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-1">
                      {template.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="customize" className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Palette className="w-4 h-4 mr-2" />
                      Color Schemes
                    </h3>
                    <div className="grid grid-cols-4 gap-2">
                      {templateDetails.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded border cursor-pointer hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Type className="w-4 h-4 mr-2" />
                      Fonts
                    </h3>
                    <div className="space-y-2">
                      {templateDetails.fonts.map((font, index) => (
                        <div key={index} className="p-2 border rounded text-sm" style={{ fontFamily: font }}>
                          {font} - The quick brown fox
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2 flex items-center">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Customizable Elements
                    </h3>
                    <ul className="space-y-1">
                      <li className="text-sm text-gray-600">• Text content and styling</li>
                      <li className="text-sm text-gray-600">• Background colors and images</li>
                      <li className="text-sm text-gray-600">• Logo and brand elements</li>
                      <li className="text-sm text-gray-600">• Layout and positioning</li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="specs" className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium">Dimensions:</span>
                      <span className="text-gray-600 ml-2">{templateDetails.dimensions}</span>
                    </div>
                    <div>
                      <span className="font-medium">Export Formats:</span>
                      <div className="flex gap-1 mt-1">
                        {templateDetails.formats.map((format) => (
                          <Badge key={format} variant="outline" className="text-xs">
                            {format}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Resolution:</span>
                      <span className="text-gray-600 ml-2">300 DPI (Print Ready)</span>
                    </div>
                    <div>
                      <span className="font-medium">File Size:</span>
                      <span className="text-gray-600 ml-2">~2.5 MB</span>
                    </div>
                    <div>
                      <span className="font-medium">License:</span>
                      <span className="text-gray-600 ml-2">Commercial Use Allowed</span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 space-y-3">
                {template.price && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Price:</span>
                    <span className="text-xl font-bold text-blue-600">KSh {template.price}</span>
                  </div>
                )}

                <Link href={`/design?template=${template.id}`} className="block">
                  <Button className="w-full" size="lg">
                    Use This Template
                  </Button>
                </Link>

                <Button variant="outline" className="w-full bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Download Preview
                </Button>
              </div>

              {template.author && (
                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">{template.author.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium">{template.author}</p>
                      <p className="text-sm text-gray-600">Template Designer</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
