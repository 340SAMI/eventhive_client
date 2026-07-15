// app/explore/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { EventType, getAllEvents } from "@/lib/api/listing";
import Link from "next/link";

function useDebounce(value: string, delay = 400): string {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}

const categories = ["all", "Tech", "Music", "Art", "Food", "Business"];
const ticketTypes = ["all", "free", "paid"];

export default function ExplorePage() {
    const [events, setEvents] = useState<EventType[]>([]);
    const [loading, setLoading] = useState(true);

    const [category, setCategory] = useState("all");
    const [ticketType, setTicketType] = useState("all");
    const [searchInput, setSearchInput] = useState("");

    const debouncedSearch = useDebounce(searchInput, 400);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const data = await getAllEvents({
                    category: category !== "all" ? category : undefined,
                    ticketType: ticketType !== "all" ? ticketType : undefined,
                    search: debouncedSearch || undefined,
                });
                setEvents(data);
            } catch (err) {
                console.error(err);
                setEvents([]);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [category, ticketType, debouncedSearch]);

    return (
        <div className="min-h-screen  w-[90%] mx-auto px-6 py-8 md:px-12">
            <div className="mb-8 flex flex-col  gap-4 md:flex-row md:items-center md:justify-between">
                <h1 className="text-2xl font-semibold text-white">Explore events</h1>

                <div className="flex flex-wrap gap-3">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="rounded-lg border border-[#2A2D34] bg-[#16181C] px-3 py-2 text-sm text-gray-300"
                    >
                        {categories.map((c) => (
                            <option key={c} value={c}>
                                {c === "all" ? "All categories" : c}
                            </option>
                        ))}
                    </select>

                    <select
                        value={ticketType}
                        onChange={(e) => setTicketType(e.target.value)}
                        className="rounded-lg border border-[#2A2D34] bg-[#16181C] px-3 py-2 text-sm text-gray-300"
                    >
                        {ticketTypes.map((t) => (
                            <option key={t} value={t}>
                                {t === "all" ? "All ticket types" : t}
                            </option>
                        ))}
                    </select>

                    <input
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search events"
                        className="w-48 rounded-lg border border-[#2A2D34] bg-[#16181C] px-3 py-2 text-sm text-gray-300 placeholder:text-gray-500"
                    />
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-64 animate-pulse rounded-xl border border-[#23262C] bg-[#16181C]"
                        />
                    ))}
                </div>
            ) : events.length === 0 ? (
                <p className="text-center text-gray-400">No events match your filters.</p>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {events.map((event) => (
                        <EventCard key={event._id} event={event} />
                    ))}
                </div>
            )}
        </div>
    );
}

function EventCard({ event }: { event: EventType }) {
    return (
        <div className="overflow-hidden rounded-xl border border-[#23262C] bg-[#16181C] shadow-lg">
            {/* Banner */}
            <div className="relative aspect-[2/1] w-full">
                <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-full bg-[#0F6E56] px-2 py-1 text-xs font-medium text-[#9FE1CB]">
                        {event.category}
                    </span>

                    <span className="rounded-full bg-[#26215C] px-2 py-1 text-xs font-medium capitalize text-[#AFA9EC]">
                        {event.ticketType}
                    </span>
                </div>

                <h3 className="line-clamp-2 text-lg font-semibold text-white">
                    {event.title}
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                    📅 {event.date} • {event.time}
                </p>

                <p className="mt-1 text-sm text-gray-400">
                    📍 {event.venue}
                </p>

                <p className="mt-1 text-sm text-gray-400">
                    👥 {event.capacity} Seats
                </p>

                <Link href={`/events/${event._id}`}>
                    <button className="mt-5 w-full rounded-lg bg-[#1DE9B6] py-2.5 font-medium text-[#04342C] transition hover:opacity-90">
                         View Details
                    </button>
                </Link>

            </div>
        </div>
    );
}

