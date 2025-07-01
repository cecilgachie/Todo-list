"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Cookie, Settings, X, Shield } from "lucide-react"
import Link from "next/link"

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  })

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    }
    setPreferences(allAccepted)
    localStorage.setItem("cookie-consent", JSON.stringify(allAccepted))
    setShowBanner(false)
  }

  const handleAcceptSelected = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences))
    setShowBanner(false)
    setShowSettings(false)
  }

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    }
    setPreferences(onlyNecessary)
    localStorage.setItem("cookie-consent", JSON.stringify(onlyNecessary))
    setShowBanner(false)
  }

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    setPreferences((prev) => ({ ...prev, [key]: value }))
  }

  if (!showBanner) return null

  return (
    <>
      {/* Cookie Banner */}
      {!showSettings && (
        <Card className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto md:left-auto md:right-4 md:max-w-sm shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Cookie className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-sm mb-2">We use cookies</h3>
                <p className="text-xs text-gray-600 mb-4">
                  We use cookies to enhance your experience, analyze site traffic, and personalize content. You can
                  manage your preferences anytime.
                </p>

                <div className="flex flex-col space-y-2">
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={handleAcceptAll} className="flex-1">
                      Accept All
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setShowSettings(true)}>
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button size="sm" variant="ghost" onClick={handleRejectAll} className="text-xs">
                    Reject All
                  </Button>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowBanner(false)} className="h-6 w-6 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cookie Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Shield className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold">Cookie Preferences</h2>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowSettings(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-gray-600 mb-6">
                We use cookies to provide you with the best possible experience. You can review and modify your cookie
                preferences at any time. Some cookies are essential for the website to function properly.
              </p>

              <Tabs defaultValue="preferences" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>

                <TabsContent value="preferences" className="space-y-6">
                  <div className="space-y-4">
                    {/* Necessary Cookies */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium">Necessary Cookies</h3>
                          <Badge variant="secondary">Required</Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Essential for the website to function properly. Cannot be disabled.
                        </p>
                      </div>
                      <Switch checked={true} disabled />
                    </div>

                    {/* Analytics Cookies */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">Analytics Cookies</h3>
                        <p className="text-sm text-gray-600">
                          Help us understand how visitors interact with our website.
                        </p>
                      </div>
                      <Switch
                        checked={preferences.analytics}
                        onCheckedChange={(checked) => updatePreference("analytics", checked)}
                      />
                    </div>

                    {/* Marketing Cookies */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">Marketing Cookies</h3>
                        <p className="text-sm text-gray-600">
                          Used to deliver personalized advertisements and track campaign performance.
                        </p>
                      </div>
                      <Switch
                        checked={preferences.marketing}
                        onCheckedChange={(checked) => updatePreference("marketing", checked)}
                      />
                    </div>

                    {/* Functional Cookies */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">Functional Cookies</h3>
                        <p className="text-sm text-gray-600">
                          Enable enhanced functionality and personalization features.
                        </p>
                      </div>
                      <Switch
                        checked={preferences.functional}
                        onCheckedChange={(checked) => updatePreference("functional", checked)}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="details" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">What are cookies?</h3>
                      <p className="text-sm text-gray-600">
                        Cookies are small text files that are stored on your device when you visit a website. They help
                        websites remember your preferences and provide a better user experience.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">How we use cookies</h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Remember your login status and preferences</li>
                        <li>• Analyze website traffic and user behavior</li>
                        <li>• Personalize content and advertisements</li>
                        <li>• Improve website functionality and performance</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Managing cookies</h3>
                      <p className="text-sm text-gray-600">
                        You can control and delete cookies through your browser settings. However, disabling certain
                        cookies may affect website functionality.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Learn more</h3>
                      <p className="text-sm text-gray-600">
                        For more information about our privacy practices, please read our{" "}
                        <Link href="/privacy" className="text-blue-600 hover:underline">
                          Privacy Policy
                        </Link>{" "}
                        and{" "}
                        <Link href="/cookies" className="text-blue-600 hover:underline">
                          Cookie Policy
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex space-x-3 mt-6">
                <Button onClick={handleAcceptSelected} className="flex-1">
                  Save Preferences
                </Button>
                <Button variant="outline" onClick={handleAcceptAll}>
                  Accept All
                </Button>
                <Button variant="ghost" onClick={handleRejectAll}>
                  Reject All
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
