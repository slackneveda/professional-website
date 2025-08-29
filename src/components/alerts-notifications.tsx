import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle as Warning, Clock, TrendingUp as ChartLine } from "lucide-react"

interface Notification {
  id: string
  type: "warning" | "reminder" | "update"
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "warning",
    title: "Documentation Required",
    description: "Johnson Family deal needs updated income verification by Dec 10th.",
    icon: Warning
  },
  {
    id: "2",
    type: "reminder", 
    title: "Closing Reminder",
    description: "Smith Enterprise refinance closes in 3 days (Dec 8th).",
    icon: Clock
  },
  {
    id: "3",
    type: "update",
    title: "New Lender Rate",
    description: "Wells Fargo updated rates - now offering 6.125% for qualified buyers.",
    icon: ChartLine
  }
]

const getNotificationColor = (type: Notification["type"]) => {
  switch (type) {
    case "warning":
      return "text-orange-600 dark:text-orange-400"
    case "reminder":
      return "text-blue-600 dark:text-blue-400"
    case "update":
      return "text-green-600 dark:text-green-400"
    default:
      return "text-muted-foreground"
  }
}

export function AlertsNotifications() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alerts & Notifications</CardTitle>
        <p className="text-sm text-muted-foreground">Important updates requiring attention</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {notifications.map((notification) => {
          const Icon = notification.icon
          return (
            <div key={notification.id} className="flex items-start space-x-3 p-4 rounded-lg bg-muted/30">
              <Icon className={`h-5 w-5 mt-0.5 ${getNotificationColor(notification.type)}`} />
              <div className="flex-1 space-y-1">
                <p className="font-medium">{notification.title}</p>
                <p className="text-sm text-muted-foreground">{notification.description}</p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}