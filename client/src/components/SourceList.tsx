import { GroundingChunk } from '../types';
import { LinkIcon } from './icons';

interface SourceListProps {
  sources: GroundingChunk[];
}

const SourceList = ({ sources }: SourceListProps) => {
  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <div className="glass-morphism rounded-2xl border border-gray-600/50 p-8 mt-12 animate-slide-up">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
        <div className="p-2 bg-gradient-to-r from-accent/20 to-blue-400/20 rounded-lg border border-accent/30">
          <LinkIcon className="w-5 h-5 text-accent" />
        </div>
        <span className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
          Research Sources
        </span>
      </h3>
      <p className="text-gray-400 mb-6 text-sm">
        These itineraries were generated using information from the following trusted sources:
      </p>
      <div className="space-y-4">
        {sources.map((source, index) => (
          <div key={source.id} className="p-4 bg-gradient-to-r from-card/50 to-card/30 rounded-xl border border-gray-600/30 hover:border-accent/30 transition-all duration-300 group" style={{animationDelay: `${index * 0.1}s`}}>
            <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-blue-400 font-medium transition-colors group-hover:underline text-sm">
              {source.title}
            </a>
            <p className="text-gray-400 mt-2 text-sm leading-relaxed">{source.snippet}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SourceList;
