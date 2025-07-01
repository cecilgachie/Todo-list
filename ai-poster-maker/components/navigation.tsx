"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Sparkles, Menu } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"

const navigation = {
  main: [
    {
      name: "Templates",
      href: "/templates",
      description: "Browse our collection of professional templates",
      featured: [
        { name: "Business Flyers", href: "/templates?category=business" },
        { name: "Event Posters", href: "/templates?category=events" },
        { name: "Marketing Materials", href: "/templates?category=marketing" },
        { name: "Social Media", href: "/templates?category=social" },
      ],
    },
    {
      name: "Features",
      href: "/features",
      description: "Discover powerful AI-driven design tools",
      featured: [
        { name: "AI Content Generator", href: "/features#ai-content" },
        { name: "Smart Design Tools", href: "/features#design-tools" },
        { name: "Brand Kit Manager", href: "/features#brand-kit" },
        { name: "Collaboration", href: "/features#collaboration" },
      ],
    },
    {
      name: "Pricing",
      href: "/pricing",
      description: "Choose the perfect plan for your needs",
    },
    {
      name: "Resources",
      href: "/resources",
      description: "Learn and get inspired",
      featured: [
        { name: "Design Blog", href: "/blog" },
        { name: "Tutorials", href: "/tutorials" },
        { name: "Design Tips", href: "/tips" },
        { name: "Help Center", href: "/help" },
      ],
    },
  ],
  footer: [
    {
      title: "Product",
      links: [
        { name: "Templates", href: "/templates" },
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "API", href: "/api-docs" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "/blog" },
        { name: "Tutorials", href: "/tutorials" },
        { name: "Help Center", href: "/help" },
        { name: "Community", href: "/community" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
        { name: "Press", href: "/press" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "GDPR", href: "/gdpr" },
      ],
    },
  ],
}

export function Navigation() {
  const { user } = useAuth()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">AI Poster Maker</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {navigation.main.map((item) => (
                <NavigationMenuItem key={item.name}>
                  {item.featured ? (
                    <>
                      <NavigationMenuTrigger
                        className={cn(
                          "text-gray-600 hover:text-gray-900",
                          pathname.startsWith(item.href) && "text-blue-600",
                        )}
                      >
                        {item.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          <div className="row-span-3">
                            <NavigationMenuLink asChild>
                              <Link
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500 to-blue-600 p-6 no-underline outline-none focus:shadow-md"
                                href={item.href}
                              >
                                <div className="mb-2 mt-4 text-lg font-medium text-white">{item.name}</div>
                                <p className="text-sm leading-tight text-blue-100">{item.description}</p>
                              </Link>
                            </NavigationMenuLink>
                          </div>
                          {item.featured.map((subItem) => (
                            <NavigationMenuLink key={subItem.name} asChild>
                              <Link
                                href={subItem.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 focus:bg-gray-50"
                              >
                                <div className="text-sm font-medium leading-none">{subItem.name}</div>
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50 hover:text-gray-900 focus:bg-gray-50 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                          pathname === item.href ? "text-blue-600" : "text-gray-600",
                        )}
                      >
                        {item.name}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">{user.subscription}</Badge>
                <Link href="/dashboard">
                  <Button>Dashboard</Button>
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/register">
                  <Button>Get Started</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="flex items-center space-x-2">
                    <Sparkles className="h-6 w-6 text-blue-600" />
                    <span>AI Poster Maker</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {navigation.main.map((item) => (
                    <div key={item.name} className="space-y-2">
                      <Link
                        href={item.href}
                        className="block text-lg font-medium text-gray-900 hover:text-blue-600"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                      {item.featured && (
                        <div className="ml-4 space-y-2">
                          {item.featured.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block text-sm text-gray-600 hover:text-blue-600"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  {!user && (
                    <div className="pt-4 space-y-2">
                      <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full bg-transparent">
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full">Get Started</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
