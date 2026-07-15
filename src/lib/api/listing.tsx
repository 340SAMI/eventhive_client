'use server'
import { protectedFetch, publicFetch } from "../core/Server";


export interface EventType {
    _id: string;
    title: string;
    category: string;
    date: string;
    time: string;
    venue: string;
    description: string;
    capacity: string;
    ticketType: "free" | "paid";
    imageUrl: string;
    ownerId: string;
    ownerName: string;
    createdAt: string;
}

interface EventFilters {
    category?: string;
    ticketType?: string;
    search?: string;
}

export const getAllEvents = async (filters: EventFilters = {}): Promise<EventType[]> => {
    const params = new URLSearchParams();

    if (filters.category) params.append("category", filters.category);
    if (filters.ticketType) params.append("ticketType", filters.ticketType);
    if (filters.search) params.append("search", filters.search);

    const query = params.toString();
    return publicFetch(`/api/listings${query ? `?${query}` : ""}`);
};


export const getEventById = async (id: string): Promise<EventType> => {
    return protectedFetch(`/api/listings/${id}`);
};


export const getMyEvents = async (): Promise<EventType[]> => {
    return protectedFetch("/api/listings/user");
};