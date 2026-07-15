"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Check, Picture } from "@gravity-ui/icons";
import { createListing } from "@/lib/action/Listing";

export interface EventFormData {
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  capacity: string;
  ticketType: "free" | "paid";
  price?: string;
  imageUrl: string;
}

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

async function uploadToImgbb(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
    { method: "POST", body: formData }
  );

  if (!res.ok) throw new Error("Image upload failed");

  const data = await res.json();
  return data.data.url as string;
}

export function AddListingForm() {
  const router = useRouter();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [ticketType, setTicketType] = useState<"free" | "paid">("free");
  const [submitting, setSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("Please upload an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image must be under 5MB");
      return;
    }

    setImageError(null);
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imageFile) {
      setImageError("Cover image is required");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    setSubmitting(true);

    try {
      const imageUrl = await uploadToImgbb(imageFile);

      const result = await createListing({
        title: data.title,
        category: data.category,
        date: data.date,
        time: data.time,
        venue: data.venue,
        description: data.description,
        capacity: data.capacity,
        ticketType,
        price: ticketType === "paid" ? data.price : undefined,
        imageUrl,
      });

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Listing published!");
      router.push("/explore");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="w-full rounded-4xl border border-border/80 bg-surface/90 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur md:p-8"
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">
              Cover image
            </p>
            <label
              htmlFor="cover-image"
              className="group flex min-h-70 cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border bg-page/70 p-5 text-center transition hover:border-accent hover:bg-surface"
            >
              {imagePreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imagePreview}
                  alt="Cover preview"
                  className="h-full w-full rounded-[1.25rem] object-cover"
                />
              ) : (
                <>
                  <div className="rounded-full border border-border bg-surface p-3 text-accent">
                    <Picture />
                  </div>
                  <span className="text-sm text-muted">
                    Drop your event image here or click to upload
                  </span>
                </>
              )}
            </label>
            <input
              id="cover-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {imageError && <p className="text-sm text-red-400">{imageError}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-primary">Event title</label>
              <input
                name="title"
                required
                placeholder="Sunset jazz night"
                className="h-11 rounded-xl border border-border bg-page/70 px-4 text-sm text-primary outline-none transition focus:border-accent"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-primary">Category</label>
              <input
                name="category"
                required
                placeholder="Music"
                className="h-11 rounded-xl border border-border bg-page/70 px-4 text-sm text-primary outline-none transition focus:border-accent"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-primary">Capacity</label>
              <input
                name="capacity"
                type="number"
                min="1"
                required
                placeholder="120"
                className="h-11 rounded-xl border border-border bg-page/70 px-4 text-sm text-primary outline-none transition focus:border-accent"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-primary">Venue</label>
              <input
                name="venue"
                required
                placeholder="Rooftop, Gulshan 2"
                className="h-11 rounded-xl border border-border bg-page/70 px-4 text-sm text-primary outline-none transition focus:border-accent"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-primary">Date</label>
              <input
                name="date"
                type="date"
                required
                className="h-11 rounded-xl border border-border bg-page/70 px-4 text-sm text-primary outline-none transition focus:border-accent"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-primary">Time</label>
              <input
                name="time"
                type="time"
                required
                className="h-11 rounded-xl border border-border bg-page/70 px-4 text-sm text-primary outline-none transition focus:border-accent"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-primary">Description</label>
            <textarea
              name="description"
              rows={4}
              minLength={20}
              required
              placeholder="What should attendees expect?"
              className="rounded-xl border border-border bg-page/70 px-4 py-3 text-sm text-primary outline-none transition focus:border-accent"
            />
            <span className="text-xs text-muted">Minimum 20 characters</span>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-page/50 p-4 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-primary">Ticket</label>
              <select
                name="ticketType"
                value={ticketType}
                onChange={(e) => setTicketType(e.target.value as "free" | "paid")}
                className="h-11 rounded-xl border border-border bg-page/70 px-4 text-sm text-primary outline-none transition focus:border-accent"
              >
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            {ticketType === "paid" && (
              <div className="flex flex-1 flex-col gap-2 md:max-w-55">
                <label className="text-sm font-medium text-primary">Price (BDT)</label>
                <input
                  name="price"
                  type="number"
                  min="1"
                  required
                  placeholder="500"
                  className="h-11 rounded-xl border border-border bg-page/70 px-4 text-sm text-primary outline-none transition focus:border-accent"
                />
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-page transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Check />
              {submitting ? "Publishing..." : "Publish listing"}
            </button>
            <button
              type="reset"
              disabled={submitting}
              className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-muted transition hover:border-accent hover:text-primary disabled:cursor-not-allowed disabled:opacity-70"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}