"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Check, X, Sparkles, Crown, Shield, Headphones, Zap, Calculator, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"

const plans = [
  {
    name: "Free",
    description: "Perfect for getting started",
    monthlyPrice: 0,
    yearlyPrice: 0,
    icon: Sparkles,
    features: [
      { name: "5 designs per month", included: true },
      { name: "Basic templates", included: true },
      { name: "Standard export (PNG, JPG)", included: true },
      { name: "Community support", included: true },
      { name: "AI content generation", included: false, limit: "Limited" },
      { name: "Premium templates", included: false },
      { name: "High-res exports", included: false },
      { name: "Brand kit", included: false },
      { name: "Collaboration tools", included: false },
      { name: "Priority support", included: false },
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    description: "Best for professionals and small teams",
    monthlyPrice: 1500,
    yearlyPrice: 15000, // 2 months free
    icon: Crown,
    features: [
      { name: "Unlimited designs", included: true },
      { name: "Premium templates", included: true },
      { name: "AI content generation", included: true },
      { name: "High-res exports (PNG, JPG, PDF)", included: true },
      { name: "Brand kit storage", included: true },
      { name: "Collaboration tools", included: true, limit: "5 members" },
      { name: "Priority support", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Custom fonts", included: true },
      { name: "API access", included: false },
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large teams and organizations",
    monthlyPrice: 5000,
    yearlyPrice: 50000, // 2 months free
    icon: Shield,
    features: [
      { name: "Everything in Pro", included: true },
      { name: "Unlimited team members", included: true },
      { name: "Custom templates", included: true },
      { name: "API access", included: true },
      { name: "Dedicated support", included: true },
      { name: "White-label options", included: true },
      { name: "Advanced security", included: true },
      { name: "Custom integrations", included: true },
      { name: "Training & onboarding", included: true },
      { name: "SLA guarantee", included: true },
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

const addOns = [
  {
    name: "Extra AI Generations",
    description: "Additional AI content generations beyond your plan limit",
    price: 500,
    unit: "per 100 generations",
  },
  {
    name: "Premium Stock Photos",
    description: "Access to exclusive premium stock photo collections",
    price: 1000,
    unit: "per month",
  },
  {
    name: "Advanced Analytics",
    description: "Detailed performance tracking and insights",
    price: 800,
    unit: "per month",
  },
  {
    name: "Custom Branding",
    description: "Remove AI Poster Maker branding from exports",
    price: 1200,
    unit: "per month",
  },
]

const faqs = [
  {
    question: "Can I change my plan at any time?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept M-Pesa, credit cards, and bank transfers. All payments are processed securely through our encrypted payment system.",
  },
  {
    question: "Is there a free trial for paid plans?",
    answer:
      "Yes, we offer a 14-day free trial for both Pro and Enterprise plans. No credit card required to start your trial.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Absolutely. You can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund.",
  },
  {
    question: "What happens to my designs if I downgrade?",
    answer:
      "Your designs remain accessible, but you may lose access to premium features. We recommend exporting important designs before downgrading.",
  },
  {
    question: "Do you offer discounts for nonprofits or students?",
    answer:
      "Yes, we offer special pricing for educational institutions and registered nonprofits. Contact our sales team for more information.",
  },
  {
    question: "Is there a limit on exports?",
    answer:
      "Free plans have limited exports per month. Pro and Enterprise plans include unlimited exports in all supported formats.",
  },
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState("Pro")

  const calculateSavings = (monthlyPrice: number, yearlyPrice: number) => {
    const monthlyCost = monthlyPrice * 12
    const savings = monthlyCost - yearlyPrice
    const percentage = Math.round((savings / monthlyCost) * 100)
    return { amount: savings, percentage }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <BreadcrumbNav />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto text-center">
          <Badge className="mb-4" variant="secondary">
            <Calculator className="h-4 w-4 mr-1" />
            Simple Pricing
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Choose Your
            <span className="text-blue-600 block">Perfect Plan</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Start free and scale as you grow. All plans include our core features with no hidden fees.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Label htmlFor="billing-toggle" className={`${!isYearly ? "text-gray-900" : "text-gray-500"}`}>
              Monthly
            </Label>
            <Switch id="billing-toggle" checked={isYearly} onCheckedChange={setIsYearly} />
            <Label htmlFor="billing-toggle" className={`${isYearly ? "text-gray-900" : "text-gray-500"}`}>
              Yearly
            </Label>
            <Badge variant="secondary" className="ml-2">
              Save 17%
            </Badge>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => {
              const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice
              const displayPrice = isYearly ? price / 12 : price
              const savings = isYearly ? calculateSavings(plan.monthlyPrice, plan.yearlyPrice) : null

              return (
                <Card
                  key={index}
                  className={`relative ${plan.popular ? "border-blue-500 shadow-lg scale-105" : ""} transition-all duration-300`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">Most Popular</Badge>
                  )}

                  <CardHeader className="text-center pb-8">
                    <plan.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription className="text-base">{plan.description}</CardDescription>

                    <div className="mt-6">
                      <div className="text-4xl font-bold text-gray-900">
                        KSh {Math.round(displayPrice).toLocaleString()}
                        <span className="text-lg text-gray-600 font-normal">/month</span>
                      </div>
                      {isYearly && savings && savings.amount > 0 && (
                        <div className="text-sm text-green-600 mt-1">
                          Save KSh {savings.amount.toLocaleString()} per year
                        </div>
                      )}
                      {isYearly && plan.monthlyPrice > 0 && (
                        <div className="text-sm text-gray-500">Billed KSh {price.toLocaleString()} annually</div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          ) : (
                            <X className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                          )}
                          <span className={`text-sm ${feature.included ? "text-gray-900" : "text-gray-500"}`}>
                            {feature.name}
                            {feature.limit && <span className="text-gray-500 ml-1">({feature.limit})</span>}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button className="w-full" variant={plan.popular ? "default" : "outline"} size="lg" asChild>
                      <Link href={plan.name === "Enterprise" ? "/contact" : "/auth/register"}>
                        {plan.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Add-ons & Extras</h2>
            <p className="text-xl text-gray-600">Enhance your plan with additional features</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {addOns.map((addon, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{addon.name}</CardTitle>
                  <CardDescription>{addon.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600 mb-4">
                    KSh {addon.price.toLocaleString()}
                    <span className="text-sm text-gray-600 font-normal">
                      /{addon.unit.split(" ").slice(1).join(" ")}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Add to Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Calculator */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4">Enterprise Calculator</CardTitle>
              <CardDescription className="text-lg">
                Calculate your custom enterprise pricing based on your team size and needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="team-size">Team Size</Label>
                    <select className="w-full p-3 border border-gray-300 rounded-md mt-1">
                      <option>10-25 users</option>
                      <option>26-50 users</option>
                      <option>51-100 users</option>
                      <option>100+ users</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="usage">Monthly Design Volume</Label>
                    <select className="w-full p-3 border border-gray-300 rounded-md mt-1">
                      <option>100-500 designs</option>
                      <option>500-1000 designs</option>
                      <option>1000-5000 designs</option>
                      <option>5000+ designs</option>
                    </select>
                  </div>

                  <div>
                    <Label>Required Features</Label>
                    <div className="space-y-2 mt-2">
                      {["API Access", "Custom Integrations", "White-label", "Dedicated Support", "Training"].map(
                        (feature) => (
                          <div key={feature} className="flex items-center space-x-2">
                            <input type="checkbox" id={feature} className="rounded" />
                            <Label htmlFor={feature} className="text-sm">
                              {feature}
                            </Label>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Estimated Pricing</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Base Plan (25 users)</span>
                      <span>KSh 125,000/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Additional Features</span>
                      <span>KSh 25,000/month</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total Estimated</span>
                        <span>KSh 150,000/month</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full mt-6" asChild>
                    <Link href="/contact">
                      Get Custom Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <p className="text-sm text-gray-600 mt-3 text-center">
                    * Pricing is estimated. Contact sales for accurate quote.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Money-back Guarantee */}
      <section className="py-20 px-4 bg-green-50">
        <div className="container mx-auto text-center">
          <Shield className="h-16 w-16 text-green-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">30-Day Money-Back Guarantee</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Try AI Poster Maker risk-free. If you're not completely satisfied within 30 days, we'll refund your money,
            no questions asked.
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center">
              <Check className="h-5 w-5 text-green-600 mr-2" />
              No setup fees
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-green-600 mr-2" />
              Cancel anytime
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-green-600 mr-2" />
              Full refund guarantee
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about our pricing</p>
          </div>

          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">Join thousands of creators and start designing today</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/register">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Start Free Trial
                <Zap className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                <Headphones className="mr-2 h-5 w-5" />
                Talk to Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
