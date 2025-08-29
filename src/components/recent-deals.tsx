import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Deal {
  id: string
  clientName: string
  amount: string
  lender: string
  status: "underwriting" | "approved" | "submitted"
}

const deals: Deal[] = [
  {
    id: "1",
    clientName: "Johnson Family",
    amount: "$425,000",
    lender: "Wells Fargo",
    status: "underwriting"
  },
  {
    id: "2", 
    clientName: "Smith Enterprise",
    amount: "$750,000",
    lender: "Chase Bank",
    status: "approved"
  },
  {
    id: "3",
    clientName: "Anderson Construction", 
    amount: "$1,200,000",
    lender: "Bank of America",
    status: "submitted"
  }
]

const getStatusVariant = (status: Deal["status"]) => {
  switch (status) {
    case "approved":
      return "default"
    case "underwriting":
      return "secondary" 
    case "submitted":
      return "destructive"
    default:
      return "secondary"
  }
}

const getStatusColor = (status: Deal["status"]) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "underwriting":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "submitted":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

export function RecentDeals() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Deals</CardTitle>
        <p className="text-sm text-muted-foreground">Latest deal updates and activities</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {deals.map((deal) => (
          <div key={deal.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
            <div className="space-y-1">
              <p className="font-medium">{deal.clientName}</p>
              <p className="text-sm text-muted-foreground">
                {deal.amount} • {deal.lender}
              </p>
            </div>
            <Badge className={getStatusColor(deal.status)}>
              {deal.status}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}