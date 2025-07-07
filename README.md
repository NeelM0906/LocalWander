# Local Wander 🗺️

A hyper-local discovery app that generates AI-powered micro-adventures and itineraries for any location. Discover hidden gems, local culture, and unique experiences in your neighborhood or any destination worldwide.

![Local Wander](https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=400&fit=crop)

## ✨ Features

### 🎯 Core Functionality
- **AI-Powered Itineraries**: Generate unique walking adventures using Google Gemini AI
- **Hyper-Local Discovery**: Find hidden gems and local favorites in any location
- **Smart Planning**: 2-4 hour itineraries with 4-6 stops and walking times
- **Themed Adventures**: Different themes like food tours, cultural walks, and nature exploration

### 💖 Personal Collection
- **Favorites System**: Save interesting stops with heart icons
- **Persistent Storage**: Favorites saved locally across sessions
- **Easy Management**: Add/remove favorites with one click

### 🌐 User Experience
- **Location Input**: Enter any address, zip code, or use current location
- **Interactive Maps**: Direct links to Google Maps for each stop
- **Responsive Design**: Beautiful dark theme optimized for all devices
- **Real-time Generation**: Live itinerary creation with loading states

### 🚀 Upcoming Features
- **Address Autocomplete**: Google Maps-style address suggestions *(in development)*
- **Wander Buddies**: Connect with fellow local explorers *(coming soon)*

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** + **shadcn/ui** for styling
- **Wouter** for client-side routing
- **TanStack Query** for server state management
- **Framer Motion** for animations

### Backend
- **Express.js** with TypeScript
- **Google Gemini AI** for itinerary generation
- **In-memory storage** with database-ready interface
- **Drizzle ORM** for future PostgreSQL integration

### Development
- **Hot Module Replacement** for instant updates
- **TypeScript** for type safety
- **ESLint** + **Prettier** for code quality

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ installed
- Google Gemini API key

### 1. Clone and Install
```bash
git clone https://github.com/NeelM0906/LocalWander
cd local-wander
npm install
```

### 2. Environment Setup
Create your environment variables in Replit Secrets or `.env`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

**Getting a Gemini API Key:**
1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Click "Get API key"
4. Create a new API key
5. Copy the key (starts with `AIza...`)

### 3. Run the Application
```bash
npm run dev
```

The app will start on `http://localhost:5000` with:
- Frontend: React app with hot reload
- Backend: Express API server
- Automatic restarts on file changes

## 📖 How to Use

### Generate Itineraries
1. **Enter Location**: Type any address, city, or zip code
2. **Use Current Location**: Click the compass icon for GPS location
3. **Get Adventures**: Click "Wander" to generate 3 unique itineraries
4. **Explore Details**: Click any itinerary card to see the full route

### Save Favorites
1. **Open Itinerary**: Click on an itinerary to view details
2. **Like Stops**: Click the heart icon on any stop image
3. **View Collection**: Navigate to "Favorites" to see saved stops
4. **Manage**: Remove favorites by clicking the X button

### Navigate Easily
- **Home**: Generate new adventures
- **Favorites**: View your saved spots
- **Wander Buddies**: Preview of upcoming social features

## 🏗️ Project Structure

```
local-wander/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-based page components
│   │   ├── context/        # React Context providers
│   │   ├── types/          # TypeScript type definitions
│   │   └── lib/            # Utilities and query client
├── server/                 # Backend Express application
│   ├── services/           # External API integrations
│   ├── routes.ts           # API route definitions
│   └── storage.ts          # Data storage interface
├── shared/                 # Shared types and schemas
└── package.json            # Dependencies and scripts
```

## 🔧 Development

### Available Scripts
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run type-check # Run TypeScript checks
```

### Key Development Features
- **Hot Module Replacement**: Instant updates during development
- **TypeScript**: Full type safety across frontend and backend
- **Automatic Restarts**: Server restarts on backend changes
- **Error Overlay**: Visual error reporting in development

### Adding New Features
1. **Frontend Components**: Add to `client/src/components/`
2. **API Routes**: Extend `server/routes.ts`
3. **Data Models**: Update `shared/schema.ts`
4. **Storage**: Modify `server/storage.ts` interface

## 🎨 Customization

### Styling
- **Theme Colors**: Modify CSS variables in `client/src/index.css`
- **Components**: Customize shadcn/ui components in `client/src/components/ui/`
- **Responsive**: Tailwind CSS classes for mobile-first design

### AI Configuration
- **Prompts**: Adjust AI prompts in `server/services/geminiService.ts`
- **Response Format**: Modify JSON schema for different output structures
- **API Settings**: Configure temperature, model version, and other parameters

## 📝 API Documentation

### Generate Itineraries
```http
POST /api/itineraries/generate
Content-Type: application/json

{
  "location": "San Francisco, CA"
}
```

**Response:**
```json
{
  "itineraries": [
    {
      "id": 1,
      "title": "Hidden Gems of Mission District",
      "description": "Discover street art and local eateries",
      "duration_minutes": 180,
      "location": "San Francisco, CA",
      "stops": [
        {
          "id": 1,
          "name": "Clarion Alley Murals",
          "category": "Art",
          "description": "Famous street art alley...",
          "image_url": "https://images.unsplash.com/...",
          "walking_time_minutes": 0
        }
      ]
    }
  ],
  "sources": [
    {
      "id": 1,
      "title": "San Francisco Travel Guide",
      "url": "https://example.com",
      "snippet": "Best local spots..."
    }
  ]
}
```

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables (Production)
```env
GEMINI_API_KEY=your_production_api_key
NODE_ENV=production
PORT=5000
```

### Replit Deployment
1. Connect your repository to Replit
2. Add `GEMINI_API_KEY` to Replit Secrets
3. The app will automatically deploy and be available at your `.replit.app` domain

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make changes and test locally
4. Commit with clear messages: `git commit -m 'Add amazing feature'`
5. Push and create a Pull Request

### Code Style
- Use TypeScript for all new code
- Follow existing component patterns
- Add proper error handling
- Include loading states for async operations

## 📋 Roadmap

### Upcoming Features
- [ ] **Address Autocomplete**: Google Places API integration
- [ ] **User Accounts**: Save itineraries across devices
- [ ] **Social Features**: Share adventures with friends
- [ ] **Offline Support**: Save itineraries for offline viewing
- [ ] **Advanced Filters**: Customize by time, difficulty, interests
- [ ] **Photo Integration**: Add personal photos to saved stops

### Technical Improvements
- [ ] **PostgreSQL Integration**: Persistent database storage
- [ ] **Caching**: Redis for improved performance
- [ ] **Testing**: Comprehensive test coverage
- [ ] **PWA**: Progressive Web App capabilities
- [ ] **Analytics**: Usage tracking and insights

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Common Issues

**"API key is missing" error:**
- Ensure `GEMINI_API_KEY` is set in your environment
- Verify the key starts with `AIza...`
- Check that billing is enabled in Google Cloud Console

**Slow itinerary generation:**
- Normal processing time is 30-60 seconds
- Gemini AI requires time to research and generate quality content
- Check your internet connection

**No results for location:**
- Try a more specific address or landmark
- Use major cities or well-known areas
- Check spelling of location names

### Getting Help
- Create an issue on GitHub for bugs
- Check existing issues for solutions
- Review the API documentation above

## 🎉 Acknowledgments

- **Google Gemini AI** for intelligent itinerary generation
- **shadcn/ui** for beautiful, accessible components
- **Unsplash** for high-quality location imagery
- **OpenStreetMap** contributors for location data

---

Built with ❤️ for local explorers and adventure seekers worldwide.
