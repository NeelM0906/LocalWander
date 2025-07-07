import { Itinerary } from '../types';
import { ClockIcon, MapPinIcon, LogoIcon } from './icons';

interface ItineraryCardProps {
  itinerary: Itinerary;
  onSelect: (itinerary: Itinerary) => void;
}

const ItineraryCard = ({ itinerary, onSelect }: ItineraryCardProps) => {
  const totalStops = itinerary.stops.length;
  const imageUrl = itinerary.stops?.[0]?.image_url;

  return (
    <div 
      className="bg-gradient-to-br from-card to-card/80 rounded-2xl border border-gray-600/50 hover:border-accent/60 transition-all duration-500 cursor-pointer transform hover:-translate-y-2 hover:scale-105 group flex flex-col overflow-hidden backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-accent/10"
      onClick={() => onSelect(itinerary)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${itinerary.title}`}
      onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(itinerary)}
    >
      <div className="w-full h-48 bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center overflow-hidden relative">
        {imageUrl ? (
          <img src={imageUrl} alt={itinerary.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <LogoIcon className="w-16 h-16 text-gray-600 animate-float" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white tracking-tight mb-3 group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-blue-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
          {itinerary.title}
        </h3>
        <p className="text-gray-400 mb-6 text-sm flex-grow leading-relaxed">{itinerary.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-300 border-t border-gray-600/50 pt-4 mt-auto">
          <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-accent/10 to-blue-400/10 rounded-lg border border-accent/20">
            <ClockIcon className="w-4 h-4 text-accent" />
            <span className="font-medium">~{Math.round(itinerary.duration_minutes / 60 * 10) / 10}h</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-400/20">
            <MapPinIcon className="w-4 h-4 text-purple-400" />
            <span className="font-medium">{totalStops} stops</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryCard;
