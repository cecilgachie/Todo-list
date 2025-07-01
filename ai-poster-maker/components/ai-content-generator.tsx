"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Sparkles, X, Copy, RefreshCw } from "lucide-react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { useToast } from "@/hooks/use-toast"

interface AIContentGeneratorProps {
  onClose: () => void
  onGenerate: (content: string) => void
}

const contentTypes = [
  { id: "headline", name: "Headline", description: "Catchy headlines for your design" },
  { id: "tagline", name: "Tagline", description: "Short memorable phrases" },
  { id: "description", name: "Description", description: "Detailed product or service descriptions" },
  { id: "cta", name: "Call to Action", description: "Compelling action phrases" },
  { id: "social", name: "Social Media", description: "Social media captions and posts" },
]

const tones = ["Professional", "Casual", "Friendly", "Urgent", "Playful", "Elegant", "Bold", "Minimalist"]

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Food & Beverage",
  "Real Estate",
  "Fitness",
  "Beauty",
  "Travel",
  "Entertainment",
  "Non-profit",
]

export function AIContentGenerator({ onClose, onGenerate }: AIContentGeneratorProps) {
  const [businessType, setBusinessType] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("")
  const [selectedContentType, setSelectedContentType] = useState("headline")
  const [selectedTone, setSelectedTone] = useState("Professional")
  const [customPrompt, setCustomPrompt] = useState("")
  const [generatedContent, setGeneratedContent] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!businessType.trim()) {
      toast({
        title: "Business type required",
        description: "Please enter your business type or product.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      const contentTypeInfo = contentTypes.find((ct) => ct.id === selectedContentType)

      const prompt = `Generate 3 ${contentTypeInfo?.name.toLowerCase()} options for a ${businessType} business in the ${selectedIndustry} industry. 
      
      Tone: ${selectedTone}
      Content Type: ${contentTypeInfo?.description}
      ${customPrompt ? `Additional requirements: ${customPrompt}` : ""}
      
      Make them compelling, concise, and suitable for poster/flyer design. Return only the text options, numbered 1-3.`

      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt,
        maxTokens: 200,
      })

      // Parse the generated content into separate options
      const options = text
        .split(/\d+\./)
        .filter((option) => option.trim())
        .map((option) => option.trim())
      setGeneratedContent(options)
    } catch (error) {
      console.error("Error generating content:", error)
      toast({
        title: "Generation failed",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleUseContent = (content: string) => {
    onGenerate(content)
    onClose()
    toast({
      title: "Content added",
      description: "AI-generated content has been added to your design.",
    })
  }

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
    toast({
      title: "Copied",
      description: "Content copied to clipboard.",
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-blue-600" />
              <div>
                <CardTitle>AI Content Generator</CardTitle>
                <CardDescription>Generate compelling copy for your designs using AI</CardDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Form */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="businessType">Business Type / Product *</Label>
                <Input
                  id="businessType"
                  placeholder="e.g., Coffee Shop, Fitness Studio, Tech Startup"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="industry">Industry</Label>
                <select
                  id="industry"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                >
                  <option value="">Select Industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Content Type</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {contentTypes.map((type) => (
                    <Button
                      key={type.id}
                      variant={selectedContentType === type.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedContentType(type.id)}
                      className="justify-start"
                    >
                      {type.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label>Tone</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tones.map((tone) => (
                    <Badge
                      key={tone}
                      variant={selectedTone === tone ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedTone(tone)}
                    >
                      {tone}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="customPrompt">Additional Requirements (Optional)</Label>
                <Textarea
                  id="customPrompt"
                  placeholder="Any specific requirements or style preferences..."
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  rows={3}
                />
              </div>

              <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Content
                  </>
                )}
              </Button>
            </div>

            {/* Generated Content */}
            <div className="space-y-4">
              <div>
                <Label>Generated Content</Label>
                {generatedContent.length === 0 ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
                    <Sparkles className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p>Generated content will appear here</p>
                    <p className="text-sm">Fill in the form and click "Generate Content"</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {generatedContent.map((content, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <p className="flex-1 text-sm">{content}</p>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => copyToClipboard(content)}>
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleUseContent(content)}>
                              Use This
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {generatedContent.length > 0 && (
                <Button
                  variant="outline"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full bg-transparent"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Generate More Options
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
