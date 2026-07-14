import Marquee from "react-fast-marquee";

export interface EventTeaser {
  id: string;
  title: string;
  date: string;
  imageColor: string; // placeholder until real images are wired in
}

const teaserEvents: EventTeaser[] = [
  { id: "1", title: "Indie Night Live", date: "Today · 8:00 PM", imageColor: "#1B2E2C" },
  { id: "2", title: "Startup Meetup", date: "Tomorrow · 6:30 PM", imageColor: "#2E2519" },
  { id: "3", title: "Art & Craft Fair", date: "Sat · 11:00 AM", imageColor: "#1E2333" },
  { id: "4", title: "Food Truck Rally", date: "Sun · 12:00 PM", imageColor: "#2A1E2E" },
];

// duplicate the list so the CSS loop has no visible seam
const marqueeEvents: EventTeaser[] = [...teaserEvents, ...teaserEvents];

export default function Hero() {
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
        
         <a href="/events"
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

      <div className="my-8 overflow-hidden">
        <Marquee
        speed={40}
        gradient
        gradientColor="#0B0B0B" // Match your page background
        gradientWidth={80}
        pauseOnHover
        autoFill
        className=""
        >
        {teaserEvents.map((event) => (
            <div key={event.id} className="overflow-hidden" >
            <div
            
            className="mx-3 w-80 rounded-2xl border border-border bg-surface p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:overflow-hidden hover:scale-105 hover:shadow-xl hover:z-10">
            <div
                className="aspect-video rounded-lg"
                style={{ backgroundColor: event.imageColor }}
            />

            <p className="mt-4 text-base font-semibold text-primary">
                {event.title}
            </p>

            <p className="mt-1 text-sm text-muted">
                {event.date}
            </p>
            </div>
            </div>
           
        ))}
        </Marquee>
      </div>

    </section>
  );

}