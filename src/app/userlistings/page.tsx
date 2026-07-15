"use client";

import { EventType, getMyEvents } from "@/lib/api/listing";
import { useEffect, useState } from "react";


export default function MyListingsPage() {
    const [events, setEvents] = useState<EventType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyEvents = async () => {
            try {
                const data = await getMyEvents();
                setEvents(data);
            } catch (err) {
                console.error(err);
                setEvents([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMyEvents();
    }, []);

    return (
        <div className="min-h-screen bg-[#0A0B0F] px-6 py-8 md:px-12">
            <h1 className="mb-6 text-2xl font-semibold text-white">My listings</h1>

            {loading ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-64 animate-pulse rounded-xl border border-[#23262C] bg-[#16181C]"
                        />
                    ))}
                </div>
            ) : events.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <p className="mb-4 text-gray-400">You haven&apos;t created any events yet.</p>
                    
                     <a   href="/addlistings"
                        className="rounded-lg bg-[#1DE9B6] px-4 py-2 text-sm font-medium text-[#04342C]"
                    >
                        Create your first event
                    </a>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {events.map((event) => (
                        <MyEventCard key={event._id} event={event} />
                    ))}
                </div>
            )}
        </div>
    );
}

function MyEventCard({ event }: { event: EventType }) {
    return (
        <div className="overflow-hidden rounded-xl border border-[#23262C] bg-[#16181C]">
            <div className="h-32 w-full overflow-hidden">
                <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                    <span className="rounded-full bg-[#0F6E56] px-2 py-0.5 text-xs text-[#9FE1CB]">
                        {event.category}
                    </span>
                    <span className="rounded-full bg-[#26215C] px-2 py-0.5 text-xs capitalize text-[#AFA9EC]">
                        {event.ticketType}
                    </span>
                </div>

                <h3 className="mb-1 font-medium text-white">{event.title}</h3>
                <p className="mb-3 text-xs text-gray-400">
                    {event.date} &middot; {event.venue}
                </p>

                <div className="flex gap-2">
                    
                    <a   href={`/events/${event._id}`}
                        className="flex-1 rounded-lg border border-[#2A2D34] py-2 text-center text-xs text-gray-300"
                    >
                        View
                    </a>
                    <button className="flex-1 rounded-lg border border-red-500/30 py-2 text-xs text-red-400">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}