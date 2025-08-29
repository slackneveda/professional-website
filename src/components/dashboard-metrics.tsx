import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, ChartLine, Star, Calendar } from "@phosphor-icons/react"

interface MetricCardProps {
  title: string
  value: string
  subtitle: string
  trend?: "up" | "down"
  icon: React.ReactNode
}

export function MetricCard({ title, value, subtitle, trend, icon }: MetricCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground truncate pr-2">
          {title}
        </CardTitle>
        <div className="text-muted-foreground shrink-0">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-xl sm:text-2xl font-bold">{value}</div>
        <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
          {trend && (
            <>
              {trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-green-500 shrink-0" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 shrink-0" />
              )}
            </>
          )}
          <span className="truncate">{subtitle}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export function DashboardMetrics() {
  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Loan Volume"
        value="$2.7M"
        subtitle="+12.5% from last month"
        trend="up"
        icon={<DollarSign className="h-4 w-4" />}
      />
      <MetricCard
        title="Active Deals"
        value="4"
        subtitle="2 pending review"
        icon={<ChartLine className="h-4 w-4" />}
      />
      <MetricCard
        title="Avg Interest Rate"
        value="6.27%"
        subtitle="Competitive market rate"
        icon={<Star className="h-4 w-4" />}
      />
      <MetricCard
        title="Deals Closed"
        value="1"
        subtitle="This month"
        icon={<Calendar className="h-4 w-4" />}
      />
    </div>
  )
}