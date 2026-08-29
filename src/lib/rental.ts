export type PickupSlotId = "morning" | "afternoon";

export type PickupSlot = {
  id: PickupSlotId;
  label: string;
};

export const pickupSlots: PickupSlot[] = [
  { id: "morning", label: "8:30 AM – 12:30 PM" },
  { id: "afternoon", label: "2:00 PM – 6:00 PM" },
];

export function getPickupSlot(id: string): PickupSlot | undefined {
  return pickupSlots.find((s) => s.id === id);
}

export type RentalDurationId = "4h" | "10h";

export type RentalDurationOption = {
  id: RentalDurationId;
  label: string;
  priceMYR: number;
  /**
   * The 10-hour option is the full day (8:30 AM – 6:00 PM), so it can only
   * start at the morning pickup slot — there's no separate slot choice for
   * it. 4 hours can start at either slot.
   */
  requiresPickupSlot: PickupSlotId | null;
};

export const rentalDurationOptions: RentalDurationOption[] = [
  { id: "4h", label: "4 hours", priceMYR: 80, requiresPickupSlot: null },
  {
    id: "10h",
    label: "10 hours (8:30 AM – 6:00 PM)",
    priceMYR: 150,
    requiresPickupSlot: "morning",
  },
];

export function getRentalDuration(id: string): RentalDurationOption | undefined {
  return rentalDurationOptions.find((d) => d.id === id);
}

export type DropoffMethodId = "self" | "delivery";

export type DropoffMethodOption = {
  id: DropoffMethodId;
  label: string;
  description: string;
};

export const dropoffMethodOptions: DropoffMethodOption[] = [
  {
    id: "self",
    label: "Self Drop-off",
    description: "Bring the costume back to our Petaling Street studio yourself.",
  },
  {
    id: "delivery",
    label: "Delivery",
    description: "We arrange a courier to collect it from where you're staying.",
  },
];

export function getDropoffMethod(id: string): DropoffMethodOption | undefined {
  return dropoffMethodOptions.find((d) => d.id === id);
}
