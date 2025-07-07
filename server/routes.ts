import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateItineraries } from "./services/geminiService";
import { insertStopSchema, insertItinerarySchema, insertGroundingChunkSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Generate itineraries for a location
  app.post("/api/itineraries/generate", async (req, res) => {
    try {
      const { location } = req.body;
      
      if (!location || typeof location !== "string") {
        return res.status(400).json({ error: "Location is required" });
      }

      if (!process.env.GEMINI_API_KEY && !process.env.GOOGLE_AI_API_KEY) {
        return res.status(500).json({ error: "API_KEY_MISSING" });
      }

      const result = await generateItineraries(location);
      
      // Store itineraries and stops in memory storage
      const storedItineraries = [];
      const storedSources = [];

      // Store sources
      if (result.sources && result.sources.length > 0) {
        const sourcesToStore = result.sources.map(source => ({
          title: source.title,
          url: source.url,
          snippet: source.snippet
        }));
        
        for (const source of sourcesToStore) {
          const validatedSource = insertGroundingChunkSchema.parse(source);
          const storedSource = await storage.createGroundingChunk(validatedSource);
          storedSources.push(storedSource);
        }
      }

      // Store itineraries and their stops
      for (const itinerary of result.itineraries) {
        const stopIds: number[] = [];
        
        // Store each stop
        for (const stop of itinerary.stops) {
          const validatedStop = insertStopSchema.parse(stop);
          const storedStop = await storage.createStop(validatedStop);
          stopIds.push(storedStop.id);
        }
        
        // Store itinerary with stop IDs
        const itineraryToStore = {
          title: itinerary.title,
          description: itinerary.description,
          duration_minutes: itinerary.duration_minutes,
          location: location,
          stops: stopIds
        };
        
        const validatedItinerary = insertItinerarySchema.parse(itineraryToStore);
        const storedItinerary = await storage.createItinerary(validatedItinerary);
        
        // Get the full stop data for response
        const fullStops = await storage.getStopsByIds(stopIds);
        
        storedItineraries.push({
          ...storedItinerary,
          stops: fullStops
        });
      }

      res.json({
        itineraries: storedItineraries,
        sources: storedSources
      });
      
    } catch (error) {
      console.error("Error generating itineraries:", error);
      
      if (error instanceof Error) {
        switch(error.message) {
          case 'API_KEY_MISSING':
            return res.status(500).json({ error: 'API_KEY_MISSING' });
          case 'INVALID_API_KEY':
            return res.status(500).json({ error: 'INVALID_API_KEY' });
          default:
            return res.status(500).json({ error: 'Failed to generate itineraries' });
        }
      }
      
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get itinerary by ID
  app.get("/api/itineraries/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const itinerary = await storage.getItinerary(id);
      
      if (!itinerary) {
        return res.status(404).json({ error: "Itinerary not found" });
      }

      const stops = await storage.getStopsByIds(itinerary.stops);
      
      res.json({
        ...itinerary,
        stops
      });
    } catch (error) {
      console.error("Error fetching itinerary:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
