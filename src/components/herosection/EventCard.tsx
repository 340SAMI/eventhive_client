"use client";

import { EventType } from "@/lib/api/listing";
import Link from "next/link";
import { useState } from "react";

interface EventCardProps {
  event: EventType;
  fallbackColor: string;
  id:string
}

export function EventCard({ event, fallbackColor, id}: EventCardProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = event.imageUrl && !imgFailed;

  return (
    <Link href={`/events/${id}`}>
    
        <div className="mx-3 w-80 rounded-2xl border border-border bg-surface p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:overflow-hidden hover:scale-105 hover:shadow-xl hover:z-10">
      {showImage ? (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="aspect-video w-full rounded-lg object-cover"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <div
          className="aspect-video rounded-lg"
          style={{ backgroundColor: fallbackColor }}
        />
      )}

      <p className="mt-4 text-base font-semibold text-primary">
        {event.title}
      </p>

      <p className="mt-1 text-sm text-muted">
        {event.date}
      </p>
    </div>
    
    </Link>

  );
}