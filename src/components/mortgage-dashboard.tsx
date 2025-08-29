import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
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
  DownloadSimple,
  MagnifyingGlass,
  Eye
} from "@phosphor-icons/react"

export function MortgageDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all-statuses")
  const [lenderFilter, setLenderFilter] = useState("all-lenders")

  // Sample deals data
  const dealsData = [
    {
      id: "D001",
      borrower: "Johnson Family",
      loanAmount: "$450,000",
      lender: "First National Bank", 
      status: "Underwriting",
      closeDate: "1/15/2025",
      rate: "6.75%"
    },
    {
      id: "D002", 
      borrower: "Miller Corporation",
      loanAmount: "$850,000",
      lender: "Community Credit Union",
      status: "Approved",
      closeDate: "12/20/2024", 
      rate: "7.25%"
    },
    {
      id: "D003",
      borrower: "Smith Family Trust", 
      loanAmount: "$680,000",
      lender: "Metro Mortgage Solutions",
      status: "Closed",
      closeDate: "11/30/2024",
      rate: "6.5%"
    },
    {
      id: "D004",
      borrower: "Construction Plus LLC",
      loanAmount: "$1,200,000", 
      lender: "Builder's Bank",
      status: "Submitted",
      closeDate: "2/1/2025",
      rate: "8%"
    },
    {
      id: "D005",
      borrower: "Wilson Holdings",
      loanAmount: "$320,000", 
      lender: "First National Bank",
      status: "Denied",
      closeDate: "N/A",
      rate: "N/A"
    }
  ]

  // Filter deals based on search term and status
  const filteredDeals = dealsData.filter((deal) => {
    const matchesSearch = deal.borrower.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all-statuses" || 
                         deal.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Underwriting":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-300">{status}</Badge>
      case "Approved":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300">{status}</Badge>
      case "Closed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-300">{status}</Badge>
      case "Submitted":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-900/20 dark:text-gray-300">{status}</Badge>
      case "Denied":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-300">{status}</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

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
            {/* Header Section */}
            <Card className="bg-muted/30">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground">Deal Management</h2>
                    <p className="text-muted-foreground mt-1">Search and filter your mortgage deals</p>
                  </div>
                  
                  {/* Search and Filter Row */}
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search Input */}
                    <div className="flex-1 relative">
                      <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by borrower name or deal ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-background"
                      />
                    </div>
                    
                    {/* Status Filter */}
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full lg:w-48 bg-background border-border rounded-lg">
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent className="w-[var(--radix-select-trigger-width)] p-0 border-border rounded-lg shadow-lg">
                        <SelectItem value="all-statuses" className="px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/50 focus:bg-muted/50">
                          All Statuses
                        </SelectItem>
                        <SelectItem value="submitted" className="px-4 py-3 text-sm text-foreground hover:bg-muted/50 focus:bg-muted/50">
                          Submitted
                        </SelectItem>
                        <SelectItem value="underwriting" className="px-4 py-3 text-sm text-foreground hover:bg-muted/50 focus:bg-muted/50">
                          Underwriting
                        </SelectItem>
                        <SelectItem value="approved" className="px-4 py-3 text-sm text-foreground hover:bg-muted/50 focus:bg-muted/50">
                          Approved
                        </SelectItem>
                        <SelectItem value="closed" className="px-4 py-3 text-sm text-foreground hover:bg-muted/50 focus:bg-muted/50">
                          Closed
                        </SelectItem>
                        <SelectItem value="denied" className="px-4 py-3 text-sm text-foreground hover:bg-muted/50 focus:bg-muted/50">
                          Denied
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {/* Lender Filter */}
                    <Select value={lenderFilter} onValueChange={setLenderFilter}>
                      <SelectTrigger className="w-full lg:w-48 bg-background">
                        <SelectValue placeholder="All Lenders" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-lenders">All Lenders</SelectItem>
                        <SelectItem value="first-national">First National Bank</SelectItem>
                        <SelectItem value="community-credit">Community Credit Union</SelectItem>
                        <SelectItem value="metro-mortgage">Metro Mortgage Solutions</SelectItem>
                        <SelectItem value="builders-bank">Builder's Bank</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Deals Table Section */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Deals ({filteredDeals.length})</h3>
                  
                  {/* Desktop Table */}
                  <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Deal ID</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Borrower</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Loan Amount</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Lender</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Close Date</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Rate</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDeals.map((deal) => (
                          <tr key={deal.id} className="border-b hover:bg-muted/30 transition-colors">
                            <td className="py-4 px-4 font-medium">{deal.id}</td>
                            <td className="py-4 px-4">{deal.borrower}</td>
                            <td className="py-4 px-4 font-medium">{deal.loanAmount}</td>
                            <td className="py-4 px-4">{deal.lender}</td>
                            <td className="py-4 px-4">{getStatusBadge(deal.status)}</td>
                            <td className="py-4 px-4">{deal.closeDate}</td>
                            <td className="py-4 px-4 font-medium">{deal.rate}</td>
                            <td className="py-4 px-4">
                              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="lg:hidden space-y-4">
                    {filteredDeals.map((deal) => (
                      <Card key={deal.id} className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{deal.id}</span>
                            {getStatusBadge(deal.status)}
                          </div>
                          <div>
                            <div className="font-medium">{deal.borrower}</div>
                            <div className="text-sm text-muted-foreground">{deal.lender}</div>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <div>
                              <div className="font-medium">{deal.loanAmount}</div>
                              <div className="text-muted-foreground">{deal.rate}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-muted-foreground">Close Date</div>
                              <div>{deal.closeDate}</div>
                            </div>
                          </div>
                          <div className="pt-2 border-t">
                            <Button variant="outline" size="sm" className="w-full">
                              <Eye className="h-4 w-4 mr-2" />
                              View Deal
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
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
                    className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 px-2 sm:px-4 py-2 sm:py-3 rounded-none data-[state=active]:bg-muted/50 data-[state=active]:text-primary hover:text-primary transition-colors min-w-[80px] sm:min-w-[120px]"
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