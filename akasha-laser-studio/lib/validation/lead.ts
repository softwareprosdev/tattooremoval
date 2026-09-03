import { z } from "zod";

/**
 * Shared enums/fields for both the contact form and the consultation
 * wizard. Keeping one schema module means the API routes, the Supabase
 * row shape, and the client forms never drift apart.
 */

export const SERVICE_INTEREST = [
  "tattoo_removal",
  "pmu_correction",
  "not_sure",
] as const;

export const serviceInterestLabels: Record<
  (typeof SERVICE_INTEREST)[number],
  string
> = {
  tattoo_removal: "Tattoo Removal",
  pmu_correction: "PMU Correction",
  not_sure: "I'm Not Sure",
};

const phoneRegex = /^[\d\s()+.-]{7,20}$/;

const baseContactFields = {
  firstName: z.string().trim().min(1, "First name is required").max(80),
  lastName: z.string().trim().min(1, "Last name is required").max(80),
  email: z.string().trim().email("Enter a valid email address").max(160),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Enter a valid phone number")
    .max(30),
  preferredDate: z.string().trim().max(20).optional().or(z.literal("")),
  preferredTime: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
};

/** app/api/contact — the simpler single-step contact form. */
export const contactFormSchema = z.object({
  ...baseContactFields,
  service: z.enum(SERVICE_INTEREST),
  tattooType: z.string().trim().max(200).optional().or(z.literal("")),
  photoUrls: z.array(z.string().url()).max(6).optional().default([]),
  turnstileToken: z.string().min(1, "Verification failed. Please retry."),
  // Attribution — populated client-side from the URL, never user-entered.
  utmSource: z.string().trim().max(120).optional(),
  utmMedium: z.string().trim().max(120).optional(),
  utmCampaign: z.string().trim().max(120).optional(),
  // Honeypot: real users never populate this hidden field.
  companyWebsite: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

/** app/api/consultation — the multi-step consultation wizard. */
export const consultationSchema = z.object({
  service: z.enum(SERVICE_INTEREST),
  location: z.string().trim().max(120).optional().or(z.literal("")),
  approximateSize: z.string().trim().max(120).optional().or(z.literal("")),
  colors: z.string().trim().max(200).optional().or(z.literal("")),
  approximateAge: z.string().trim().max(120).optional().or(z.literal("")),
  previousTreatments: z.string().trim().max(500).optional().or(z.literal("")),
  desiredOutcome: z.string().trim().max(1000).optional().or(z.literal("")),
  photoUrls: z.array(z.string().url()).max(6).optional().default([]),
  ...baseContactFields,
  turnstileToken: z.string().min(1, "Verification failed. Please retry."),
  utmSource: z.string().trim().max(120).optional(),
  utmMedium: z.string().trim().max(120).optional(),
  utmCampaign: z.string().trim().max(120).optional(),
  companyWebsite: z.string().max(0).optional().or(z.literal("")),
});

export type ConsultationValues = z.infer<typeof consultationSchema>;

export const LEAD_STATUSES = [
  "NEW",
  "CONTACTED",
  "CONSULTATION_SCHEDULED",
  "CONSULTATION_COMPLETED",
  "TREATMENT_PLANNED",
  "CONVERTED",
  "LOST",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

/** Row shape persisted to Supabase — mirrors supabase/schema.sql. */
export type LeadRecord = {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  service: (typeof SERVICE_INTEREST)[number];
  location: string | null;
  tattoo_size: string | null;
  tattoo_colors: string | null;
  tattoo_age: string | null;
  previous_treatments: string | null;
  desired_outcome: string | null;
  photo_urls: string[];
  preferred_date: string | null;
  preferred_time: string | null;
  message: string | null;
  status: LeadStatus;
  source: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
};
