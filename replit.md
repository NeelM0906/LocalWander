# Local Wander - Travel Itinerary Generator

## Overview

Local Wander is a full-stack web application that generates personalized travel itineraries using AI. Users can enter a location and receive curated walking adventures featuring local attractions, hidden gems, and cultural experiences. The app includes features for saving favorite locations and a placeholder for connecting with fellow travelers.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: React Context API for favorites, TanStack Query for server state
- **Build Tool**: Vite with hot module replacement

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Storage**: In-memory storage implementation (MemStorage) with interface for easy database migration
- **API Integration**: Google Gemini AI for itinerary generation
- **Session Management**: Prepared for PostgreSQL sessions with connect-pg-simple

### Database Design
- **ORM**: Drizzle with PostgreSQL dialect
- **Schema**: Defined in shared/schema.ts with tables for users, stops, itineraries, and grounding chunks
- **Current Implementation**: In-memory storage that mirrors the database schema

## Key Components

### Core Data Models
- **Stops**: Individual locations with name, category, description, image, and walking time
- **Itineraries**: Collections of stops with title, description, duration, and location
- **Grounding Chunks**: Source references from AI-generated content
- **Users**: Basic user management structure (prepared but not implemented)

### AI Integration
- **Service**: Google Gemini AI via @google/genai package
- **Functionality**: Generates themed walking itineraries with 2-4 hour durations
- **Output**: Structured JSON with itineraries, stops, and source references

### Frontend Features
- **Location Input**: Text input with geolocation support (address autocomplete in development)
- **Itinerary Display**: Card-based layout with detailed modal views
- **Favorites System**: Local storage-based favorites with heart icons
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Navigation**: Three-page navigation (Home, Favorites, Wander Buddies)
- **Interactive Modals**: Detailed itinerary views with Google Maps integration

## Data Flow

1. **User Input**: Location entered via LocationInput component
2. **API Request**: POST to /api/itineraries/generate with location data
3. **AI Processing**: Gemini AI generates structured itinerary data
4. **Data Storage**: Itineraries and stops stored in memory (prepared for database)
5. **Response**: Structured data returned to frontend
6. **UI Update**: Itinerary cards displayed with modal interaction capability
7. **Favorites**: Client-side storage in localStorage with context management

## External Dependencies

### Production Dependencies
- **AI Service**: Google Gemini AI API (requires GEMINI_API_KEY or GOOGLE_AI_API_KEY)
- **Database**: Neon PostgreSQL (configured but using memory storage)
- **UI Components**: Radix UI primitives via shadcn/ui
- **Icons**: Lucide React for consistent iconography

### Development Tools
- **Build**: Vite with React plugin and error overlay
- **Database Tools**: Drizzle Kit for schema management
- **Development**: tsx for TypeScript execution
- **Deployment**: esbuild for production bundling

## Deployment Strategy

### Development
- **Command**: `npm run dev` starts both frontend and backend
- **Hot Reload**: Vite HMR for frontend, tsx watch mode for backend
- **Database**: Memory storage for rapid development iteration

### Production Build
- **Frontend**: Vite builds optimized React bundle to dist/public
- **Backend**: esbuild creates Node.js bundle in dist/
- **Deployment**: Single dist/ directory contains both frontend and backend assets

### Environment Configuration
- **Required**: GEMINI_API_KEY or GOOGLE_AI_API_KEY for AI functionality
- **Optional**: DATABASE_URL for PostgreSQL (falls back to memory storage)
- **Development**: Automatic Replit integration with cartographer plugin

## Changelog
- July 07, 2025: Initial setup
- July 07, 2025: Built complete hyper-local discovery app with AI-powered itinerary generation
- July 07, 2025: Added favorites system with localStorage persistence
- July 07, 2025: Fixed TypeScript errors in storage layer
- July 07, 2025: Marked address autocomplete as "in development" feature

## User Preferences

Preferred communication style: Simple, everyday language.