"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Smartphone, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MPesaPaymentProps {
  plan: string
  amount: string
  onClose: () => void
  onSuccess: () => void
}

type PaymentStatus = "idle" | "initiating" | "pending" | "success" | "failed"

export function MPesaPayment({ plan, amount, onClose, onSuccess }: MPesaPaymentProps) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle")
  const [transactionId, setTransactionId] = useState("")
  const { toast } = useToast()

  const formatPhoneNumber = (phone: string) => {
    // Remove any non-digit characters
    const cleaned = phone.replace(/\D/g, "")

    // Format as Kenyan number
    if (cleaned.startsWith("254")) {
      return cleaned
    } else if (cleaned.startsWith("0")) {
      return "254" + cleaned.slice(1)
    } else if (cleaned.startsWith("7") || cleaned.startsWith("1")) {
      return "254" + cleaned
    }
    return cleaned
  }

  const initiatePayment = async () => {
    if (!phoneNumber) {
      toast({
        title: "Phone number required",
        description: "Please enter your M-Pesa phone number.",
        variant: "destructive",
      })
      return
    }

    const formattedPhone = formatPhoneNumber(phoneNumber)
    if (formattedPhone.length !== 12) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid Kenyan phone number.",
        variant: "destructive",
      })
      return
    }

    setPaymentStatus("initiating")

    try {
      // Simulate M-Pesa Daraja API call
      const response = await fetch("/api/mpesa/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: formattedPhone,
          amount: Number.parseInt(amount),
          plan: plan,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setTransactionId(data.transactionId)
        setPaymentStatus("pending")

        toast({
          title: "Payment initiated",
          description: "Please check your phone for the M-Pesa prompt.",
        })

        // Poll for payment status
        pollPaymentStatus(data.transactionId)
      } else {
        throw new Error("Payment initiation failed")
      }
    } catch (error) {
      console.error("Payment error:", error)
      setPaymentStatus("failed")
      toast({
        title: "Payment failed",
        description: "Failed to initiate M-Pesa payment. Please try again.",
        variant: "destructive",
      })
    }
  }

  const pollPaymentStatus = async (txnId: string) => {
    let attempts = 0
    const maxAttempts = 30 // 5 minutes with 10-second intervals

    const poll = async () => {
      try {
        const response = await fetch(`/api/mpesa/status/${txnId}`)
        const data = await response.json()

        if (data.status === "completed") {
          setPaymentStatus("success")
          toast({
            title: "Payment successful!",
            description: "Your subscription has been upgraded.",
          })
          setTimeout(() => {
            onSuccess()
          }, 2000)
        } else if (data.status === "failed") {
          setPaymentStatus("failed")
          toast({
            title: "Payment failed",
            description: "The M-Pesa payment was not completed.",
            variant: "destructive",
          })
        } else if (attempts < maxAttempts) {
          attempts++
          setTimeout(poll, 10000) // Poll every 10 seconds
        } else {
          setPaymentStatus("failed")
          toast({
            title: "Payment timeout",
            description: "Payment verification timed out. Please contact support.",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Status check error:", error)
        if (attempts < maxAttempts) {
          attempts++
          setTimeout(poll, 10000)
        } else {
          setPaymentStatus("failed")
        }
      }
    }

    poll()
  }

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case "initiating":
      case "pending":
        return <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
      case "success":
        return <CheckCircle className="h-8 w-8 text-green-600" />
      case "failed":
        return <AlertCircle className="h-8 w-8 text-red-600" />
      default:
        return <Smartphone className="h-8 w-8 text-gray-400" />
    }
  }

  const getStatusMessage = () => {
    switch (paymentStatus) {
      case "initiating":
        return "Initiating M-Pesa payment..."
      case "pending":
        return "Waiting for payment confirmation. Please check your phone for the M-Pesa prompt."
      case "success":
        return "Payment successful! Your subscription has been upgraded."
      case "failed":
        return "Payment failed. Please try again or contact support."
      default:
        return "Enter your M-Pesa phone number to proceed with payment."
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Smartphone className="h-6 w-6 text-green-600" />
              <div>
                <CardTitle>M-Pesa Payment</CardTitle>
                <CardDescription>Upgrade to {plan} Plan</CardDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} disabled={paymentStatus === "pending"}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Payment Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{plan} Plan</span>
              <Badge>{plan === "Pro" ? "Most Popular" : "Premium"}</Badge>
            </div>
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total Amount</span>
              <span className="text-green-600">KSh {Number.parseInt(amount).toLocaleString()}</span>
            </div>
          </div>

          {/* Status Display */}
          <div className="text-center py-6">
            <div className="mb-4">{getStatusIcon()}</div>
            <p className="text-sm text-gray-600 mb-4">{getStatusMessage()}</p>
            {transactionId && <p className="text-xs text-gray-500">Transaction ID: {transactionId}</p>}
          </div>

          {/* Phone Number Input */}
          {paymentStatus === "idle" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="phone">M-Pesa Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="0712345678 or 254712345678"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">Enter your Safaricom M-Pesa number</p>
              </div>

              <Button onClick={initiatePayment} className="w-full">
                Pay KSh {Number.parseInt(amount).toLocaleString()}
              </Button>
            </div>
          )}

          {/* Retry Button */}
          {paymentStatus === "failed" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="phone">M-Pesa Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="0712345678 or 254712345678"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              <Button onClick={initiatePayment} className="w-full">
                Retry Payment
              </Button>
            </div>
          )}

          {/* Instructions */}
          {paymentStatus === "pending" && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Payment Instructions:</h4>
              <ol className="text-sm text-blue-800 space-y-1">
                <li>1. Check your phone for M-Pesa prompt</li>
                <li>2. Enter your M-Pesa PIN</li>
                <li>3. Confirm the payment</li>
                <li>4. Wait for confirmation</li>
              </ol>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
