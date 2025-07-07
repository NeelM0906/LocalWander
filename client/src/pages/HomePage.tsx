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
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Discover Local Adventures
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Generate AI-powered walking itineraries for any location and explore hidden gems in your area.
        </p>
      </div>

      <LocationInput onSearch={handleSearch} isLoading={generateItinerariesMutation.isPending} />
      
      {error && (
        <div className="mt-8 p-4 bg-destructive/20 border border-destructive/30 rounded-lg text-destructive text-sm max-w-2xl mx-auto">
          {error}
        </div>
      )}
      
      {generateItinerariesMutation.isPending && <LoadingSpinner />}

      {!generateItinerariesMutation.isPending && itineraries.length > 0 && (
        <div className="mt-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Your Local Adventures
            </h2>
            <p className="text-muted-foreground">
              Generated for <span className="text-accent font-medium">{location}</span>
            </p>
          </div>
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
