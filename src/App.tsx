
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CST300 from "./pages/CST300";
import CST338 from "./pages/CST338";
import CST311 from "./pages/CST311";
import CST334 from "./pages/CST334";
import CST336 from "./pages/CST336";
import CST363 from "./pages/CST363";
import CST370 from "./pages/CST370";
import CST438 from "./pages/CST438";
import CST462S from "./pages/CST462S";
import CST489 from "./pages/CST489";
import CST499 from "./pages/CST499";
import { ThemeProvider } from "./components/ThemeProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename="/csumb-ilp">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/cst300" element={<CST300 />} />
              <Route path="/cst338" element={<CST338 />} />
              <Route path="/cst311" element={<CST311 />} />
              <Route path="/cst334" element={<CST334 />} />
              <Route path="/cst336" element={<CST336 />} />
              <Route path="/cst363" element={<CST363 />} />
              <Route path="/cst370" element={<CST370 />} />
              <Route path="/cst438" element={<CST438 />} />
              <Route path="/cst462s" element={<CST462S />} />
              <Route path="/cst489" element={<CST489 />} />
              <Route path="/cst499" element={<CST499 />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
