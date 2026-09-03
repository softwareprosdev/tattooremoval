"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PhotoUploadField } from "@/components/forms/PhotoUploadField";
import { TurnstileWidget } from "@/components/forms/TurnstileWidget";
import {
  contactFormSchema,
  type ContactFormValues,
  serviceInterestLabels,
  SERVICE_INTEREST,
} from "@/lib/validation/lead";
import { useUtmParams } from "@/lib/analytics/useUtmParams";

const inputClasses =
  "w-full rounded-sm border border-champagne-300/70 bg-ivory-100 px-4 py-3 text-sm text-charcoal-500 placeholder:text-taupe-300 focus:border-charcoal-500 focus:outline-none";
const labelClasses = "mb-1.5 block text-sm font-medium text-charcoal-500";
const errorClasses = "mt-1 text-xs text-red-600";

export function ContactForm() {
  const [photos, setPhotos] = React.useState<File[]>([]);
  const [submitted, setSubmitted] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const utm = useUtmParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
    defaultValues: { turnstileToken: "", companyWebsite: "", photoUrls: [] },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("payload", JSON.stringify({ ...data, ...utm }));
      photos.forEach((file) => formData.append("photos", file));

      const res = await fetch("/api/contact", { method: "POST", body: formData });
      const json = await res.json();

      if (!res.ok || !json.ok) {
        setSubmitError(json.error ?? "Something went wrong. Please try again or call us directly.");
        setIsSubmitting(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError("We couldn't reach our server. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-sm border border-champagne-300/70 bg-ivory-100 px-8 py-16 text-center shadow-soft">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-laser/15 text-laser-deep">
          <Check className="h-7 w-7" />
        </div>
        <h2 className="text-2xl sm:text-3xl">Message received.</h2>
        <p className="prose-body max-w-md">
          Thank you for reaching out. A member of our team will get back to
          you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-sm border border-champagne-300/70 bg-ivory-100 p-6 shadow-soft sm:p-10"
    >
      <input
        type="text"
        {...register("companyWebsite")}
        className="sr-only"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClasses} htmlFor="firstName">
            First name *
          </label>
          <input id="firstName" className={inputClasses} {...register("firstName")} />
          {errors.firstName ? <p className={errorClasses}>{errors.firstName.message}</p> : null}
        </div>
        <div>
          <label className={labelClasses} htmlFor="lastName">
            Last name *
          </label>
          <input id="lastName" className={inputClasses} {...register("lastName")} />
          {errors.lastName ? <p className={errorClasses}>{errors.lastName.message}</p> : null}
        </div>
        <div>
          <label className={labelClasses} htmlFor="email">
            Email *
          </label>
          <input id="email" type="email" className={inputClasses} {...register("email")} />
          {errors.email ? <p className={errorClasses}>{errors.email.message}</p> : null}
        </div>
        <div>
          <label className={labelClasses} htmlFor="phone">
            Phone *
          </label>
          <input id="phone" type="tel" className={inputClasses} {...register("phone")} />
          {errors.phone ? <p className={errorClasses}>{errors.phone.message}</p> : null}
        </div>
        <div>
          <label className={labelClasses} htmlFor="service">
            Service *
          </label>
          <select id="service" className={inputClasses} {...register("service")}>
            <option value="">Select a service</option>
            {SERVICE_INTEREST.map((s) => (
              <option key={s} value={s}>
                {serviceInterestLabels[s]}
              </option>
            ))}
          </select>
          {errors.service ? <p className={errorClasses}>Please select a service.</p> : null}
        </div>
        <div>
          <label className={labelClasses} htmlFor="tattooType">
            Tattoo / PMU type
          </label>
          <input
            id="tattooType"
            className={inputClasses}
            placeholder="e.g. eyebrow PMU, forearm tattoo"
            {...register("tattooType")}
          />
        </div>
        <div>
          <label className={labelClasses} htmlFor="preferredDate">
            Preferred appointment date
          </label>
          <input id="preferredDate" type="date" className={inputClasses} {...register("preferredDate")} />
        </div>
        <div>
          <label className={labelClasses} htmlFor="preferredTime">
            Preferred time
          </label>
          <select id="preferredTime" className={inputClasses} {...register("preferredTime")}>
            <option value="">No preference</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelClasses} htmlFor="message">
            Message
          </label>
          <textarea id="message" rows={4} className={inputClasses} {...register("message")} />
        </div>
      </div>

      <div className="mt-8">
        <p className="mb-3 text-sm font-medium text-charcoal-500">
          Upload photos (optional)
        </p>
        <PhotoUploadField files={photos} onChange={setPhotos} />
      </div>

      <div className="mt-8">
        <TurnstileWidget
          onVerify={(token) => setValue("turnstileToken", token, { shouldValidate: true })}
        />
        {errors.turnstileToken ? <p className={errorClasses}>{errors.turnstileToken.message}</p> : null}
      </div>

      {submitError ? (
        <p role="alert" className="mt-4 text-sm text-red-600">
          {submitError}
        </p>
      ) : null}

      <Button type="submit" className="mt-8 w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
