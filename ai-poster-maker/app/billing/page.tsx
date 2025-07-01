"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CreditCard, Calendar, Check, Smartphone } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useAuth } from "@/contexts/auth-context"
import { MPesaPayment } from "@/components/mpesa-payment"

const plans = [
  {
    name: "Free",
    price: "KSh 0",
    period: "/month",
    features: ["5 designs per month", "Basic templates", "Standard export (PNG, JPG)", "Community support"],
    limits: {
      designs: 5,
      templates: "Basic",
      exports: "Standard",
      support: "Community",
    },
    popular: false,
  },
  {
    name: "Pro",
    price: "KSh 1,500",
    period: "/month",
    features: [
      "Unlimited designs",
      "Premium templates",
      "AI content generation",
      "High-res exports (PNG, JPG, PDF)",
      "Priority support",
      "Brand kit storage",
      "Collaboration tools",
    ],
    limits: {
      designs: "Unlimited",
      templates: "Premium",
      exports: "High-res",
      support: "Priority",
    },
    popular: true,
  },
  {
    name: "Enterprise",
    price: "KSh 5,000",
    period: "/month",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Custom templates",
      "API access",
      "Dedicated support",
      "White-label options",
      "Advanced analytics",
    ],
    limits: {
      designs: "Unlimited",
      templates: "Custom",
      exports: "Enterprise",
      support: "Dedicated",
    },
    popular: false,
  },
]

const usageData = {
  designs: { used: 3, limit: 5 },
  exports: { used: 8, limit: 20 },
  aiGenerations: { used: 15, limit: 50 },
}

const transactions = [
  {
    id: "1",
    date: "2024-01-15",
    description: "Pro Plan - Monthly",
    amount: 1500,
    status: "completed",
    method: "M-Pesa",
  },
  {
    id: "2",
    date: "2023-12-15",
    description: "Pro Plan - Monthly",
    amount: 1500,
    status: "completed",
    method: "M-Pesa",
  },
  {
    id: "3",
    date: "2023-11-15",
    description: "Pro Plan - Monthly",
    amount: 1500,
    status: "completed",
    method: "M-Pesa",
  },
]

export default function BillingPage() {
  const { user } = useAuth()
  const [showMPesaPayment, setShowMPesaPayment] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const handleUpgrade = (planName: string) => {
    setSelectedPlan(planName)
    setShowMPesaPayment(true)
  }

  const currentPlan = plans.find((plan) => plan.name.toLowerCase() === user?.subscription)

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Billing & Subscription</h1>
          <p className="text-gray-600">Manage your subscription and billing information</p>
        </div>

        {/* Current Plan */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  Current Plan
                  <Badge variant={user?.subscription === "pro" ? "default" : "secondary"}>
                    {user?.subscription?.toUpperCase()}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  {currentPlan?.name} plan - {currentPlan?.price}
                  {currentPlan?.period}
                </CardDescription>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Next billing date</p>
                <p className="font-semibold">February 15, 2024</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Designs Used</span>
                  <span className="text-sm text-gray-600">
                    {usageData.designs.used}/{usageData.designs.limit}
                  </span>
                </div>
                <Progress value={(usageData.designs.used / usageData.designs.limit) * 100} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Exports</span>
                  <span className="text-sm text-gray-600">
                    {usageData.exports.used}/{usageData.exports.limit}
                  </span>
                </div>
                <Progress value={(usageData.exports.used / usageData.exports.limit) * 100} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">AI Generations</span>
                  <span className="text-sm text-gray-600">
                    {usageData.aiGenerations.used}/{usageData.aiGenerations.limit}
                  </span>
                </div>
                <Progress
                  value={(usageData.aiGenerations.used / usageData.aiGenerations.limit) * 100}
                  className="h-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upgrade Plans */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upgrade Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? "border-blue-500 shadow-lg" : ""}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">Most Popular</Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-blue-600">
                    {plan.price}
                    <span className="text-lg text-gray-600">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={
                      plan.name.toLowerCase() === user?.subscription ? "outline" : plan.popular ? "default" : "outline"
                    }
                    disabled={plan.name.toLowerCase() === user?.subscription}
                    onClick={() => handleUpgrade(plan.name)}
                  >
                    {plan.name.toLowerCase() === user?.subscription ? "Current Plan" : `Upgrade to ${plan.name}`}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Payment Methods
            </CardTitle>
            <CardDescription>Manage your payment methods for subscriptions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Smartphone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">M-Pesa</p>
                    <p className="text-sm text-gray-600">+254 7XX XXX XXX</p>
                  </div>
                </div>
                <Badge variant="secondary">Primary</Badge>
              </div>

              <Button variant="outline" className="w-full bg-transparent">
                <CreditCard className="mr-2 h-4 w-4" />
                Add Payment Method
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>Your recent billing transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(transaction.date).toLocaleDateString()} • {transaction.method}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">KSh {transaction.amount.toLocaleString()}</p>
                    <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* M-Pesa Payment Modal */}
        {showMPesaPayment && selectedPlan && (
          <MPesaPayment
            plan={selectedPlan}
            amount={
              plans
                .find((p) => p.name === selectedPlan)
                ?.price.replace("KSh ", "")
                .replace(",", "") || "0"
            }
            onClose={() => {
              setShowMPesaPayment(false)
              setSelectedPlan(null)
            }}
            onSuccess={() => {
              setShowMPesaPayment(false)
              setSelectedPlan(null)
              // Handle successful payment
            }}
          />
        )}
      </div>
    </DashboardLayout>
  )
}
