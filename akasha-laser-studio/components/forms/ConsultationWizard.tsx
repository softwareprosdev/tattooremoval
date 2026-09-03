"use client";

import * as React from "react";
import { useForm, type Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PhotoUploadField } from "@/components/forms/PhotoUploadField";
import { TurnstileWidget } from "@/components/forms/TurnstileWidget";
import {
  consultationSchema,
  type ConsultationValues,
  serviceInterestLabels,
  SERVICE_INTEREST,
} from "@/lib/validation/lead";
import { useUtmParams } from "@/lib/analytics/useUtmParams";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, label: "Service" },
  { id: 2, label: "Details" },
  { id: 3, label: "Photos" },
  { id: 4, label: "Contact" },
  { id: 5, label: "Schedule" },
  { id: 6, label: "Confirm" },
] as const;

const STEP_FIELDS: Record<number, Path<ConsultationValues>[]> = {
  1: ["service"],
  2: [
    "location",
    "approximateSize",
    "colors",
    "approximateAge",
    "previousTreatments",
    "desiredOutcome",
  ],
  3: [],
  4: ["firstName", "lastName", "email", "phone"],
  5: ["preferredDate", "preferredTime", "message"],
  6: ["turnstileToken"],
};

const inputClasses =
  "w-full rounded-sm border border-champagne-300/70 bg-ivory-100 px-4 py-3 text-sm text-charcoal-500 placeholder:text-taupe-300 focus:border-charcoal-500 focus:outline-none";
const labelClasses = "mb-1.5 block text-sm font-medium text-charcoal-500";
const errorClasses = "mt-1 text-xs text-red-600";

export function ConsultationWizard() {
  const [step, setStep] = React.useState(1);
  const [photos, setPhotos] = React.useState<File[]>([]);
  const [submitted, setSubmitted] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const startedRef = React.useRef(false);
  const utm = useUtmParams();

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ConsultationValues>({
    resolver: zodResolver(consultationSchema),
    mode: "onBlur",
    defaultValues: {
      service: undefined,
      photoUrls: [],
      turnstileToken: "",
      companyWebsite: "",
    },
  });

  React.useEffect(() => {
    return () => {
      if (startedRef.current && !submitted) {
        trackEvent(ANALYTICS_EVENTS.FORM_ABANDONED, { form: "consultation_wizard", lastStep: step });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markStarted = () => {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent(ANALYTICS_EVENTS.CONSULTATION_STARTED, { source: "consultation_wizard" });
    }
  };

  const goNext = async () => {
    const fields = STEP_FIELDS[step] ?? [];
    const valid = fields.length === 0 || (await trigger(fields));
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = async (data: ConsultationValues) => {
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append(
        "payload",
        JSON.stringify({ ...data, ...utm })
      );
      photos.forEach((file) => formData.append("photos", file));

      const res = await fetch("/api/consultation", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();

      if (!res.ok || !json.ok) {
        setSubmitError(
          json.error ?? "Something went wrong. Please try again or call us directly."
        );
        setIsSubmitting(false);
        return;
      }

      trackEvent(ANALYTICS_EVENTS.CONSULTATION_COMPLETED, { source: "consultation_wizard" });
      setSubmitted(true);
    } catch {
      setSubmitError("We couldn't reach our server. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const values = watch();

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-sm border border-champagne-300/70 bg-ivory-100 px-8 py-16 text-center shadow-soft">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-laser/15 text-laser-deep">
          <Check className="h-7 w-7" />
        </div>
        <h2 className="text-2xl sm:text-3xl">
          Thank you. Your consultation request has been received.
        </h2>
        <p className="prose-body max-w-md">
          A member of our team will reach out to confirm your appointment
          details. If you need to speak with us sooner, please call the
          studio directly.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-sm border border-champagne-300/70 bg-ivory-100 p-6 shadow-soft sm:p-10">
      {/* Progress */}
      <ol className="mb-10 flex items-center gap-1.5" aria-label="Consultation form progress">
        {STEPS.map((s) => (
          <li
            key={s.id}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors duration-300",
              s.id <= step ? "bg-charcoal-500" : "bg-champagne-200"
            )}
            aria-current={s.id === step ? "step" : undefined}
          />
        ))}
      </ol>
      <p className="eyebrow mb-6">
        Step {step} of {STEPS.length} · {STEPS[step - 1]?.label}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} onFocus={markStarted} noValidate>
        {/* Honeypot */}
        <input
          type="text"
          {...register("companyWebsite")}
          className="sr-only"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 1 ? (
              <fieldset>
                <legend className="text-xl font-serif text-charcoal-500">
                  What would you like help with?
                </legend>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {SERVICE_INTEREST.map((option) => (
                    <label
                      key={option}
                      className={cn(
                        "cursor-pointer rounded-sm border px-5 py-6 text-center transition-colors",
                        values.service === option
                          ? "border-charcoal-500 bg-champagne-100"
                          : "border-champagne-300/70 hover:border-taupe-300"
                      )}
                    >
                      <input
                        type="radio"
                        value={option}
                        {...register("service")}
                        className="sr-only"
                      />
                      <span className="font-sans text-sm font-medium text-charcoal-500">
                        {serviceInterestLabels[option]}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.service ? (
                  <p className={errorClasses}>Please select an option to continue.</p>
                ) : null}
              </fieldset>
            ) : null}

            {step === 2 ? (
              <fieldset>
                <legend className="text-xl font-serif text-charcoal-500">
                  Tell us about it.
                </legend>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClasses} htmlFor="location">
                      Location on body
                    </label>
                    <input id="location" className={inputClasses} {...register("location")} />
                  </div>
                  <div>
                    <label className={labelClasses} htmlFor="approximateSize">
                      Approximate size
                    </label>
                    <input
                      id="approximateSize"
                      className={inputClasses}
                      placeholder="e.g. palm-sized"
                      {...register("approximateSize")}
                    />
                  </div>
                  <div>
                    <label className={labelClasses} htmlFor="colors">
                      Colors present
                    </label>
                    <input id="colors" className={inputClasses} {...register("colors")} />
                  </div>
                  <div>
                    <label className={labelClasses} htmlFor="approximateAge">
                      Approximate age of tattoo/PMU
                    </label>
                    <input
                      id="approximateAge"
                      className={inputClasses}
                      placeholder="e.g. 5 years"
                      {...register("approximateAge")}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClasses} htmlFor="previousTreatments">
                      Previous removal treatments (if any)
                    </label>
                    <input
                      id="previousTreatments"
                      className={inputClasses}
                      {...register("previousTreatments")}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClasses} htmlFor="desiredOutcome">
                      Desired outcome
                    </label>
                    <textarea
                      id="desiredOutcome"
                      rows={3}
                      className={inputClasses}
                      {...register("desiredOutcome")}
                    />
                  </div>
                </div>
              </fieldset>
            ) : null}

            {step === 3 ? (
              <div>
                <h2 className="text-xl font-serif text-charcoal-500">
                  Optional photo upload.
                </h2>
                <p className="prose-body mt-2 mb-4 text-sm">
                  Photos help us better prepare for your consultation, but
                  are entirely optional.
                </p>
                <PhotoUploadField files={photos} onChange={setPhotos} />
              </div>
            ) : null}

            {step === 4 ? (
              <fieldset>
                <legend className="text-xl font-serif text-charcoal-500">
                  Contact information.
                </legend>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClasses} htmlFor="firstName">
                      First name *
                    </label>
                    <input id="firstName" className={inputClasses} {...register("firstName")} />
                    {errors.firstName ? (
                      <p className={errorClasses}>{errors.firstName.message}</p>
                    ) : null}
                  </div>
                  <div>
                    <label className={labelClasses} htmlFor="lastName">
                      Last name *
                    </label>
                    <input id="lastName" className={inputClasses} {...register("lastName")} />
                    {errors.lastName ? (
                      <p className={errorClasses}>{errors.lastName.message}</p>
                    ) : null}
                  </div>
                  <div>
                    <label className={labelClasses} htmlFor="email">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={inputClasses}
                      {...register("email")}
                    />
                    {errors.email ? (
                      <p className={errorClasses}>{errors.email.message}</p>
                    ) : null}
                  </div>
                  <div>
                    <label className={labelClasses} htmlFor="phone">
                      Phone *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className={inputClasses}
                      {...register("phone")}
                    />
                    {errors.phone ? (
                      <p className={errorClasses}>{errors.phone.message}</p>
                    ) : null}
                  </div>
                </div>
              </fieldset>
            ) : null}

            {step === 5 ? (
              <fieldset>
                <legend className="text-xl font-serif text-charcoal-500">
                  Preferred date &amp; time.
                </legend>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClasses} htmlFor="preferredDate">
                      Preferred date
                    </label>
                    <input
                      id="preferredDate"
                      type="date"
                      className={inputClasses}
                      {...register("preferredDate")}
                    />
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
                      Anything else we should know?
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      className={inputClasses}
                      {...register("message")}
                    />
                  </div>
                </div>
              </fieldset>
            ) : null}

            {step === 6 ? (
              <div>
                <h2 className="text-xl font-serif text-charcoal-500">
                  Review &amp; confirm.
                </h2>
                <dl className="prose-body mt-4 space-y-1 text-sm">
                  <div className="flex justify-between gap-4 border-b border-champagne-200 py-2">
                    <dt>Service</dt>
                    <dd className="text-charcoal-500">
                      {values.service ? serviceInterestLabels[values.service] : "—"}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-champagne-200 py-2">
                    <dt>Name</dt>
                    <dd className="text-charcoal-500">
                      {values.firstName} {values.lastName}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-champagne-200 py-2">
                    <dt>Contact</dt>
                    <dd className="text-charcoal-500">
                      {values.email} · {values.phone}
                    </dd>
                  </div>
                  {values.preferredDate ? (
                    <div className="flex justify-between gap-4 border-b border-champagne-200 py-2">
                      <dt>Preferred date</dt>
                      <dd className="text-charcoal-500">{values.preferredDate}</dd>
                    </div>
                  ) : null}
                  {photos.length > 0 ? (
                    <div className="flex justify-between gap-4 border-b border-champagne-200 py-2">
                      <dt>Photos attached</dt>
                      <dd className="text-charcoal-500">{photos.length}</dd>
                    </div>
                  ) : null}
                </dl>

                <div className="mt-6">
                  <TurnstileWidget onVerify={(token) => setValue("turnstileToken", token, { shouldValidate: true })} />
                  {errors.turnstileToken ? (
                    <p className={errorClasses}>{errors.turnstileToken.message}</p>
                  ) : null}
                </div>

                <p className="prose-body mt-6 text-xs text-taupe-300">
                  Submitting this form sends your consultation request to
                  Akasha Laser Studio. This does not confirm an appointment
                  — our team will follow up to schedule your visit.
                </p>

                {submitError ? (
                  <p role="alert" className="mt-4 text-sm text-red-600">
                    {submitError}
                  </p>
                ) : null}
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={goBack}
            className={step === 1 ? "invisible" : ""}
          >
            Back
          </Button>

          {step < STEPS.length ? (
            <Button type="button" onClick={goNext}>
              Continue
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
                </>
              ) : (
                "Submit Consultation Request"
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
