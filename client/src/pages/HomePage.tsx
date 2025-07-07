import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Itinerary, GroundingChunk, ItineraryResponse } from '../types';
import { apiRequest } from '../lib/queryClient';
import LocationInput from '../components/LocationInput';
import ItineraryCard from '../components/ItineraryCard';
import ItineraryDetailModal from '../components/ItineraryDetailModal';
import LoadingSpinner from '../components/LoadingSpinner';
import SourceList from '../components/SourceList';

const HomePage = () => {
  const [location, setLocation] = useState<string>('');
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [sources, setSources] = useState<GroundingChunk[]>([]);
  const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateItinerariesMutation = useMutation({
    mutationFn: async (searchLocation: string): Promise<ItineraryResponse> => {
      const response = await apiRequest('POST', '/api/itineraries/generate', { location: searchLocation });
      return response.json();
    },
    onSuccess: (result) => {
      if (result.itineraries && result.itineraries.length > 0) {
        setItineraries(result.itineraries);
        setSources(result.sources || []);
        setError(null);
      } else {
        setError('Could not generate itineraries for this location. Please try a different one.');
        setItineraries([]);
        setSources([]);
      }
    },
    onError: (error: any) => {
      console.error('Error generating itineraries:', error);
      
      if (error.message?.includes('API_KEY_MISSING')) {
        setError('Configuration Error: The API key is missing. Please contact the site administrator to configure it.');
      } else if (error.message?.includes('INVALID_API_KEY')) {
        setError('Configuration Error: The provided API key is invalid. Please contact the site administrator.');
      } else {
        setError('An unexpected error occurred while fetching your adventures. Please try again.');
      }
      
      setItineraries([]);
      setSources([]);
    },
  });

  const handleSearch = useCallback(async (searchLocation: string) => {
    if (!searchLocation) {
      setError('Please provide a location.');
      return;
    }
    
    setError(null);
    setItineraries([]);
    setSources([]);
    setLocation(searchLocation);
    
    generateItinerariesMutation.mutate(searchLocation);
  }, [generateItinerariesMutation]);

  const handleSelectItinerary = (itinerary: Itinerary) => {
    setSelectedItinerary(itinerary);
  };

  const handleCloseModal = () => {
    setSelectedItinerary(null);
  };

  return (
    <>
      <div className="text-center mb-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-blue-400/10 to-purple-500/10 rounded-3xl blur-3xl"></div>
        <div className="relative z-10 py-8">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
            <span className="bg-gradient-to-r from-accent via-blue-400 to-purple-500 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
              Rediscover Your
            </span>
            <br />
            <span className="text-white">Neighborhood ✨</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Enter any location to instantly generate 
            <span className="text-accent font-semibold"> AI-powered micro-adventures</span> 
            <br />and discover hidden gems around you! 🗺️
          </p>
        </div>
      </div>

      <LocationInput onSearch={handleSearch} isLoading={generateItinerariesMutation.isPending} />
      
      {error && (
        <div className="mt-8 mx-auto max-w-2xl animate-slide-up">
          <div className="glass-morphism p-6 rounded-xl border border-red-400/30 bg-gradient-to-r from-red-500/10 to-pink-500/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                <span className="text-red-400 text-lg">⚠️</span>
              </div>
              <h3 className="font-semibold text-red-300">Adventure Discovery Failed</h3>
            </div>
            <p className="text-red-200/90 text-sm leading-relaxed">{error}</p>
          </div>
        </div>
      )}
      
      {generateItinerariesMutation.isPending && <LoadingSpinner />}

      {!generateItinerariesMutation.isPending && itineraries.length > 0 && (
        <div className="mt-16 animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-accent via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Your Spontaneous Journeys
              </span>
              <span className="text-white"> 🎒</span>
            </h2>
            <div className="flex items-center justify-center gap-2 text-gray-300">
              <span>Generated for:</span>
              <span className="px-3 py-1 bg-gradient-to-r from-accent/20 to-blue-400/20 border border-accent/30 rounded-lg font-semibold text-accent">
                📍 {location}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {itineraries.map((itinerary, index) => (
              <div key={itinerary.id} className="animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <ItineraryCard 
                  itinerary={itinerary} 
                  onSelect={handleSelectItinerary} 
                />
              </div>
            ))}
          </div>
          {sources.length > 0 && <SourceList sources={sources} />}
        </div>
      )}

      {selectedItinerary && (
        <ItineraryDetailModal 
          itinerary={selectedItinerary} 
          onClose={handleCloseModal} 
          location={location}
        />
      )}
    </>
  );
};

export default HomePage;
