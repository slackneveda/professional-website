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
import { Textarea } from "@/components/ui/textarea"
import { ThemeToggle } from "@/components/theme-toggle"
import { DashboardMetrics } from "@/components/dashboard-metrics"
import { DashboardCharts } from "@/components/dashboard-charts"
import { RecentDeals } from "@/components/recent-deals"
import { AlertsNotifications } from "@/components/alerts-notifications"
import { LenderDetailsModal } from "@/components/lender-details-modal"
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
  Eye,
  X,
  Star,
  CaretLeft,
  CaretRight,
  ArrowSquareOut,
  File,
  ChartLine,
  ChatCircleDots,
  ArrowUp,
  ArrowClockwise
} from "@phosphor-icons/react"

export function MortgageDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all-statuses")
  const [lenderFilter, setLenderFilter] = useState("all-lenders")
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedDeal, setSelectedDeal] = useState<any>(null)
  const [lenderSearchTerm, setLenderSearchTerm] = useState("")
  const [chatMessages, setChatMessages] = useState<Array<{id: string, text: string, sender: 'user' | 'assistant', timestamp: Date}>>([])
  const [chatInput, setChatInput] = useState("")
  const [isLenderViewDialogOpen, setIsLenderViewDialogOpen] = useState(false)
  const [selectedLender, setSelectedLender] = useState<any>(null)

  // Sample deals data
  const dealsData = [
    {
      id: "D001",
      borrower: "Johnson Family",
      loanAmount: "$450,000",
      lender: "First National Bank", 
      status: "Underwriting",
      closeDate: "1/15/2025",
      rate: "6.75%",
      loanType: "purchase",
      created: "12/1/2024",
      submitted: "12/5/2024",
      lastActivity: "12/10/2024",
      documents: ["Application", "Income Verification", "Appraisal Pending"],
      notes: [
        "Excellent credit score",
        "Self-employed borrower - extra documentation needed"
      ]
    },
    {
      id: "D002", 
      borrower: "Miller Corporation",
      loanAmount: "$850,000",
      lender: "Community Credit Union",
      status: "Approved",
      closeDate: "12/20/2024", 
      rate: "7.25%",
      loanType: "commercial",
      created: "11/15/2024",
      submitted: "11/20/2024",
      lastActivity: "12/1/2024",
      documents: ["Application", "Income Verification", "Appraisal Complete"],
      notes: [
        "Commercial property loan",
        "Strong financials"
      ]
    },
    {
      id: "D003",
      borrower: "Smith Family Trust", 
      loanAmount: "$680,000",
      lender: "Metro Mortgage Solutions",
      status: "Closed",
      closeDate: "11/30/2024",
      rate: "6.5%",
      loanType: "refinance",
      created: "10/1/2024",
      submitted: "10/5/2024",
      lastActivity: "11/30/2024",
      documents: ["Application", "Income Verification", "Appraisal Complete"],
      notes: [
        "Refinance to lower rate",
        "Fast approval process"
      ]
    },
    {
      id: "D004",
      borrower: "Construction Plus LLC",
      loanAmount: "$1,200,000", 
      lender: "Builder's Bank",
      status: "Submitted",
      closeDate: "2/1/2025",
      rate: "8%",
      loanType: "construction",
      created: "11/1/2024",
      submitted: "11/15/2024",
      lastActivity: "12/5/2024",
      documents: ["Application", "Income Verification", "Plans Review"],
      notes: [
        "Construction loan for new development",
        "Higher rate due to risk"
      ]
    },
    {
      id: "D005",
      borrower: "Wilson Holdings",
      loanAmount: "$320,000", 
      lender: "First National Bank",
      status: "Denied",
      closeDate: "N/A",
      rate: "N/A",
      loanType: "purchase",
      created: "10/15/2024",
      submitted: "10/20/2024",
      lastActivity: "11/5/2024",
      documents: ["Application", "Income Verification"],
      notes: [
        "Insufficient income verification",
        "Credit score below threshold"
      ]
    }
  ]

  // Sample lenders data
  const lendersData = [
    {
      id: "L001",
      name: "First National Bank",
      specialties: ["Commercial Real Estate", "SBA Loans", "Construction Loans"],
      averageRating: 4.5,
      averageRatingCount: 23,
      myRating: 5.0,
      timesUsed: 15,
      baseRate: "6.25%",
      lastUsed: "12/8/2024",
      phone: "(555) 123-4567",
      email: "lending@firstnational.com",
      website: "https://firstnational.com",
      currentBaseRate: "6.25%",
      rateHistory: [
        { month: "Aug", rate: 6.6 },
        { month: "Sep", rate: 6.45 },
        { month: "Oct", rate: 6.3 },
        { month: "Dec", rate: 6.25 }
      ],
      notes: "Excellent service on commercial deals. Fast turnaround."
    },
    {
      id: "L002", 
      name: "Community Credit Union",
      specialties: ["First-Time Homebuyers", "Small Business"],
      averageRating: 4.8,
      averageRatingCount: 31,
      myRating: 4.0,
      timesUsed: 22,
      baseRate: "5.95%",
      lastUsed: "12/10/2024",
      phone: "(555) 234-5678",
      email: "loans@communitycu.org",
      website: "https://communitycu.org",
      currentBaseRate: "5.95%",
      rateHistory: [
        { month: "Aug", rate: 6.4 },
        { month: "Sep", rate: 6.2 },
        { month: "Oct", rate: 6.0 },
        { month: "Dec", rate: 5.95 }
      ],
      notes: "Great for first-time homebuyers. Very patient with clients."
    },
    {
      id: "L003",
      name: "Metro Mortgage Solutions", 
      specialties: ["Investment Properties", "Jumbo Loans"],
      averageRating: 4.2,
      averageRatingCount: 18,
      myRating: 4.0,
      timesUsed: 8,
      baseRate: "6.50%",
      lastUsed: "11/25/2024",
      phone: "(555) 345-6789",
      email: "info@metromorgage.com",
      website: "https://metromortgage.com",
      currentBaseRate: "6.50%",
      rateHistory: [
        { month: "Aug", rate: 6.9 },
        { month: "Sep", rate: 6.75 },
        { month: "Oct", rate: 6.6 },
        { month: "Dec", rate: 6.50 }
      ],
      notes: "Specializes in investment properties. Higher rates but reliable."
    },
    {
      id: "L004",
      name: "Builder's Bank",
      specialties: ["Construction Loans", "Developer Financing"],
      averageRating: 3.9,
      averageRatingCount: 12,
      myRating: 3.0,
      timesUsed: 5,
      baseRate: "7.00%",
      lastUsed: "12/5/2024",
      phone: "(555) 456-7890",
      email: "construction@buildersbank.com",
      website: "https://buildersbank.com",
      currentBaseRate: "7.00%",
      rateHistory: [
        { month: "Aug", rate: 7.4 },
        { month: "Sep", rate: 7.25 },
        { month: "Oct", rate: 7.1 },
        { month: "Dec", rate: 7.00 }
      ],
      notes: "Best for construction loans. Good relationship with contractors."
    },
    {
      id: "L005",
      name: "Regional Trust Bank",
      specialties: ["Private Banking", "High Net Worth"],
      averageRating: 4.6,
      averageRatingCount: 27,
      myRating: 5.0,
      timesUsed: 18,
      baseRate: "6.15%",
      lastUsed: "12/7/2024",
      phone: "(555) 567-8901",
      email: "private@regionaltrust.com", 
      website: "https://regionaltrust.com",
      currentBaseRate: "6.15%",
      rateHistory: [
        { month: "Aug", rate: 6.5 },
        { month: "Sep", rate: 6.35 },
        { month: "Oct", rate: 6.25 },
        { month: "Dec", rate: 6.15 }
      ],
      notes: "Excellent for high net worth clients. Premium service."
    }
  ]

  // Filter deals based on search term, status, and lender
  const filteredDeals = dealsData.filter((deal) => {
    const matchesSearch = deal.borrower.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.lender.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all-statuses" || 
                         deal.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesLender = lenderFilter === "all-lenders" || 
                         deal.lender.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '') === lenderFilter.toLowerCase()
    return matchesSearch && matchesStatus && matchesLender
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Underwriting":
        return <Badge className="bg-yellow-100 text-yellow-900 hover:bg-yellow-100 border-yellow-300 dark:bg-yellow-500/20 dark:text-yellow-300 dark:border-yellow-600 font-medium">{status}</Badge>
      case "Approved":
        return <Badge className="bg-blue-100 text-blue-900 hover:bg-blue-100 border-blue-300 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-600 font-medium">{status}</Badge>
      case "Closed":
        return <Badge className="bg-green-100 text-green-900 hover:bg-green-100 border-green-300 dark:bg-green-500/20 dark:text-green-300 dark:border-green-600 font-medium">{status}</Badge>
      case "Submitted":
        return <Badge className="bg-gray-100 text-gray-900 hover:bg-gray-100 border-gray-300 dark:bg-gray-500/20 dark:text-gray-300 dark:border-gray-600 font-medium">{status}</Badge>
      case "Denied":
        return <Badge className="bg-red-100 text-red-900 hover:bg-red-100 border-red-300 dark:bg-red-500/20 dark:text-red-300 dark:border-red-600 font-medium">{status}</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  // Filter lenders based on search term
  const filteredLenders = lendersData.filter((lender) => {
    const matchesSearch = lender.name.toLowerCase().includes(lenderSearchTerm.toLowerCase()) ||
                         lender.specialties.some(specialty => 
                           specialty.toLowerCase().includes(lenderSearchTerm.toLowerCase())
                         )
    return matchesSearch
  })

  // Star rating component
  const StarRating = ({ rating, maxRating = 5, count }: { rating: number; maxRating?: number; count?: number }) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(maxRating)].map((_, index) => (
          <Star
            key={index}
            className={`h-4 w-4 ${
              index < Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : index < rating
                ? "fill-yellow-400/50 text-yellow-400"
                : "fill-gray-200 text-gray-200 dark:fill-gray-600 dark:text-gray-600"
            }`}
          />
        ))}
        <span className="text-sm font-medium ml-1">{rating}</span>
        {count && <span className="text-sm text-muted-foreground ml-1">({count})</span>}
      </div>
    )
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

  const handleViewDeal = (deal: any) => {
    setSelectedDeal(deal)
    setIsViewDialogOpen(true)
  }

  const handleViewLender = (lender: any) => {
    setSelectedLender(lender)
    setIsLenderViewDialogOpen(true)
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
                      <SelectContent className="w-[var(--radix-select-trigger-width)] p-0 border-border rounded-xl shadow-lg bg-popover">
                        <SelectItem value="all-statuses" className="px-4 py-3 text-sm font-medium text-foreground hover:bg-muted focus:bg-muted rounded-lg mx-1 my-0.5 transition-colors duration-200 cursor-pointer">
                          All Statuses
                        </SelectItem>
                        <SelectItem value="submitted" className="px-4 py-3 text-sm transition-colors duration-200 cursor-pointer rounded-lg mx-1 my-0.5 bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:bg-gray-200 dark:focus:bg-gray-600">
                          Submitted
                        </SelectItem>
                        <SelectItem value="underwriting" className="px-4 py-3 text-sm transition-colors duration-200 cursor-pointer rounded-lg mx-1 my-0.5 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-200 dark:hover:bg-yellow-900/50 focus:bg-yellow-200 dark:focus:bg-yellow-900/50">
                          Underwriting
                        </SelectItem>
                        <SelectItem value="approved" className="px-4 py-3 text-sm transition-colors duration-200 cursor-pointer rounded-lg mx-1 my-0.5 bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:hover:bg-blue-900/50 focus:bg-blue-200 dark:focus:bg-blue-900/50">
                          Approved
                        </SelectItem>
                        <SelectItem value="closed" className="px-4 py-3 text-sm transition-colors duration-200 cursor-pointer rounded-lg mx-1 my-0.5 bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-200 dark:hover:bg-green-900/50 focus:bg-green-200 dark:focus:bg-green-900/50">
                          Closed
                        </SelectItem>
                        <SelectItem value="denied" className="px-4 py-3 text-sm transition-colors duration-200 cursor-pointer rounded-lg mx-1 my-0.5 bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-200 dark:hover:bg-red-900/50 focus:bg-red-200 dark:focus:bg-red-900/50">
                          Denied
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {/* Lender Filter */}
                    <Select value={lenderFilter} onValueChange={setLenderFilter}>
                      <SelectTrigger className="w-full lg:w-48 bg-background border-border rounded-lg">
                        <SelectValue placeholder="All Lenders" />
                      </SelectTrigger>
                      <SelectContent className="w-[var(--radix-select-trigger-width)] p-0 border-border rounded-xl shadow-lg bg-popover">
                        <SelectItem value="all-lenders" className="px-4 py-3 text-sm font-medium text-foreground hover:bg-orange-100 dark:hover:bg-orange-900/50 focus:bg-orange-100 dark:focus:bg-orange-900/50 rounded-lg mx-1 my-0.5 transition-colors duration-200 cursor-pointer">
                          All Lenders
                        </SelectItem>
                        <SelectItem value="first-national-bank" className="px-4 py-3 text-sm text-foreground hover:bg-orange-100 dark:hover:bg-orange-900/50 focus:bg-orange-100 dark:focus:bg-orange-900/50 rounded-lg mx-1 my-0.5 transition-colors duration-200 cursor-pointer">
                          First National Bank
                        </SelectItem>
                        <SelectItem value="community-credit-union" className="px-4 py-3 text-sm text-foreground hover:bg-orange-100 dark:hover:bg-orange-900/50 focus:bg-orange-100 dark:focus:bg-orange-900/50 rounded-lg mx-1 my-0.5 transition-colors duration-200 cursor-pointer">
                          Community Credit Union
                        </SelectItem>
                        <SelectItem value="metro-mortgage-solutions" className="px-4 py-3 text-sm text-foreground hover:bg-orange-100 dark:hover:bg-orange-900/50 focus:bg-orange-100 dark:focus:bg-orange-900/50 rounded-lg mx-1 my-0.5 transition-colors duration-200 cursor-pointer">
                          Metro Mortgage Solutions
                        </SelectItem>
                        <SelectItem value="builders-bank" className="px-4 py-3 text-sm text-foreground hover:bg-orange-100 dark:hover:bg-orange-900/50 focus:bg-orange-100 dark:focus:bg-orange-900/50 rounded-lg mx-1 my-0.5 transition-colors duration-200 cursor-pointer">
                          Builder's Bank
                        </SelectItem>
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
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-muted-foreground hover:text-foreground"
                                onClick={() => handleViewDeal(deal)}
                              >
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
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full"
                              onClick={() => handleViewDeal(deal)}
                            >
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
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">Lender Management</h2>
                <p className="text-muted-foreground mt-1 text-sm sm:text-base">View ratings, usage stats, and manage lender relationships</p>
              </div>
              {/* Search Input */}
              <div className="relative w-full sm:w-80">
                <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search lenders or specialties..."
                  value={lenderSearchTerm}
                  onChange={(e) => setLenderSearchTerm(e.target.value)}
                  className="pl-10 bg-background"
                />
              </div>
            </div>



            {/* Lenders Table Section */}
            <Card className="bg-muted/30">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Lender Directory ({filteredLenders.length})</h3>
                    <p className="text-muted-foreground text-sm">Click on a lender to view detailed profile and rate history</p>
                  </div>
                  
                  {/* Desktop Table */}
                  <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Lender Name</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Average Rating</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">My Rating</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Times Used</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Base Rate</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Last Used</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLenders.map((lender) => (
                          <tr key={lender.id} className="border-b hover:bg-background/50 transition-colors">
                            <td className="py-4 px-4">
                              <div>
                                <div className="font-medium text-foreground">{lender.name}</div>
                                <div className="text-sm text-muted-foreground">{lender.specialties.join(", ")}</div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <StarRating rating={lender.averageRating} count={lender.averageRatingCount} />
                            </td>
                            <td className="py-4 px-4">
                              <StarRating rating={lender.myRating} />
                            </td>
                            <td className="py-4 px-4 font-medium">{lender.timesUsed}</td>
                            <td className="py-4 px-4 font-medium">{lender.baseRate}</td>
                            <td className="py-4 px-4">{lender.lastUsed}</td>
                            <td className="py-4 px-4">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-muted-foreground hover:text-foreground"
                                onClick={() => handleViewLender(lender)}
                              >
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
                    {filteredLenders.map((lender) => (
                      <Card key={lender.id} className="p-4 bg-background">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="font-medium text-foreground">{lender.name}</div>
                              <div className="text-sm text-muted-foreground">{lender.specialties.join(", ")}</div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-muted-foreground hover:text-foreground"
                              onClick={() => handleViewLender(lender)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="text-muted-foreground">Average Rating</div>
                              <StarRating rating={lender.averageRating} count={lender.averageRatingCount} />
                            </div>
                            <div>
                              <div className="text-muted-foreground">My Rating</div>
                              <StarRating rating={lender.myRating} />
                            </div>
                            <div>
                              <div className="text-muted-foreground">Times Used</div>
                              <div className="font-medium">{lender.timesUsed}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Base Rate</div>
                              <div className="font-medium">{lender.baseRate}</div>
                            </div>
                          </div>
                          <div className="text-sm">
                            <div className="text-muted-foreground">Last Used</div>
                            <div>{lender.lastUsed}</div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-center pt-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" disabled className="text-muted-foreground">
                        <CaretLeft className="h-4 w-4" />
                      </Button>
                      <div className="h-2 flex-1 bg-muted rounded-full mx-4">
                        <div className="h-full bg-primary rounded-full" style={{ width: "100%" }}></div>
                      </div>
                      <Button variant="ghost" size="sm" disabled className="text-muted-foreground">
                        <CaretRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lender Insights Cards - Bottom Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Top Rated Lender */}
              <Card className="bg-muted/30">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Top Rated Lender</h3>
                  <div className="space-y-3">
                    <h4 className="text-xl font-bold text-foreground">Community Credit Union</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[1, 2, 3, 4].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <Star className="h-4 w-4 text-gray-300" />
                      </div>
                      <span className="font-medium text-foreground">4.8</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Based on 31 reviews</p>
                  </div>
                </CardContent>
              </Card>

              {/* Most Used Lender */}
              <Card className="bg-muted/30">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Most Used Lender</h3>
                  <div className="space-y-3">
                    <h4 className="text-xl font-bold text-foreground">Community Credit Union</h4>
                    <p className="text-sm text-muted-foreground">Used 22 times</p>
                    <p className="text-sm text-muted-foreground">Last used: 12/10/2024</p>
                  </div>
                </CardContent>
              </Card>

              {/* Best Rate Available */}
              <Card className="bg-muted/30">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Best Rate Available</h3>
                  <div className="space-y-3">
                    <h4 className="text-xl font-bold text-foreground">Community Credit Union</h4>
                    <p className="text-2xl font-bold text-green-600">5.95%</p>
                    <p className="text-sm text-muted-foreground">Base rate for qualified borrowers</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      case "company-docs":
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Company Documents</h1>
              <p className="text-muted-foreground text-base">Access policies, marketing materials, training resources, and operational procedures</p>
            </div>

            {/* Search and Stats */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-sm text-muted-foreground">
                67 total documents across 4 categories
              </div>
              <div className="relative w-full sm:w-96">
                <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents and categories..."
                  className="pl-10"
                />
              </div>
            </div>

            {/* Document Categories Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Company Policies */}
              <Card className="bg-muted/30">
                <CardContent className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-background rounded-lg">
                        <File className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Company Policies</h3>
                        <p className="text-sm text-muted-foreground">HR policies, compliance guidelines, and procedures</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">12 items</Badge>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Last updated: 12/1/2024
                  </div>

                  {/* Recent Documents */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-foreground">Recent Documents:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                        <File className="h-4 w-4" />
                        <span>Employee Handbook</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                        <File className="h-4 w-4" />
                        <span>Code of Conduct</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                        <File className="h-4 w-4" />
                        <span>Privacy Policy</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                        <File className="h-4 w-4" />
                        <span>GDPR Compliance Guidelines</span>
                      </div>
                      <div className="text-sm text-primary cursor-pointer hover:underline">
                        +8 more documents
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 space-y-2">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <ArrowSquareOut className="h-4 w-4 mr-2" />
                      Open in SharePoint
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full">
                      <DownloadSimple className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Marketing Materials */}
              <Card className="bg-muted/30">
                <CardContent className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-background rounded-lg">
                        <ChartLine className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Marketing Materials</h3>
                        <p className="text-sm text-muted-foreground">Brochures, presentations, and promotional content</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">18 items</Badge>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Last updated: 11/28/2024
                  </div>

                  {/* Recent Documents */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-foreground">Recent Documents:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                        <File className="h-4 w-4" />
                        <span>Mortgage Product Brochures</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                        <File className="h-4 w-4" />
                        <span>Rate Sheets (Current)</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                        <File className="h-4 w-4" />
                        <span>Client Presentation Templates</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                        <File className="h-4 w-4" />
                        <span>Brand Guidelines</span>
                      </div>
                      <div className="text-sm text-primary cursor-pointer hover:underline">
                        +14 more documents
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 space-y-2">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <ArrowSquareOut className="h-4 w-4 mr-2" />
                      Open in SharePoint
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full">
                      <DownloadSimple className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Training Resources */}
              <Card className="bg-muted/30">
                <CardContent className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-background rounded-lg">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Training Resources</h3>
                        <p className="text-sm text-muted-foreground">Training materials, certifications, and learning paths</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">15 items</Badge>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Last updated: 12/5/2024
                  </div>

                  {/* Recent Documents */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-foreground">Recent Documents:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                        <File className="h-4 w-4" />
                        <span>New Broker Onboarding</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                        <File className="h-4 w-4" />
                        <span>Mortgage Fundamentals Course</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                        <File className="h-4 w-4" />
                        <span>Underwriting Guidelines</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                        <File className="h-4 w-4" />
                        <span>Credit Analysis Training</span>
                      </div>
                      <div className="text-sm text-primary cursor-pointer hover:underline">
                        +11 more documents
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 space-y-2">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <ArrowSquareOut className="h-4 w-4 mr-2" />
                      Open in SharePoint
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full">
                      <DownloadSimple className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Operations Manual */}
              <Card className="bg-muted/30">
                <CardContent className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-background rounded-lg">
                        <Gear className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Operations Manual</h3>
                        <p className="text-sm text-muted-foreground">Standard operating procedures and workflows</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">22 items</Badge>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Last updated: 12/3/2024
                  </div>

                  {/* Recent Documents */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-foreground">Recent Documents:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                        <File className="h-4 w-4" />
                        <span>Loan Processing Checklist</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                        <File className="h-4 w-4" />
                        <span>Application Intake Procedures</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                        <File className="h-4 w-4" />
                        <span>Document Collection Guidelines</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                        <File className="h-4 w-4" />
                        <span>Client Onboarding Workflow</span>
                      </div>
                      <div className="text-sm text-primary cursor-pointer hover:underline">
                        +18 more documents
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 space-y-2">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <ArrowSquareOut className="h-4 w-4 mr-2" />
                      Open in SharePoint
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full">
                      <DownloadSimple className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Access Section */}
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Quick Access</h2>
                <p className="text-sm text-muted-foreground">Frequently accessed documents and resources</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Current Rate Sheets */}
                <Card className="bg-background border border-border">
                  <CardContent className="p-4">
                    <h3 className="font-medium text-foreground mb-1">Current Rate Sheets</h3>
                    <p className="text-sm text-muted-foreground">Updated daily</p>
                  </CardContent>
                </Card>

                {/* Underwriting Guidelines */}
                <Card className="bg-background border border-border">
                  <CardContent className="p-4">
                    <h3 className="font-medium text-foreground mb-1">Underwriting Guidelines</h3>
                    <p className="text-sm text-muted-foreground">All lender requirements</p>
                  </CardContent>
                </Card>

                {/* Forms Library */}
                <Card className="bg-background border border-border">
                  <CardContent className="p-4">
                    <h3 className="font-medium text-foreground mb-1">Forms Library</h3>
                    <p className="text-sm text-muted-foreground">Printable client forms</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )
      case "assistant":
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Mortgage Assistant</h1>
                <p className="text-muted-foreground text-base">Ask questions about mortgage products, guidelines, and lending requirements</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <ArrowClockwise className="h-4 w-4" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm">
                  Clear Chat
                </Button>
              </div>
            </div>

            {/* Chat Interface */}
            <Card className="h-[600px] flex flex-col">
              <CardContent className="p-0 flex flex-col h-full">
                {/* Chat Header */}
                <div className="p-4 border-b bg-muted/10">
                  <h3 className="text-lg font-semibold text-foreground">Chat</h3>
                </div>

                {/* Chat Messages Area */}
                <div className="flex-1 p-6 overflow-y-auto">
                  {chatMessages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full space-y-6 text-center">
                      {/* Chat Icon */}
                      <div className="p-4 bg-muted/20 rounded-full">
                        <ChatCircleDots className="h-12 w-12 text-muted-foreground" />
                      </div>
                      
                      {/* Welcome Message */}
                      <div className="space-y-3 max-w-2xl">
                        <h3 className="text-xl font-semibold text-muted-foreground">Welcome to the Mortgage Assistant!</h3>
                        <p className="text-muted-foreground">
                          Ask me about FHA, VA, USDA, conventional loans, down payment assistance programs, or any mortgage-related questions based on your company's documentation.
                        </p>
                      </div>

                      {/* Suggested Questions */}
                      <div className="space-y-3 max-w-2xl">
                        <p className="text-sm font-medium text-muted-foreground">Try asking:</p>
                        <div className="space-y-2">
                          <div className="text-sm text-primary/80 bg-primary/5 px-3 py-2 rounded-lg border border-primary/20">
                            "What FHA loan programs are available?"
                          </div>
                          <div className="text-sm text-primary/80 bg-primary/5 px-3 py-2 rounded-lg border border-primary/20">
                            "What are the VA loan requirements?"
                          </div>
                          <div className="text-sm text-primary/80 bg-primary/5 px-3 py-2 rounded-lg border border-primary/20">
                            "Tell me about down payment assistance programs"
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {chatMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.sender === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                            <div className="text-xs opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Chat Input */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Ask about mortgage products, guidelines, or requirements..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            if (chatInput.trim()) {
                              const newMessage = {
                                id: Date.now().toString(),
                                text: chatInput.trim(),
                                sender: 'user' as const,
                                timestamp: new Date()
                              }
                              setChatMessages(prev => [...prev, newMessage])
                              setChatInput("")
                              
                              // Simulate assistant response
                              setTimeout(() => {
                                const assistantMessage = {
                                  id: (Date.now() + 1).toString(),
                                  text: "Thank you for your question. I'm here to help with mortgage-related inquiries. Please note that this is a demo interface and responses would be generated based on your company's documentation.",
                                  sender: 'assistant' as const,
                                  timestamp: new Date()
                                }
                                setChatMessages(prev => [...prev, assistantMessage])
                              }, 1000)
                            }
                          }
                        }}
                        className="pr-12"
                      />
                    </div>
                    <Button 
                      size="sm" 
                      className="px-3"
                      disabled={!chatInput.trim()}
                      onClick={() => {
                        if (chatInput.trim()) {
                          const newMessage = {
                            id: Date.now().toString(),
                            text: chatInput.trim(),
                            sender: 'user' as const,
                            timestamp: new Date()
                          }
                          setChatMessages(prev => [...prev, newMessage])
                          setChatInput("")
                          
                          // Simulate assistant response
                          setTimeout(() => {
                            const assistantMessage = {
                              id: (Date.now() + 1).toString(),
                              text: "Thank you for your question. I'm here to help with mortgage-related inquiries. Please note that this is a demo interface and responses would be generated based on your company's documentation.",
                              sender: 'assistant' as const,
                              timestamp: new Date()
                            }
                            setChatMessages(prev => [...prev, assistantMessage])
                          }, 1000)
                        }
                      }}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Press Enter to send, Shift+Enter for new line
                  </div>
                </div>
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
      case "crm-integration":
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">CRM Integration</h1>
              <p className="text-muted-foreground text-base">Connect your CRM system or upload data via CSV to keep deal information synchronized</p>
            </div>

            {/* Connection Status Card */}
            <Card className="bg-muted/30">
              <CardContent className="p-6 space-y-6">
                {/* Connection Status Header */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Gear className="h-5 w-5 text-muted-foreground" />
                    <h2 className="text-lg font-semibold text-foreground">Connection Status</h2>
                  </div>
                  <p className="text-muted-foreground">Configure your CRM connection and sync settings</p>
                </div>

                {/* Not Connected Badge */}
                <div className="flex items-center gap-2">
                  <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-200 hover:bg-red-100">
                    Not Connected
                  </Badge>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* CRM System */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">CRM System</label>
                    <Select defaultValue="salesforce">
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select CRM system" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="salesforce">Salesforce</SelectItem>
                        <SelectItem value="hubspot">HubSpot</SelectItem>
                        <SelectItem value="pipedrive">Pipedrive</SelectItem>
                        <SelectItem value="zoho">Zoho CRM</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* API Key */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">API Key</label>
                    <Input 
                      type="password"
                      placeholder="Enter your API key"
                      className="bg-background"
                    />
                  </div>
                </div>

                {/* Connect Button */}
                <div className="flex justify-start">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6">
                    Connect to CRM
                  </Button>
                </div>
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
              
              {/* Deal Details Dialog */}
              <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="w-[95vw] max-w-4xl max-h-[85vh] overflow-y-auto sm:w-[90vw] md:w-[80vw] lg:max-w-4xl">
                  <DialogHeader className="pb-4 border-b">
                    <DialogTitle className="text-xl font-semibold">
                      Deal Details - {selectedDeal?.id}
                    </DialogTitle>
                    <p className="text-base text-primary font-medium mt-1">
                      {selectedDeal?.borrower}
                    </p>
                  </DialogHeader>
                  
                  {selectedDeal && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
                      {/* Left Column - Loan Information */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Loan Information</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground font-medium">Amount:</span>
                              <span className="font-semibold">{selectedDeal.loanAmount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground font-medium">Rate:</span>
                              <span className="font-semibold">{selectedDeal.rate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground font-medium">Type:</span>
                              <span className="font-semibold capitalize">{selectedDeal.loanType}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground font-medium">Lender:</span>
                              <span className="font-semibold">{selectedDeal.lender}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Documents</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedDeal.documents?.map((doc: string, index: number) => (
                              <Badge 
                                key={index} 
                                variant="outline" 
                                className="bg-muted/50 text-foreground border-border"
                              >
                                {doc}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Notes</h3>
                          <div className="space-y-2">
                            {selectedDeal.notes?.map((note: string, index: number) => (
                              <div key={index} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 shrink-0"></div>
                                <span className="text-muted-foreground">{note}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Right Column - Timeline */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Timeline</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground font-medium">Created:</span>
                              <span className="font-semibold">{selectedDeal.created}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground font-medium">Submitted:</span>
                              <span className="font-semibold">{selectedDeal.submitted}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground font-medium">Close Date:</span>
                              <span className="font-semibold">{selectedDeal.closeDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground font-medium">Last Activity:</span>
                              <span className="font-semibold">{selectedDeal.lastActivity}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>

              {/* Lender Details Modal */}
              <LenderDetailsModal 
                open={isLenderViewDialogOpen}
                onOpenChange={setIsLenderViewDialogOpen}
                lender={selectedLender}
              />
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