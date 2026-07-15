"use client";

import { EventType } from "@/lib/api/listing";

interface Props {
    event: EventType;
    sessionUserId: string | null;
}

export default function EventDetailClient({ event, sessionUserId }: Props) {
    const isOwner = sessionUserId === event.ownerId;

    return (
        <div className="min-h-screen bg-[#0A0B0F] px-6 py-8 md:px-12">
            <div className="mx-auto max-w-4xl">
                <div className="relative mb-6 h-56 w-full overflow-hidden rounded-xl md:h-64">
                    <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="h-full w-full object-cover"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-[#0F6E56] px-3 py-1 text-xs text-[#9FE1CB]">
                        {event.category}
                    </span>
                    <span className="absolute right-3 top-3 rounded-full bg-[#26215C] px-3 py-1 text-xs capitalize text-[#AFA9EC]">
                        {event.ticketType}
                    </span>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.7fr_1fr]">
                    <div>
                        <div className="mb-2 flex items-start justify-between gap-4">
                            <h1 className="text-2xl font-medium text-white">{event.title}</h1>

                            {isOwner && (
                                <button className="rounded-lg border border-red-500/30 px-3 py-1.5 text-sm text-red-400">
                                    Delete
                                </button>
                            )}
                        </div>

                        <div className="mb-5 flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0F6E56] text-xs font-medium text-[#9FE1CB]">
                                {event.ownerName?.charAt(0)}
                            </div>
                            <span className="text-sm text-gray-400">
                                Hosted by {event.ownerName}
                            </span>
                        </div>

                        <div className="mb-5 flex flex-col gap-3.5">
                            <div className="flex items-start gap-3">
                                <span className="mt-0.5 text-[#5DCAA5]">📅</span>
                                <div>
                                    <p className="text-sm text-white">{event.date}</p>
                                    <p className="text-xs text-gray-400">{event.time}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="mt-0.5 text-[#5DCAA5]">📍</span>
                                <p className="text-sm text-white">{event.venue}</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="mt-0.5 text-[#5DCAA5]">👥</span>
                                <p className="text-sm text-white">{event.capacity} spots total</p>
                            </div>
                        </div>

                        <div className="border-t border-[#23262C] pt-4">
                            <h3 className="mb-2 text-sm font-medium text-white">About this event</h3>
                            <p className="text-sm leading-relaxed text-gray-400">
                                {event.description}
                            </p>
                        </div>
                    </div>

                    <div className="sticky top-6 h-fit rounded-xl border border-[#23262C] bg-[#16181C] p-4">
                        <p className="mb-1 text-sm font-medium text-white">Reserve your spot</p>
                        <p className="mb-4 text-xs capitalize text-gray-400">{event.ticketType} entry</p>

                        <button className="mb-3 w-full rounded-lg bg-[#1DE9B6] py-2.5 text-sm font-medium text-[#04342C]">
                            Book now
                        </button>
                        <button className="w-full rounded-lg border border-[#2A2D34] py-2.5 text-sm text-gray-300">
                            Save event
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}