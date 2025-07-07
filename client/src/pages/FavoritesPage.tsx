import { useFavorites } from '../context/FavoritesContext';
import { Stop } from '../types';
import { MapPinIcon, XIcon } from '../components/icons';
import { Link } from 'wouter';

interface FavoriteCardProps {
  stop: Stop;
}

const FavoriteCard = ({ stop }: FavoriteCardProps) => {
  const { removeFavorite } = useFavorites();
  
  return (
    <div className="bg-card rounded-lg border border-gray-700 flex flex-col overflow-hidden group">
      <div className="w-full h-48 bg-secondary flex items-center justify-center overflow-hidden relative">
        {stop.image_url ? (
          <img src={stop.image_url} alt={stop.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            <MapPinIcon className="w-16 h-16 text-gray-600" />
          </div>
        )}
        <button 
          onClick={() => removeFavorite(stop.id)}
          className="absolute top-2 right-2 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors"
          aria-label="Remove from favorites"
        >
          <XIcon className="w-5 h-5 text-white" />
        </button>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-white">{stop.name}</h3>
        <p className="text-sm text-accent font-semibold">{stop.category}</p>
        <p className="text-gray-400 mt-2 text-sm flex-grow">{stop.description}</p>
      </div>
    </div>
  );
};

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div>
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
          My Saved Adventures
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mt-4">
          Your collection of hand-picked spots to visit.
        </p>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map(stop => (
            <FavoriteCard key={stop.id} stop={stop} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 px-8 glass-morphism rounded-2xl border border-gray-600/50">
          <div className="flex justify-center items-center mb-6">
            <div className="relative">
              <MapPinIcon className="w-16 h-16 text-gray-500 animate-float" />
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-blue-400/20 rounded-full blur-lg"></div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">No adventures saved yet</h3>
          <p className="text-gray-400 mb-6 leading-relaxed">
            Start exploring and save your favorite spots to build your personal collection of amazing places!
          </p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-blue-400 text-primary font-bold rounded-xl hover:from-accent/90 hover:to-blue-400/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            🗺️ Start Exploring
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
