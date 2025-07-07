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
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
          Rediscover Your Neighborhood
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mt-4">
          Enter a location to instantly generate hyper-local micro-adventures.
        </p>
      </div>

      <LocationInput onSearch={handleSearch} isLoading={generateItinerariesMutation.isPending} />
      
      {error && <p className="text-center text-red-400 mt-8 text-lg">{error}</p>}
      
      {generateItinerariesMutation.isPending && <LoadingSpinner />}

      {!generateItinerariesMutation.isPending && itineraries.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-2 text-white">
            Your Spontaneous Journeys
          </h2>
          <p className="text-center text-gray-400 mb-8">Generated for: <span className="font-semibold text-accent">{location}</span></p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itineraries.map((itinerary) => (
              <ItineraryCard 
                key={itinerary.id} 
                itinerary={itinerary} 
                onSelect={handleSelectItinerary} 
              />
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
