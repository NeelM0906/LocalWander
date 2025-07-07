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
        <span className="text-xl sm:text-2xl font-black tracking-tighter">Local Wander</span>
      </Link>
      <div className="flex items-center gap-2">
        <Link href="/buddies" className="relative p-2 rounded-full hover:bg-card transition-colors" aria-label="View Wander Buddies">
          <UsersIcon className="w-7 h-7 text-accent"/>
        </Link>
        <Link href="/favorites" className="relative p-2 rounded-full hover:bg-card transition-colors" aria-label={`View ${favorites.length} favorites`}>
          <HeartIcon className="w-7 h-7 text-accent"/>
          {favorites.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-primary">
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
      <footer className="text-center py-6 text-gray-500 text-sm">
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
