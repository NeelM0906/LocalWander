const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="glass-morphism p-8 rounded-2xl border border-accent/30 text-center max-w-sm mx-4 animate-slide-up">
        <div className="relative mb-6">
          <div className="w-16 h-16 mx-auto">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-600 border-t-accent mx-auto"></div>
            <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-2 border-accent/50"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-gradient-to-r from-accent to-blue-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2 bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
          ✨ Crafting Your Adventure
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          Our AI is discovering hidden gems and creating the perfect micro-adventure just for you...
        </p>
        <div className="flex justify-center items-center gap-1 mt-4">
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce-gentle"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce-gentle" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce-gentle" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
