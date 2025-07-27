import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { MarketExplorer } from "./features/MarketExplorer";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <MarketExplorer />
      </main>
    </QueryClientProvider>
  );
}

export default App;
