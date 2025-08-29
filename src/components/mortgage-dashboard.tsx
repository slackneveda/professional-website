import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
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
  User,
  X,
  Warning,
  DownloadSimple
} from "@phosphor-icons/react"

export function MortgageDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'text/csv') {
      setSelectedFile(file)
    }
  }

  const handleImportData = () => {
    if (selectedFile) {
      // Here you would implement the actual import logic
      console.log('Importing file:', selectedFile.name)
      setIsImportDialogOpen(false)
      setSelectedFile(null)
    }
  }

  const handleClear = () => {
    setSelectedFile(null)
    const fileInput = document.getElementById('csv-file-input') as HTMLInputElement
    if (fileInput) {
      fileInput.value = ''
    }
  }

  const downloadSampleFile = () => {
    const sampleData = `Client_Name,Amount,Status,Date,Type,Assigned_To
John Doe,450000,Pending,2024-01-15,Purchase,John Smith
Jane Smith,320000,Closed,2024-01-10,Refinance,John Smith
Bob Johnson,275000,Pending,2024-01-12,Purchase,John Smith`
    
    const blob = new Blob([sampleData], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sample_crm_data.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

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
              <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="ml-4">
                    <Upload className="h-4 w-4 mr-2" />
                    Import Data
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Import CRM Data</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    <p className="text-muted-foreground">
                      Upload a CSV file from your CRM platform to update dashboard data
                    </p>

                    <Alert className="bg-orange-50 border-orange-200 dark:bg-orange-950 dark:border-orange-800">
                      <Warning className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                      <AlertDescription className="text-orange-800 dark:text-orange-200">
                        This functionality demonstrates CSV import from your CRM. Try downloading the sample file and importing it to see how new deals are added.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">CSV File</h3>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex-1 flex items-center gap-3 p-3 border rounded-lg bg-muted/30">
                          <input
                            id="csv-file-input"
                            type="file"
                            accept=".csv"
                            onChange={handleFileSelect}
                            className="hidden"
                          />
                          <Button
                            onClick={() => document.getElementById('csv-file-input')?.click()}
                            className="shrink-0"
                          >
                            Choose File
                          </Button>
                          <span className="text-muted-foreground">
                            {selectedFile ? selectedFile.name : 'No file chosen'}
                          </span>
                        </div>
                        <Button variant="outline" size="icon">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
                        <Warning className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <div className="space-y-2">
                          <div className="font-medium text-blue-800 dark:text-blue-200">Required CSV Format</div>
                          <div className="text-sm text-blue-700 dark:text-blue-300">
                            Your CSV file should include the following columns:
                          </div>
                          <code className="block text-xs bg-blue-100 dark:bg-blue-900 p-2 rounded font-mono text-blue-900 dark:text-blue-100">
                            Client_Name, Amount, Status, Date, Type, Assigned_To
                          </code>
                          <div className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                            <p>Status should be "Closed" or "Pending". Amount should be numeric (dollar signs will be removed automatically). Assigned To is optional and will default to "John" if not provided.</p>
                          </div>
                        </div>
                      </Alert>

                      <div className="flex flex-col justify-center">
                        <Button 
                          variant="outline" 
                          onClick={downloadSampleFile}
                          className="w-full"
                        >
                          <DownloadSimple className="h-4 w-4 mr-2" />
                          Download Sample
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button 
                        variant="outline" 
                        onClick={handleClear}
                        disabled={!selectedFile}
                      >
                        Clear
                      </Button>
                      <div className="flex gap-3">
                        <Button 
                          variant="outline" 
                          onClick={() => setIsImportDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleImportData}
                          disabled={!selectedFile}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Import Data
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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