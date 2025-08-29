import { ThemeProvider } from "@/components/theme-provider"
import { MortgageDashboard } from "@/components/mortgage-dashboard"

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <MortgageDashboard />
    </ThemeProvider>
  )
}

export default App