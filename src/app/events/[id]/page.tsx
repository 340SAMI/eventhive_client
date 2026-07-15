// app/explore/[id]/page.tsx  (server component)

import { notFound } from "next/navigation";

import { EventType, getEventById } from "@/lib/api/listing";
import { getUserSession } from "@/lib/core/Session";
import EventDetailClient from "@/components/listing/EventDetail";

interface PageProps {
    params: { id: string };
}

export default async function EventDetailPage({ params }: PageProps) {
    let event: EventType;
   const {id}= await params
 console.log("click",id)
    try { 
       
        event = await getEventById(id);
       
    } catch (err) {
        console.error(err);
        return notFound();
    }

    if (!event) {
        return notFound();
    }

    const session = await getUserSession();

    return (
        <EventDetailClient
            event={event}
            sessionUserId={session?.id ?? null}
        />
    );
}