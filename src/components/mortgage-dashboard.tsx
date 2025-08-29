import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import { DashboardMetrics } from "@/components/dashboard-metrics"
import { DashboardCharts } from "@/components/dashboard-charts"
import { RecentDeals } from "@/components/recent-deals"
import { AlertsNotifications } from "@/components/alerts-notifications"
import {
  TrendingUp,
  House,
  Handshake,
  FileText,
  Robot,
  Link,
  Gear,
  Upload,
  User
} from "@phosphor-icons/react"

export function MortgageDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const tabConfig = [
    { id: "dashboard", label: "Dashboard", icon: TrendingUp },
    { id: "deals", label: "Deals", icon: House },
    { id: "lenders", label: "Lenders", icon: Handshake },
    { id: "company-docs", label: "Company Docs", icon: FileText },
    { id: "assistant", label: "Assistant", icon: Robot },
    { id: "crm-integration", label: "CRM Integration", icon: Link },
    { id: "admin", label: "Admin", icon: Gear }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">Welcome back, John Smith</h2>
                <p className="text-muted-foreground mt-1">Here's what's happening with your mortgage deals today.</p>
              </div>
              <Select defaultValue="this-month">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="this-quarter">This Quarter</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DashboardMetrics />
            <DashboardCharts />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentDeals />
              <AlertsNotifications />
            </div>
          </div>
        )
      case "deals":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Deal Management</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">Deal management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </div>
        )
      case "lenders":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Lender Network</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">Lender management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </div>
        )
      case "company-docs":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Company Documents</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">Document management system will be implemented here.</p>
              </CardContent>
            </Card>
          </div>
        )
      case "assistant":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">AI Assistant</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">AI assistant interface will be implemented here.</p>
              </CardContent>
            </Card>
          </div>
        )
      case "crm-integration":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">CRM Integration</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">CRM integration settings will be implemented here.</p>
              </CardContent>
            </Card>
          </div>
        )
      case "admin":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Administration</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">Admin panel will be implemented here.</p>
              </CardContent>
            </Card>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Mortgage Brokerage Portal</h1>
              <p className="text-sm text-muted-foreground">Manage deals, lenders, and client relationships</p>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium">John Smith</div>
                  <div className="text-xs text-muted-foreground">Senior Mortgage Broker</div>
                </div>
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <Button className="ml-4">
                <Upload className="h-4 w-4 mr-2" />
                Import Data
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b bg-card">
        <div className="container mx-auto px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-7 bg-transparent p-0 h-auto">
              {tabConfig.map((tab) => {
                const Icon = tab.icon
                return (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex items-center space-x-2 px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary hover:text-primary transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </Tabs>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {renderTabContent()}
      </main>
    </div>
  )
}