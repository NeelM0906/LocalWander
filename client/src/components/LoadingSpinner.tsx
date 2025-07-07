const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card p-8 rounded-lg border border-secondary text-center max-w-sm mx-4">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-secondary border-t-accent mx-auto mb-4"></div>
        <h3 className="text-lg font-semibold text-white mb-2">
          Generating Itineraries
        </h3>
        <p className="text-muted-foreground text-sm">
          This may take a few moments while we discover the best local experiences for you.
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
