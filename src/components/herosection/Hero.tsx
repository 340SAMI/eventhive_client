import { EventType } from "@/lib/api/listing";
import Marquee from "react-fast-marquee";
import { EventCard } from "./EventCard";
 // adjust to your actual path

// fallback palette — used when an event has no image yet
const fallbackColors = ["#1B2E2C", "#2E2519", "#1E2333", "#2A1E2E"];

interface HeroProps {
  events: EventType[];
}

export default function Hero({ events }: HeroProps) {
  // guard: no events yet? just don't render the marquee section
  const hasEvents = events.length > 0;


  return (
    <section className="overflow-hidden px-4 py-16">
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-3 text-sm font-medium tracking-wide text-accent">
          TONIGHT · DHAKA
        </p>
        <h1 className="mb-5 text-4xl font-semibold leading-tight text-primary md:text-5xl">
          Find what&apos;s happening near you.
        </h1>
        <p className="mx-auto mb-6 max-w-md text-[15px] leading-relaxed text-muted">
          Discover concerts, workshops, and meetups happening around you, and book a spot in seconds.
        </p>

        
        <a  href="/events"
          className="inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-page transition-colors hover:bg-accent-hover"
        >
          Explore events →
        </a>
      </div>

      <div className="flex items-center gap-3 mx-auto max-w-8xl py-6 px-6 lg:px-8">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#3FE8D6]/25" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#3FE8D6]" />
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#3FE8D6]/25" />
      </div>

      {hasEvents && (
        <div className="my-8 overflow-hidden">
          <Marquee
            speed={40}
            gradient
            gradientColor="#0B0B0B"
            gradientWidth={80}
            pauseOnHover
            autoFill
          >
            {events.map((event, i) => (
              <div key={event._id} className="overflow-hidden">
                <EventCard
                  event={event}
                  fallbackColor={fallbackColors[i % fallbackColors.length]}
                  id={event._id}
                />
              </div>
            ))}
          </Marquee>
        </div>
      )}
    </section>
  );
}