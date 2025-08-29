import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const loanVolumeData = [
  { month: "Jan", volume: 180000 },
  { month: "Feb", volume: 240000 },
  { month: "Mar", volume: 280000 },
  { month: "Apr", volume: 320000 },
  { month: "May", volume: 290000 },
  { month: "Jun", volume: 350000 },
]

const dealStatusData = [
  { name: "Approved", value: 35, color: "#22c55e" },
  { name: "Pending", value: 25, color: "#f59e0b" },
  { name: "Review", value: 20, color: "#3b82f6" },
  { name: "Rejected", value: 10, color: "#ef4444" },
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
                tickFormatter={(value) => `$${value/1000}K`}
              />
              <Bar dataKey="volume" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
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
            <PieChart>
              <Pie
                data={dealStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {dealStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {dealStatusData.map((item) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-muted-foreground">
                  {item.name}: {item.value}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}