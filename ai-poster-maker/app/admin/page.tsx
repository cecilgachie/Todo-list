"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, DollarSign, Download, TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useAuth } from "@/contexts/auth-context"
import { redirect } from "next/navigation"

const stats = [
  {
    title: "Total Users",
    value: "12,543",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Monthly Revenue",
    value: "KSh 1,245,000",
    change: "+23.1%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Designs Created",
    value: "45,231",
    change: "+18.2%",
    changeType: "positive" as const,
    icon: Download,
  },
  {
    title: "Active Subscriptions",
    value: "3,421",
    change: "+8.7%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
]

const recentUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    plan: "Pro",
    joinDate: "2024-01-15",
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    plan: "Free",
    joinDate: "2024-01-14",
    status: "active",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    plan: "Enterprise",
    joinDate: "2024-01-13",
    status: "pending",
  },
]

const systemHealth = [
  {
    service: "API Server",
    status: "healthy",
    uptime: "99.9%",
    responseTime: "120ms",
  },
  {
    service: "Database",
    status: "healthy",
    uptime: "99.8%",
    responseTime: "45ms",
  },
  {
    service: "AI Service",
    status: "warning",
    uptime: "98.5%",
    responseTime: "2.1s",
  },
  {
    service: "File Storage",
    status: "healthy",
    uptime: "99.9%",
    responseTime: "89ms",
  },
]

export default function AdminPage() {
  const { user } = useAuth()

  // Redirect if not admin
  if (user?.role !== "admin") {
    redirect("/dashboard")
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor system performance and user analytics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Users */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>Latest user registrations and activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-xs text-gray-500">Joined {new Date(user.joinDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={user.plan === "Enterprise" ? "default" : user.plan === "Pro" ? "secondary" : "outline"}
                      >
                        {user.plan}
                      </Badge>
                      <div className="mt-1">
                        <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>Monitor service status and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemHealth.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {service.status === "healthy" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : service.status === "warning" ? (
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <Clock className="h-5 w-5 text-red-500" />
                      )}
                      <div>
                        <p className="font-medium">{service.service}</p>
                        <p className="text-sm text-gray-600">Uptime: {service.uptime}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          service.status === "healthy"
                            ? "default"
                            : service.status === "warning"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {service.status}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">{service.responseTime}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Analytics</CardTitle>
            <CardDescription>Monthly revenue and subscription trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Revenue chart would be displayed here</p>
                <p className="text-sm text-gray-500">Integration with charting library needed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
