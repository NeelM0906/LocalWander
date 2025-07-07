import { useState } from 'react';
import { CompassIcon } from './icons';

interface LocationInputProps {
  onSearch: (location: string) => void;
  isLoading: boolean;
}

const LocationInput = ({ onSearch, isLoading }: LocationInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [geoError, setGeoError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  const handleGeoLocate = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.');
      return;
    }
    
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onSearch(`${latitude},${longitude}`);
      },
      (error) => {
        console.error('Geolocation error:', error);
        setGeoError('Unable to retrieve your location. Please enter manually.');
      }
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a city, address, or zip code..."
            disabled={isLoading}
            className="w-full px-4 py-3 bg-card border border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all text-white placeholder-muted-foreground"
          />
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleGeoLocate}
            disabled={isLoading}
            className="p-3 bg-secondary border border-secondary rounded-lg hover:bg-muted disabled:opacity-50 transition-colors flex items-center justify-center"
            aria-label="Use my current location"
          >
            <CompassIcon className="w-5 h-5 text-accent" />
          </button>
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="px-6 py-3 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </form>
      {geoError && (
        <div className="mt-4 p-3 bg-destructive/20 border border-destructive/30 rounded-lg text-destructive text-sm">
          {geoError}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
