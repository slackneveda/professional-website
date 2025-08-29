import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Link } from "lucide-react"

interface LenderDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  lender: any
}

export function LenderDetailsModal({ open, onOpenChange, lender }: LenderDetailsModalProps) {
  const [notes, setNotes] = useState(lender?.notes || "")

  // Custom tooltip for rate history chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{`${label}`}</p>
          <p className="text-primary font-semibold">
            {`Rate: ${payload[0].value}%`}
          </p>
        </div>
      )
    }
    return null
  }

  const handleSaveNotes = () => {
    // In a real app, this would save to backend
    console.log('Saving notes for lender:', lender?.name, notes)
    // You could also update the parent component state here
  }

  if (!lender) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="text-xl font-semibold">
            {lender.name}
          </DialogTitle>
          <div className="flex items-center gap-2 mt-1">
            <Link className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary hover:underline cursor-pointer">
              {lender.website}
            </span>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
          {/* Left Column - Contact & Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-medium">Phone:</span>
                  <span className="font-semibold">{lender.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-medium">Email:</span>
                  <span className="font-semibold">{lender.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-medium">Website:</span>
                  <span className="font-semibold text-primary underline">{lender.website}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {lender.specialties?.map((specialty: string, index: number) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="bg-primary/10 text-primary border-primary/20 font-medium"
                  >
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Usage Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-medium">Times Used:</span>
                  <span className="font-semibold">{lender.timesUsed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-medium">Last Used:</span>
                  <span className="font-semibold">{lender.lastUsed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-medium">Current Base Rate:</span>
                  <span className="font-semibold">{lender.currentBaseRate}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">My Notes</h3>
              <Textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[120px] resize-none"
                placeholder="Add your notes about this lender..."
              />
              <Button 
                onClick={handleSaveNotes}
                size="sm"
                className="mt-2"
              >
                Save Notes
              </Button>
            </div>
          </div>
          
          {/* Right Column - Rate History Chart */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Rate History</h3>
              <div className="bg-muted/30 border rounded-lg p-6">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={lender.rateHistory}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 20,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis 
                        dataKey="month" 
                        className="text-xs text-muted-foreground"
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        className="text-xs text-muted-foreground"
                        axisLine={false}
                        tickLine={false}
                        domain={['dataMin - 0.1', 'dataMax + 0.1']}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Line 
                        type="monotone" 
                        dataKey="rate" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        dot={{ 
                          fill: 'hsl(var(--primary))', 
                          strokeWidth: 2, 
                          r: 6,
                          stroke: 'hsl(var(--background))'
                        }}
                        activeDot={{ 
                          r: 8, 
                          stroke: 'hsl(var(--primary))',
                          strokeWidth: 2,
                          fill: 'hsl(var(--primary))'
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}