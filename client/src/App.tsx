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
    <header className="container mx-auto px-4 py-6 flex justify-between items-center sticky top-0 z-10 glass-morphism">
      <Link href="/" className="flex items-center gap-3 text-white hover:text-accent transition-all duration-300 group">
        <div className="relative">
          <LogoIcon className="w-8 h-8 text-accent animate-float group-hover:animate-pulse-glow transition-all duration-300"/>
          <div className="absolute inset-0 bg-gradient-to-r from-accent to-blue-400 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
        </div>
        <span className="text-xl sm:text-2xl font-black tracking-tighter bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
          Local Wander
        </span>
      </Link>
      <div className="flex items-center gap-2">
        <Link href="/buddies" className="relative p-3 rounded-xl glass-morphism hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 group" aria-label="View Wander Buddies">
          <UsersIcon className="w-6 h-6 text-accent group-hover:scale-110 transition-transform duration-300"/>
        </Link>
        <Link href="/favorites" className="relative p-3 rounded-xl glass-morphism hover:bg-gradient-to-r hover:from-red-500/20 hover:to-pink-500/20 transition-all duration-300 group" aria-label={`View ${favorites.length} favorites`}>
          <HeartIcon className="w-6 h-6 text-accent group-hover:scale-110 transition-transform duration-300"/>
          {favorites.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-primary animate-pulse-glow">
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
      <footer className="mt-16 text-center py-12">
        <div className="glass-morphism rounded-2xl p-8 mx-4 border border-gray-600/30">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-r from-accent to-blue-400 rounded-full animate-pulse"></div>
            <span className="text-lg font-bold bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
              Local Wander
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            ✨ Powered by AI magic. Adventures may be unpredictable, discoveries guaranteed! 🗺️
          </p>
          <div className="flex justify-center items-center gap-4 mt-4 text-xs text-gray-500">
            <span>Built with 💚</span>
            <span>•</span>
            <span>Explore responsibly</span>
            <span>•</span>
            <span>Discover locally</span>
          </div>
        </div>
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
