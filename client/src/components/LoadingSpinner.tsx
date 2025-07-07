const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-secondary p-8 rounded-lg border border-gray-700 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
        <p className="text-white font-semibold">Generating your adventures...</p>
        <p className="text-gray-400 text-sm mt-2">This may take a few moments</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
