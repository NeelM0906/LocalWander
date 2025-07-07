export interface Stop {
  id: number;
  name: string;
  category: string;
  description: string;
  image_url?: string;
  walking_time_minutes: number;
}

export interface Itinerary {
  id: number;
  title: string;
  description: string;
  duration_minutes: number;
  location: string;
  stops: Stop[];
}

export interface GroundingChunk {
  id: number;
  title: string;
  url: string;
  snippet: string;
}

export interface ItineraryResponse {
  itineraries: Itinerary[];
  sources: GroundingChunk[];
}
