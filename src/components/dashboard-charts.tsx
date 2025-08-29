import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const loanVolumeData = [
  { month: "Sep", volume: 1000000 },
  { month: "Oct", volume: 800000 },
  { month: "Nov", volume: 2900000 },
  { month: "Dec", volume: 2600000 },
]

const dealStatusData = [
  { name: "Closed", value: 24 },
  { name: "Approved", value: 18 },
  { name: "Submitted", value: 32 },
  { name: "Under Review", value: 15 },
  { name: "Pending", value: 12 },
]

export function DashboardCharts() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Loan Volume Trend</CardTitle>
          <p className="text-sm text-muted-foreground">Monthly loan origination volume</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={loanVolumeData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="month" 
                className="text-xs fill-muted-foreground"
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                className="text-xs fill-muted-foreground"
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value/1000000}M`}
              />
              <Bar dataKey="volume" className="fill-primary" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Deal Status Distribution</CardTitle>
          <p className="text-sm text-muted-foreground">Current pipeline status</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dealStatusData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="name"
                className="text-xs fill-muted-foreground"
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                className="text-xs fill-muted-foreground"
                axisLine={false}
                tickLine={false}
              />
              <Bar dataKey="value" className="fill-accent" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}