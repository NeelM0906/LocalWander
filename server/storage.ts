import { users, stops, itineraries, groundingChunks, type User, type InsertUser, type Stop, type InsertStop, type Itinerary, type InsertItinerary, type GroundingChunk, type InsertGroundingChunk } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getStop(id: number): Promise<Stop | undefined>;
  createStop(stop: InsertStop): Promise<Stop>;
  getStopsByIds(ids: number[]): Promise<Stop[]>;
  
  getItinerary(id: number): Promise<Itinerary | undefined>;
  createItinerary(itinerary: InsertItinerary): Promise<Itinerary>;
  
  getGroundingChunk(id: number): Promise<GroundingChunk | undefined>;
  createGroundingChunk(chunk: InsertGroundingChunk): Promise<GroundingChunk>;
  createGroundingChunks(chunks: InsertGroundingChunk[]): Promise<GroundingChunk[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private stops: Map<number, Stop>;
  private itineraries: Map<number, Itinerary>;
  private groundingChunks: Map<number, GroundingChunk>;
  private currentUserId: number;
  private currentStopId: number;
  private currentItineraryId: number;
  private currentGroundingChunkId: number;

  constructor() {
    this.users = new Map();
    this.stops = new Map();
    this.itineraries = new Map();
    this.groundingChunks = new Map();
    this.currentUserId = 1;
    this.currentStopId = 1;
    this.currentItineraryId = 1;
    this.currentGroundingChunkId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getStop(id: number): Promise<Stop | undefined> {
    return this.stops.get(id);
  }

  async createStop(insertStop: InsertStop): Promise<Stop> {
    const id = this.currentStopId++;
    const stop: Stop = { 
      ...insertStop, 
      id,
      image_url: insertStop.image_url ?? null,
      walking_time_minutes: insertStop.walking_time_minutes ?? 0
    };
    this.stops.set(id, stop);
    return stop;
  }

  async getStopsByIds(ids: number[]): Promise<Stop[]> {
    const stops: Stop[] = [];
    for (const id of ids) {
      const stop = this.stops.get(id);
      if (stop) {
        stops.push(stop);
      }
    }
    return stops;
  }

  async getItinerary(id: number): Promise<Itinerary | undefined> {
    return this.itineraries.get(id);
  }

  async createItinerary(insertItinerary: InsertItinerary): Promise<Itinerary> {
    const id = this.currentItineraryId++;
    const itinerary: Itinerary = { 
      ...insertItinerary, 
      id,
      stops: [...insertItinerary.stops]
    };
    this.itineraries.set(id, itinerary);
    return itinerary;
  }

  async getGroundingChunk(id: number): Promise<GroundingChunk | undefined> {
    return this.groundingChunks.get(id);
  }

  async createGroundingChunk(insertChunk: InsertGroundingChunk): Promise<GroundingChunk> {
    const id = this.currentGroundingChunkId++;
    const chunk: GroundingChunk = { ...insertChunk, id };
    this.groundingChunks.set(id, chunk);
    return chunk;
  }

  async createGroundingChunks(chunks: InsertGroundingChunk[]): Promise<GroundingChunk[]> {
    const results: GroundingChunk[] = [];
    for (const chunk of chunks) {
      results.push(await this.createGroundingChunk(chunk));
    }
    return results;
  }
}

export const storage = new MemStorage();
