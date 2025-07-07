import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY || "" 
});

export interface GeneratedStop {
  name: string;
  category: string;
  description: string;
  image_url?: string;
  walking_time_minutes: number;
}

export interface GeneratedItinerary {
  title: string;
  description: string;
  duration_minutes: number;
  stops: GeneratedStop[];
}

export interface GroundingSource {
  title: string;
  url: string;
  snippet: string;
}

export interface ItineraryResponse {
  itineraries: GeneratedItinerary[];
  sources: GroundingSource[];
}

export async function generateItineraries(location: string): Promise<ItineraryResponse> {
  try {
    const systemPrompt = `You are a local travel expert who creates unique, hyper-local micro-adventures and itineraries. 
    Create 3 different themed walking itineraries for the given location that focus on hidden gems, local culture, and unique experiences.
    Each itinerary should be 2-4 hours long and include 4-6 stops with walking times between them.
    
    Respond with JSON in this exact format:
    {
      "itineraries": [
        {
          "title": "String - Creative, engaging title",
          "description": "String - Brief description of the adventure theme",
          "duration_minutes": number,
          "stops": [
            {
              "name": "String - Name of the place/stop",
              "category": "String - Type (Restaurant, Park, Museum, Shop, etc.)",
              "description": "String - Detailed description of what makes this place special",
              "image_url": "String - High-quality Unsplash URL related to the place",
              "walking_time_minutes": number
            }
          ]
        }
      ],
      "sources": [
        {
          "title": "String - Source title",
          "url": "String - Placeholder URL",
          "snippet": "String - Brief description of the source"
        }
      ]
    }`;

    const userPrompt = `Create 3 unique micro-adventure itineraries for: ${location}
    
    Focus on:
    - Hidden gems and local favorites
    - Unique cultural experiences
    - Walkable routes with interesting stops
    - Real places that exist in this location
    - Diverse themes (food, culture, nature, architecture, etc.)
    
    For image_url, use Unsplash URLs in this format: https://images.unsplash.com/photo-[photo-id]?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600
    Choose photos that best represent each stop.
    
    Include 2-3 credible sources that would help plan these adventures.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            itineraries: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  duration_minutes: { type: "number" },
                  stops: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        category: { type: "string" },
                        description: { type: "string" },
                        image_url: { type: "string" },
                        walking_time_minutes: { type: "number" }
                      },
                      required: ["name", "category", "description", "walking_time_minutes"]
                    }
                  }
                },
                required: ["title", "description", "duration_minutes", "stops"]
              }
            },
            sources: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  url: { type: "string" },
                  snippet: { type: "string" }
                },
                required: ["title", "url", "snippet"]
              }
            }
          },
          required: ["itineraries", "sources"]
        },
      },
      contents: userPrompt,
    });

    const rawJson = response.text;
    if (!rawJson) {
      throw new Error("Empty response from Gemini API");
    }

    const data = JSON.parse(rawJson) as ItineraryResponse;
    
    // Validate response structure
    if (!data.itineraries || !Array.isArray(data.itineraries) || data.itineraries.length === 0) {
      throw new Error("Invalid response structure from Gemini API");
    }

    return data;
  } catch (error) {
    console.error("Gemini API Error:", error);
    
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        throw new Error("INVALID_API_KEY");
      }
    }
    
    throw new Error("Failed to generate itineraries");
  }
}
