import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";

import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import { store } from "./store";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
      gcTime: 60 * 60 * 1000,
    },
    queries: {
      retry: false,
      staleTime: 60 * 60 * 1000,
      gcTime: 60 * 60 * 1000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <App />
            <Toaster />
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
