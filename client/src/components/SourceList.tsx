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
    <div className="bg-card rounded-lg border border-secondary p-6 mt-8">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <LinkIcon className="w-5 h-5 text-accent" />
        Research Sources
      </h3>
      <div className="space-y-3">
        {sources.map((source) => (
          <div key={source.id} className="p-3 bg-secondary rounded-lg border border-secondary">
            <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-sm font-medium">
              {source.title}
            </a>
            <p className="text-muted-foreground mt-1 text-sm">{source.snippet}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SourceList;
