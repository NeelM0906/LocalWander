import { Search, Users, Calendar } from 'lucide-react';

const WanderBuddiesPage = () => {
  return (
    <div>
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
          Wander Buddies
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mt-4">
          Connect with fellow adventurers in your area.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {/* Find Buddies Card */}
        <div className="bg-card rounded-lg border border-gray-700 p-6 text-center hover:border-accent transition-colors">
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-accent" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Find Adventurers</h3>
          <p className="text-gray-400 mb-4">Discover like-minded explorers in your neighborhood ready for spontaneous adventures.</p>
          <button className="w-full py-2 px-4 bg-accent text-primary font-semibold rounded-md hover:bg-cyan-300 transition-colors">
            Browse Profiles
          </button>
        </div>

        {/* Create Group Card */}
        <div className="bg-card rounded-lg border border-gray-700 p-6 text-center hover:border-accent transition-colors">
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-accent" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Create Groups</h3>
          <p className="text-gray-400 mb-4">Start your own adventure group and invite others to join your micro-explorations.</p>
          <button className="w-full py-2 px-4 bg-accent text-primary font-semibold rounded-md hover:bg-cyan-300 transition-colors">
            Start Group
          </button>
        </div>

        {/* Join Events Card */}
        <div className="bg-card rounded-lg border border-gray-700 p-6 text-center hover:border-accent transition-colors">
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-accent" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Join Events</h3>
          <p className="text-gray-400 mb-4">RSVP to organized local walks, food tours, and neighborhood discovery events.</p>
          <button className="w-full py-2 px-4 bg-accent text-primary font-semibold rounded-md hover:bg-cyan-300 transition-colors">
            View Events
          </button>
        </div>
      </div>

      {/* Coming Soon Banner */}
      <div className="bg-gradient-to-r from-accent/20 to-cyan-600/20 rounded-lg border border-accent/30 p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Coming Soon!</h2>
        <p className="text-gray-300 mb-4">We're building an amazing community feature to connect local wanderers. Stay tuned for updates!</p>
        <div className="flex justify-center items-center gap-2 text-accent">
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce-gentle"></div>
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce-gentle" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce-gentle" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default WanderBuddiesPage;
