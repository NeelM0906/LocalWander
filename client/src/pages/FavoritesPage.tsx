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
        <div className="text-center py-16 px-6 bg-card rounded-lg border border-secondary">
          <div className="flex justify-center items-center mb-4">
            <MapPinIcon className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No favorites yet</h3>
          <p className="text-muted-foreground mb-4">
            Explore some itineraries and save your favorite stops to see them here.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/90 transition-colors">
            Start Exploring
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
