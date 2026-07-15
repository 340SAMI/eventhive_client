"use server";

import { revalidatePath } from "next/cache";
import type { EventFormData } from "@/components/listing/ListingForm";
import { ProtectedMutation } from "../core/Server";

type CreateListingResult =
  | { success: true; listing: Record<string, unknown> }
  | { success: false; error: string };

export async function createListing(
  data: EventFormData
): Promise<CreateListingResult> {
  try {
    const listing = await ProtectedMutation(
      "/api/listings",
      data
    );

    revalidatePath("/explore");
    return { success: true, listing };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to publish listing",
    };
  }
}