import { Resend } from "resend";
import { business } from "@/lib/config/business";
import type { LeadRecord } from "@/lib/validation/lead";
import { serviceInterestLabels } from "@/lib/validation/lead";

let client: Resend | null = null;

function getClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!client) client = new Resend(apiKey);
  return client;
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

const FROM =
  process.env.RESEND_FROM_EMAIL ?? "Akasha Laser Studio <no-reply@akashalaser.com>";

/**
 * Notifies internal staff of a new lead. No-ops (resolves silently) when
 * Resend isn't configured yet, so the API route never fails a
 * submission solely because email hasn't been wired up.
 */
export async function sendLeadNotificationEmail(
  lead: LeadRecord
): Promise<void> {
  const resend = getClient();
  const to = process.env.BUSINESS_NOTIFICATION_EMAIL;
  if (!resend || !to) return;

  const serviceLabel = serviceInterestLabels[lead.service];

  await resend.emails.send({
    from: FROM,
    to,
    subject: `New consultation request — ${lead.first_name} ${lead.last_name} (${serviceLabel})`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #2B2925; max-width: 560px;">
        <h2 style="font-weight: 600;">New Consultation Request</h2>
        <p><strong>Name:</strong> ${escapeHtml(lead.first_name)} ${escapeHtml(lead.last_name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(lead.phone)}</p>
        <p><strong>Service:</strong> ${escapeHtml(serviceLabel)}</p>
        ${lead.location ? `<p><strong>Location on body:</strong> ${escapeHtml(lead.location)}</p>` : ""}
        ${lead.tattoo_size ? `<p><strong>Approx. size:</strong> ${escapeHtml(lead.tattoo_size)}</p>` : ""}
        ${lead.tattoo_colors ? `<p><strong>Colors:</strong> ${escapeHtml(lead.tattoo_colors)}</p>` : ""}
        ${lead.tattoo_age ? `<p><strong>Approx. age:</strong> ${escapeHtml(lead.tattoo_age)}</p>` : ""}
        ${lead.previous_treatments ? `<p><strong>Previous treatments:</strong> ${escapeHtml(lead.previous_treatments)}</p>` : ""}
        ${lead.desired_outcome ? `<p><strong>Desired outcome:</strong> ${escapeHtml(lead.desired_outcome)}</p>` : ""}
        ${lead.preferred_date ? `<p><strong>Preferred date:</strong> ${escapeHtml(lead.preferred_date)}</p>` : ""}
        ${lead.preferred_time ? `<p><strong>Preferred time:</strong> ${escapeHtml(lead.preferred_time)}</p>` : ""}
        ${lead.message ? `<p><strong>Message:</strong> ${escapeHtml(lead.message)}</p>` : ""}
        ${lead.photo_urls.length ? `<p><strong>Photos attached:</strong> ${lead.photo_urls.length}</p>` : ""}
        <p style="color:#8B7F6E; font-size: 12px; margin-top: 24px;">Source: ${escapeHtml(lead.source)}${lead.utm_source ? ` · utm_source: ${escapeHtml(lead.utm_source)}` : ""}</p>
      </div>
    `,
  });
}

/**
 * Sends the client a confirmation email. Deliberately avoids claiming an
 * appointment is confirmed — only that the request was received.
 */
export async function sendLeadConfirmationEmail(
  lead: LeadRecord
): Promise<void> {
  const resend = getClient();
  if (!resend) return;

  await resend.emails.send({
    from: FROM,
    to: lead.email,
    subject: `We've received your consultation request — ${business.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #2B2925; max-width: 560px;">
        <h2 style="font-weight: 600;">Thank you, ${escapeHtml(lead.first_name)}.</h2>
        <p>Your consultation request has been received. A member of our team will reach out shortly to confirm your appointment details.</p>
        <p>In the meantime, if you have any questions, feel free to call us:</p>
        <p>${business.phones.map((p) => escapeHtml(p.number)).join(" · ")}</p>
        <p style="margin-top: 24px;">${business.name}<br/>${business.address.line1}, ${business.address.city}, ${business.address.state} ${business.address.zip}</p>
      </div>
    `,
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
