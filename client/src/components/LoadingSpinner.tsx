const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card p-8 rounded-lg border border-secondary text-center max-w-sm mx-4">
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Face outline */}
            <div className="w-20 h-20 rounded-full border-2 border-secondary bg-card relative overflow-hidden">
              {/* Eyes container */}
              <div className="absolute top-5 left-0 right-0 flex justify-center gap-3">
                {/* Left Eye */}
                <div className="relative">
                  <div className="w-4 h-4 bg-secondary rounded-full animate-blink"></div>
                  <div className="absolute top-1 left-1 w-2 h-2 bg-accent rounded-full animate-wander-eyes"></div>
                </div>
                {/* Right Eye */}
                <div className="relative">
                  <div className="w-4 h-4 bg-secondary rounded-full animate-blink"></div>
                  <div className="absolute top-1 left-1 w-2 h-2 bg-accent rounded-full animate-wander-eyes" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
              {/* Mouth */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-3 h-1.5 border-b-2 border-secondary rounded-full"></div>
            </div>
            {/* Subtle glow effect */}
            <div className="absolute inset-0 w-20 h-20 rounded-full bg-accent/10 animate-pulse"></div>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          Looking for adventures...
        </h3>
        <p className="text-muted-foreground text-sm">
          Our AI is wandering around to discover the best local experiences for you.
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
