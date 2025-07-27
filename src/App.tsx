import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { MarketExplorer } from "./features/MarketExplorer";
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <main>
          <MarketExplorer />
        </main>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
