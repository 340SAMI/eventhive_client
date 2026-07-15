
import Hero from '@/components/herosection/Hero';
import { EventType, getAllEvents } from '@/lib/api/listing';
import React from 'react';


export default async function HomePage() {
  const events:EventType[] = await getAllEvents(); // no filters = get everything, or slice top N

  return (
    <>
      <Hero events={events.slice(0, 6)} /> {/* cap it so marquee doesn't get insane */}
      {/* rest of your page */}
    </>
  );
}