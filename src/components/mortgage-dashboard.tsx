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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">Welcome back, John Smith</h2>
                <p className="text-muted-foreground mt-1 text-sm sm:text-base">Here's what's happening with your mortgage deals today.</p>
              </div>
              <Select defaultValue="this-month">
                <SelectTrigger className="w-full sm:w-40">
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
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold truncate">Mortgage Brokerage Portal</h1>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">Manage deals, lenders, and client relationships</p>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-between sm:justify-end">
              <ThemeToggle />
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-medium">John Smith</div>
                  <div className="text-xs text-muted-foreground">Senior Mortgage Broker</div>
                </div>
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <User className="h-3 w-3 sm:h-4 sm:w-4" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="text-xs sm:text-sm px-2 sm:px-4" size="sm">
                    <Upload className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden xs:inline">Import Data</span>
                    <span className="xs:hidden">Import</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] max-w-2xl max-h-[85vh] overflow-y-auto sm:w-[90vw] md:w-[80vw] lg:max-w-2xl">
                  <DialogHeader className="pb-4 border-b">
                    <DialogTitle className="text-xl font-semibold">Import CRM Data</DialogTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Upload a CSV file from your CRM platform to update dashboard data
                    </p>
                  </DialogHeader>
                  
                  <div className="space-y-6 pt-4">
                    {/* Warning Alert */}
                    <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800/50">
                      <Warning className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      <AlertDescription className="text-amber-800 dark:text-amber-200 text-sm">
                        This functionality demonstrates CSV import from your CRM. Try downloading the sample file and importing it to see how new deals are added.
                      </AlertDescription>
                    </Alert>

                    {/* CSV File Upload Section */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">CSV File</h3>
                      
                      <div className="flex items-center gap-3">
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
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
                            size="sm"
                          >
                            Choose File
                          </Button>
                          <span className="text-sm text-muted-foreground flex-1 min-w-0">
                            {selectedFile ? selectedFile.name : 'No file chosen'}
                          </span>
                        </div>
                        <Button variant="outline" size="icon" className="p-2">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Required CSV Format Section */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Warning className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Required CSV Format</span>
                        </div>
                        <Button 
                          variant="outline" 
                          onClick={downloadSampleFile}
                          size="sm"
                          className="text-xs"
                        >
                          Download Sample
                        </Button>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        Your CSV file should include the following columns:
                      </div>
                      
                      <div className="bg-muted/50 p-4 rounded-lg border">
                        <code className="text-sm font-mono text-foreground block break-all">
                          Client_Name, Amount, Status, Date, Type, Assigned_To
                        </code>
                      </div>
                      
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Status should be "Closed" or "Pending". Amount should be numeric (dollar signs will be removed automatically). Assigned To is optional and will default to "John" if not provided.</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center pt-4 border-t">
                      <Button 
                        variant="ghost" 
                        onClick={handleClear}
                        disabled={!selectedFile}
                        size="sm"
                      >
                        Clear
                      </Button>
                      <div className="flex gap-3">
                        <Button 
                          variant="outline" 
                          onClick={() => setIsImportDialogOpen(false)}
                          size="sm"
                        >
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleImportData}
                          disabled={!selectedFile}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          size="sm"
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
      <nav className="bg-card overflow-x-auto">
        <div className="container mx-auto px-4 sm:px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full min-w-max grid-cols-7 bg-transparent p-0 h-auto">
              {tabConfig.map((tab) => {
                const Icon = tab.icon
                return (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 px-2 sm:px-4 py-2 sm:py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary hover:text-primary transition-colors min-w-[80px] sm:min-w-[120px]"
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="text-xs sm:text-sm text-center truncate">{tab.label}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </Tabs>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {renderTabContent()}
      </main>
    </div>
  )
}