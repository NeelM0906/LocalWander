import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FavoritesProvider, useFavorites } from "./context/FavoritesContext";
import { LogoIcon, HeartIcon, UsersIcon } from "./components/icons";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import WanderBuddiesPage from "./components/WanderBuddiesPage";
import NotFound from "@/pages/not-found";
import { Link, useLocation } from "wouter";

function AppHeader() {
  const { favorites } = useFavorites();
  const [location] = useLocation();

  return (
    <header className="container mx-auto px-4 py-6 flex justify-between items-center sticky top-0 z-10 bg-primary/80 backdrop-blur-sm">
      <Link href="/" className="flex items-center gap-3 text-white hover:text-accent transition-colors">
        <LogoIcon className="w-8 h-8 text-accent"/>
        <span className="text-xl sm:text-2xl font-bold tracking-tight">Local Wander</span>
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/buddies" className="p-2 text-muted-foreground hover:text-accent transition-colors" aria-label="View Wander Buddies">
          <UsersIcon className="w-6 h-6"/>
        </Link>
        <Link href="/favorites" className="relative p-2 text-muted-foreground hover:text-accent transition-colors" aria-label={`View ${favorites.length} favorites`}>
          <HeartIcon className="w-6 h-6"/>
          {favorites.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {favorites.length}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/favorites" component={FavoritesPage} />
      <Route path="/buddies" component={WanderBuddiesPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen font-sans">
      <AppHeader />
      <main className="container mx-auto px-4 pb-8 md:pb-12">
        <Router />
      </main>
      <footer className="text-center py-6 text-muted-foreground text-sm">
        <p>Powered by AI. Adventures may be unpredictable.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <FavoritesProvider>
          <AppContent />
        </FavoritesProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
