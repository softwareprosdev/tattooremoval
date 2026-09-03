import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation/lead";
import { handleLeadSubmission } from "@/lib/api/handleLeadSubmission";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid form submission." },
      { status: 400 }
    );
  }

  const rawPayload = formData.get("payload");
  if (typeof rawPayload !== "string") {
    return NextResponse.json(
      { ok: false, error: "Missing form payload." },
      { status: 400 }
    );
  }

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(rawPayload);
  } catch {
    return NextResponse.json(
      { ok: false, error: "Malformed form payload." },
      { status: 400 }
    );
  }

  const parsed = contactFormSchema.safeParse(parsedJson);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the form for errors.", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  if (parsed.data.companyWebsite) {
    return NextResponse.json({ ok: true, leadId: undefined, persisted: false });
  }

  const photos = formData.getAll("photos").filter((f): f is File => f instanceof File);
  const v = parsed.data;

  return handleLeadSubmission({
    request,
    turnstileToken: v.turnstileToken,
    photos,
    lead: {
      first_name: v.firstName,
      last_name: v.lastName,
      email: v.email,
      phone: v.phone,
      service: v.service,
      location: null,
      tattoo_size: null,
      tattoo_colors: null,
      tattoo_age: null,
      previous_treatments: null,
      desired_outcome: v.tattooType || null,
      preferred_date: v.preferredDate || null,
      preferred_time: v.preferredTime || null,
      message: v.message || null,
      source: "contact_page",
      utm_source: v.utmSource || null,
      utm_medium: v.utmMedium || null,
      utm_campaign: v.utmCampaign || null,
    },
  });
}
