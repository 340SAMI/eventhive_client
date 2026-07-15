import { redirect } from "next/navigation";
import { AddListingForm } from "@/components/listing/ListingForm";
import { getUserSession } from "@/lib/core/Session";

export default async function AddPage() {
  const sessionUser = await getUserSession();

  if (!sessionUser) {
    redirect("/authentication/login");
  }

  return (
    <section className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-16">
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">
          Create an event
        </p>
        <h1 className="text-3xl font-semibold text-primary">
          Add a new listing
        </h1>
        <p className="max-w-2xl text-sm text-muted">
          Share your event details and publish it for attendees to discover.
        </p>
      </div>

      <AddListingForm />
    </section>
  );
}