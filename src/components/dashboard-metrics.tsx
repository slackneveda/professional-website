import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card"
import { TrendingUp, TrendingDown, DollarSign, TrendingUp as ChartLine, Star, Calendar } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  subtitle: string
  trend?: "up" | "down"
  icon: React.ReactNode
}

export function MetricCard({ title, value, subtitle, trend, icon }: MetricCardProps) {
  return (
    <CardContainer className="py-8">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-64 rounded-xl p-8 border">
        <CardItem
          translateZ="50"
          className="w-full"
        >
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4 p-0">
            <CardTitle className="text-base sm:text-lg font-medium text-muted-foreground pr-2 leading-tight">
              {title}
            </CardTitle>
            <div className="text-muted-foreground shrink-0 mt-1">
              {icon}
            </div>
          </CardHeader>
        </CardItem>

        <CardItem
          translateZ="80"
          className="w-full mt-8"
        >
          <CardContent className="p-0">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">{value}</div>
          </CardContent>
        </CardItem>

        <CardItem
          translateZ="60"
          className="w-full mt-6"
        >
          <div className="flex items-start space-x-2 text-sm sm:text-base text-muted-foreground">
            {trend && (
              <div className="shrink-0 mt-0.5">
                {trend === "up" ? (
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                )}
              </div>
            )}
            <span className="leading-relaxed">{subtitle}</span>
          </div>
        </CardItem>
      </CardBody>
    </CardContainer>
  )
}

export function DashboardMetrics() {
  return (
    <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        title="Total Loan Volume"
        value="$2.7M"
        subtitle="+12.5% from last month"
        trend="up"
        icon={<DollarSign className="h-6 w-6 sm:h-7 sm:w-7" />}
      />
      <MetricCard
        title="Active Deals"
        value="4"
        subtitle="2 pending review"
        icon={<ChartLine className="h-6 w-6 sm:h-7 sm:w-7" />}
      />
      <MetricCard
        title="Avg Interest Rate"
        value="6.27%"
        subtitle="Competitive market rate"
        icon={<Star className="h-6 w-6 sm:h-7 sm:w-7" />}
      />
      <MetricCard
        title="Deals Closed"
        value="1"
        subtitle="This month"
        icon={<Calendar className="h-6 w-6 sm:h-7 sm:w-7" />}
      />
    </div>
  )
}