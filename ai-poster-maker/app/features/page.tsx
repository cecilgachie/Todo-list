"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Palette, Type, ImageIcon, Download, Users, Brain, Wand2, Target, BarChart3 } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"

const features = [
  {
    category: "AI-Powered",
    icon: Brain,
    title: "AI Content Generation",
    description: "Generate compelling headlines, taglines, and copy tailored to your business and industry.",
    benefits: ["Save 80% time on copywriting", "Industry-specific content", "Multiple tone options", "Instant results"],
    demo: "Try generating content for a coffee shop promotion",
  },
  {
    category: "AI-Powered",
    icon: Wand2,
    title: "Smart Design Suggestions",
    description: "Get intelligent layout and color recommendations based on your content and brand.",
    benefits: ["Professional layouts", "Color harmony", "Brand consistency", "Design best practices"],
    demo: "See how AI suggests layouts for your content",
  },
  {
    category: "Design Tools",
    icon: Palette,
    title: "Advanced Color Tools",
    description: "Professional color picker with harmony algorithms and brand kit integration.",
    benefits: ["Color harmony algorithms", "Brand color storage", "Accessibility checking", "Trend-based palettes"],
    demo: "Explore color harmony suggestions",
  },
  {
    category: "Design Tools",
    icon: Type,
    title: "Typography Engine",
    description: "Smart font pairing and text styling with professional typography rules.",
    benefits: ["Font pairing suggestions", "Hierarchy optimization", "Readability analysis", "Brand font storage"],
    demo: "See font pairing in action",
  },
  {
    category: "Assets",
    icon: ImageIcon,
    title: "Stock Photo Integration",
    description: "Access millions of high-quality stock photos directly in the editor.",
    benefits: ["Millions of photos", "AI-powered search", "Commercial licenses", "Instant integration"],
    demo: "Search for business photos",
  },
  {
    category: "Collaboration",
    icon: Users,
    title: "Team Collaboration",
    description: "Work together on designs with real-time collaboration and feedback tools.",
    benefits: ["Real-time editing", "Comment system", "Version history", "Role-based access"],
    demo: "See collaboration in action",
  },
  {
    category: "Export",
    icon: Download,
    title: "Multi-Format Export",
    description: "Export your designs in multiple formats optimized for different use cases.",
    benefits: ["PNG, JPG, PDF, SVG", "Print-ready quality", "Web optimization", "Batch export"],
    demo: "Preview export options",
  },
  {
    category: "Analytics",
    icon: BarChart3,
    title: "Design Analytics",
    description: "Track performance and engagement of your designs across platforms.",
    benefits: ["Performance tracking", "Engagement metrics", "A/B testing", "ROI analysis"],
    demo: "View sample analytics",
  },
]

const integrations = [
  { name: "Unsplash", logo: "/placeholder.svg?height=40&width=40", description: "Stock photos" },
  { name: "Pexels", logo: "/placeholder.svg?height=40&width=40", description: "Free images" },
  { name: "Google Fonts", logo: "/placeholder.svg?height=40&width=40", description: "Typography" },
  { name: "Dropbox", logo: "/placeholder.svg?height=40&width=40", description: "Cloud storage" },
  { name: "Slack", logo: "/placeholder.svg?height=40&width=40", description: "Team communication" },
  { name: "Zapier", logo: "/placeholder.svg?height=40&width=40", description: "Automation" },
]

const comparisonPlans = [
  {
    name: "Free",
    price: "KSh 0",
    features: {
      "AI Content Generation": "5/month",
      Templates: "Basic",
      "Export Quality": "Standard",
      Collaboration: "No",
      "Brand Kit": "No",
      "Priority Support": "No",
      Analytics: "Basic",
    },
  },
  {
    name: "Pro",
    price: "KSh 1,500",
    popular: true,
    features: {
      "AI Content Generation": "Unlimited",
      Templates: "Premium",
      "Export Quality": "High-res",
      Collaboration: "5 members",
      "Brand Kit": "Yes",
      "Priority Support": "Yes",
      Analytics: "Advanced",
    },
  },
  {
    name: "Enterprise",
    price: "KSh 5,000",
    features: {
      "AI Content Generation": "Unlimited",
      Templates: "Custom",
      "Export Quality": "Enterprise",
      Collaboration: "Unlimited",
      "Brand Kit": "Advanced",
      "Priority Support": "Dedicated",
      Analytics: "Enterprise",
    },
  },
]

export default function FeaturesPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null)

  const categories = ["all", "AI-Powered", "Design Tools", "Assets", "Collaboration", "Export", "Analytics"]

  const filteredFeatures = activeCategory === "all" ? features : features.filter((f) => f.category === activeCategory)

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <BreadcrumbNav />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto text-center">
          <Badge className="mb-4" variant="secondary">
            <Sparkles className="h-4 w-4 mr-1" />
            AI-Powered Features
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Powerful Features for
            <span className="text-blue-600 block">Professional Designs</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover the comprehensive suite of AI-powered tools and features that make creating stunning designs faster
            and easier than ever before.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/register">
              <Button size="lg" className="text-lg px-8 py-4">
                Start Free Trial
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-transparent">
              <Target className="mr-2 h-5 w-5" />
              See Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600">Comprehensive tools for professional design creation</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className="capitalize"
              >
                {category === "all" ? "All Features" : category}
              </Button>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFeatures.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedFeature(selectedFeature === index ? null : index)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                    <Badge variant="outline">{feature.category}</Badge>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  {selectedFeature === index ? (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Key Benefits:</h4>
                        <ul className="space-y-1">
                          {feature.benefits.map((benefit, i) => (
                            <li key={i} className="text-sm text-gray-600 flex items-center">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        {feature.demo}
                      </Button>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">Click to learn more</div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Compare Plans</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your needs</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-semibold">Features</th>
                  {comparisonPlans.map((plan) => (
                    <th key={plan.name} className="text-center p-4">
                      <div className="space-y-2">
                        <div className="font-semibold text-lg">{plan.name}</div>
                        <div className="text-2xl font-bold text-blue-600">{plan.price}</div>
                        {plan.popular && <Badge>Most Popular</Badge>}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(comparisonPlans[0].features).map((feature) => (
                  <tr key={feature} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{feature}</td>
                    {comparisonPlans.map((plan) => (
                      <td key={plan.name} className="p-4 text-center">
                        {plan.features[feature as keyof typeof plan.features]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-8">
            <Link href="/pricing">
              <Button size="lg">View Detailed Pricing</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Integrations</h2>
            <p className="text-xl text-gray-600">Connect with your favorite tools and services</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {integrations.map((integration, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <img
                    src={integration.logo || "/placeholder.svg"}
                    alt={integration.name}
                    className="w-10 h-10 mx-auto mb-3"
                  />
                  <h3 className="font-semibold mb-1">{integration.name}</h3>
                  <p className="text-sm text-gray-600">{integration.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline">View All Integrations</Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of creators using AI Poster Maker to create stunning designs
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/register">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
