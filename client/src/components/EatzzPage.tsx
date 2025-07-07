import React, { useState, useEffect } from 'react';
import { MapPinIcon, DollarSignIcon, FilterIcon, SearchIcon, CompassIcon, UtensilsIcon } from './icons';

interface Restaurant {
  id: string;
  name: string;
  address: string;
  cuisine: string;
  priceRange: string;
  distance?: number;
  latitude?: number;
  longitude?: number;
  grade?: string;
}

interface SearchFilters {
  priceRange: string;
  cuisine: string;
  maxDistance: number;
}

const EatzzPage = () => {
  const [location, setLocation] = useState('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    priceRange: 'all',
    cuisine: 'all',
    maxDistance: 3
  });
  const [showFilters, setShowFilters] = useState(false);

  const priceRanges = [
    { value: 'all', label: 'Any Price' },
    { value: '$', label: '$ (Under $10)' },
    { value: '$$', label: '$$ ($10-20)' },
    { value: '$$$', label: '$$$ ($20-35)' }
  ];

  const cuisineTypes = [
    { value: 'all', label: 'All Cuisine' },
    { value: 'pizza', label: 'Pizza' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'italian', label: 'Italian' },
    { value: 'thai', label: 'Thai' },
    { value: 'indian', label: 'Indian' },
    { value: 'halal', label: 'Halal' },
    { value: 'deli', label: 'Deli' },
    { value: 'american', label: 'American' }
  ];

  const searchRestaurants = async () => {
    if (!location.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      // First geocode the location
      const coords = await geocodeLocation(location);
      if (!coords) {
        throw new Error('Location not found. Please try a different address or neighborhood.');
      }

      // Search restaurants near the coordinates
      const results = await searchNearbyRestaurants(coords.lat, coords.lng);
      setRestaurants(results);
      
      if (results.length === 0) {
        setError('No restaurants found in this area. Try expanding your search radius.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search restaurants');
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  const geocodeLocation = async (query: string): Promise<{lat: number, lng: number} | null> => {
    try {
      // Use a simple geocoding approach - you could enhance this with a proper geocoding service
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ', New York, NY')}&limit=1`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        };
      }
      return null;
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  };

  const searchNearbyRestaurants = async (lat: number, lng: number): Promise<Restaurant[]> => {
    try {
      const latRange = 0.02; // ~1.4 miles
      const lngRange = 0.025; // ~1.4 miles
      
      // NYC Restaurant Inspections API
      const url = new URL('https://data.cityofnewyork.us/resource/43nn-pn8j.json');
      url.searchParams.append('$limit', '50');
      url.searchParams.append('$where', 
        `latitude>${lat - latRange} AND latitude<${lat + latRange} AND longitude>${lng - lngRange} AND longitude<${lng + lngRange}`
      );

      const response = await fetch(url.toString());
      const data = await response.json();
      
      return data.map((item: any, index: number) => ({
        id: item.camis ? `${item.camis}-${index}` : `restaurant-${index}-${Date.now()}`,
        name: item.dba || item.doing_business_as_name || 'Restaurant',
        address: formatAddress(item),
        cuisine: determineCuisineType(item.cuisine_description || ''),
        priceRange: determinePriceRange(item.cuisine_description || ''),
        latitude: parseFloat(item.latitude),
        longitude: parseFloat(item.longitude),
        grade: item.grade || 'N/A',
        distance: calculateDistance(lat, lng, parseFloat(item.latitude), parseFloat(item.longitude))
      })).filter((restaurant: Restaurant) => 
        restaurant.name && restaurant.address && restaurant.distance && restaurant.distance <= filters.maxDistance
      ).sort((a: Restaurant, b: Restaurant) => (a.distance || 0) - (b.distance || 0));
    } catch (error) {
      console.error('Restaurant search error:', error);
      throw new Error('Failed to fetch restaurant data');
    }
  };

  const formatAddress = (item: any): string => {
    const parts = [
      item.building,
      item.street,
      item.boro === '1' ? 'Manhattan' :
      item.boro === '2' ? 'Bronx' :
      item.boro === '3' ? 'Brooklyn' :
      item.boro === '4' ? 'Queens' :
      item.boro === '5' ? 'Staten Island' : item.boro
    ].filter(Boolean);
    return parts.join(', ');
  };

  const determineCuisineType = (cuisine: string): string => {
    const cuisineLower = cuisine.toLowerCase();
    if (cuisineLower.includes('pizza')) return 'Pizza';
    if (cuisineLower.includes('chinese')) return 'Chinese';
    if (cuisineLower.includes('mexican')) return 'Mexican';
    if (cuisineLower.includes('italian')) return 'Italian';
    if (cuisineLower.includes('thai')) return 'Thai';
    if (cuisineLower.includes('indian')) return 'Indian';
    if (cuisineLower.includes('halal')) return 'Halal';
    if (cuisineLower.includes('deli')) return 'Deli';
    return cuisine || 'American';
  };

  const determinePriceRange = (cuisine: string): string => {
    const cuisineLower = cuisine.toLowerCase();
    if (cuisineLower.includes('pizza') || cuisineLower.includes('hot dog') || cuisineLower.includes('street')) return '$';
    if (cuisineLower.includes('deli') || cuisineLower.includes('sandwich')) return '$';
    if (cuisineLower.includes('fine') || cuisineLower.includes('steakhouse')) return '$$$';
    return '$$';
  };

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Reverse geocode to get address
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          
          const address = data.display_name?.split(',').slice(0, 3).join(', ') || 'Current Location';
          setLocation(address);
          
          // Search restaurants at current location
          const results = await searchNearbyRestaurants(latitude, longitude);
          setRestaurants(results);
          
        } catch (error) {
          setError('Failed to get current location');
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setError('Failed to get current location');
        setLoading(false);
      }
    );
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    if (filters.priceRange !== 'all' && restaurant.priceRange !== filters.priceRange) return false;
    if (filters.cuisine !== 'all' && !restaurant.cuisine.toLowerCase().includes(filters.cuisine)) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 flex items-center justify-center gap-3">
          <UtensilsIcon className="w-10 h-10 text-accent" />
          EATZZZ
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find affordable restaurants and food spots in your area using real-time data.
        </p>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-grow">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter NYC address, neighborhood, or zip code..."
              className="w-full px-4 py-3 bg-card border border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all text-white placeholder-muted-foreground"
              onKeyPress={(e) => e.key === 'Enter' && searchRestaurants()}
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={getCurrentLocation}
              disabled={loading}
              className="p-3 bg-secondary border border-secondary rounded-lg hover:bg-muted disabled:opacity-50 transition-colors flex items-center justify-center"
              aria-label="Use current location"
            >
              <CompassIcon className="w-5 h-5 text-accent" />
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-3 bg-secondary border border-secondary rounded-lg hover:bg-muted transition-colors flex items-center justify-center"
              aria-label="Toggle filters"
            >
              <FilterIcon className="w-5 h-5 text-accent" />
            </button>
            <button
              onClick={searchRestaurants}
              disabled={loading || !location.trim()}
              className="px-6 py-3 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <SearchIcon className="w-5 h-5" />
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-card p-4 rounded-lg border border-secondary">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Price Range</label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                  className="w-full px-3 py-2 bg-secondary border border-secondary rounded-lg text-white focus:ring-2 focus:ring-accent"
                >
                  {priceRanges.map(range => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Cuisine Type</label>
                <select
                  value={filters.cuisine}
                  onChange={(e) => setFilters({...filters, cuisine: e.target.value})}
                  className="w-full px-3 py-2 bg-secondary border border-secondary rounded-lg text-white focus:ring-2 focus:ring-accent"
                >
                  {cuisineTypes.map(cuisine => (
                    <option key={cuisine.value} value={cuisine.value}>{cuisine.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Max Distance</label>
                <select
                  value={filters.maxDistance}
                  onChange={(e) => setFilters({...filters, maxDistance: Number(e.target.value)})}
                  className="w-full px-3 py-2 bg-secondary border border-secondary rounded-lg text-white focus:ring-2 focus:ring-accent"
                >
                  <option value={1}>1 mile</option>
                  <option value={2}>2 miles</option>
                  <option value={3}>3 miles</option>
                  <option value={5}>5 miles</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-8 p-4 bg-destructive/20 border border-destructive/30 rounded-lg text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-secondary border-t-accent"></div>
          <span className="ml-3 text-muted-foreground">Finding delicious spots...</span>
        </div>
      )}

      {/* Results */}
      {!loading && filteredRestaurants.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              Found {filteredRestaurants.length} restaurants
            </h2>
            <div className="text-sm text-muted-foreground">
              Near {location}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="bg-card rounded-lg border border-secondary p-6 hover:border-accent transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-white text-lg leading-tight pr-2">
                    {restaurant.name}
                  </h3>
                  <div className="flex items-center gap-1 text-accent">
                    <DollarSignIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">{restaurant.priceRange}</span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPinIcon className="w-4 h-4" />
                    <span className="truncate">{restaurant.address}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-accent">{restaurant.cuisine}</span>
                    {restaurant.distance && (
                      <span className="text-muted-foreground">
                        {restaurant.distance.toFixed(1)} mi
                      </span>
                    )}
                  </div>
                </div>

                {restaurant.grade && restaurant.grade !== 'N/A' && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Health Grade:</span>
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      restaurant.grade === 'A' ? 'bg-green-500/20 text-green-400' :
                      restaurant.grade === 'B' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-orange-500/20 text-orange-400'
                    }`}>
                      {restaurant.grade}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && restaurants.length === 0 && location && (
        <div className="text-center py-16 px-6 bg-card rounded-lg border border-secondary">
          <div className="flex justify-center items-center mb-4">
            <UtensilsIcon className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No restaurants found</h3>
          <p className="text-muted-foreground mb-4">
            Try searching in a different NYC area or adjusting your filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default EatzzPage;