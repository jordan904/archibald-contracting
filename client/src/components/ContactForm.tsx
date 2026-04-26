import { useState, type FC, type FormEvent, type ChangeEvent } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

type Theme = "forest" | "orange";

const themeStyles: Record<Theme, {
  iconBg: string;
  iconShadow: string;
  submitBg: string;
  submitShadow: string;
  submitHover: string;
  inputFocus: string;
}> = {
  forest: {
    iconBg: "bg-brand-forest",
    iconShadow: "shadow-[0_8px_24px_-4px_rgba(30,80,60,0.4)]",
    submitBg: "bg-gradient-to-r from-brand-forest to-brand-forest-light",
    submitShadow: "shadow-[0_8px_30px_-4px_rgba(30,80,60,0.5)]",
    submitHover: "hover:shadow-[0_16px_50px_-4px_rgba(30,80,60,0.7)]",
    inputFocus: "focus:border-brand-forest focus:ring-brand-forest/20",
  },
  orange: {
    iconBg: "bg-brand-orange",
    iconShadow: "shadow-[0_8px_24px_-4px_rgba(180,80,20,0.4)]",
    submitBg: "bg-gradient-to-r from-brand-orange to-brand-orange",
    submitShadow: "shadow-[0_8px_30px_-4px_rgba(180,80,20,0.5)]",
    submitHover: "hover:shadow-[0_16px_50px_-4px_rgba(180,80,20,0.7)]",
    inputFocus: "focus:border-brand-orange focus:ring-brand-orange/20",
  },
};

export interface ContactFormProps {
  theme?: Theme;
  successTitle?: string;
  successMessage?: string;
  placeholder?: string;
  buttonLabel?: string;
}

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
  website: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s\-()+]{7,}$/;

export const ContactForm: FC<ContactFormProps> = ({
  theme = "forest",
  successTitle = "Thank You!",
  successMessage = "Your message has been received. We'll be in touch within 1 business day.",
  placeholder = "Tell us about your project, timeline, and any questions you have.",
  buttonLabel = "Send Message",
}) => {
  const styles = themeStyles[theme];

  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    phone: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof FormValues) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      const { value } = e.target;
      setValues((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => {
          const { [field]: _drop, ...rest } = prev;
          return rest;
        });
      }
    };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (values.website) return;

    const next: Partial<Record<keyof FormValues, string>> = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim() || !EMAIL_RE.test(values.email))
      next.email = "Please enter a valid email address.";
    if (!values.phone.trim() || !PHONE_RE.test(values.phone))
      next.phone = "Please enter a valid phone number.";
    if (!values.message.trim()) next.message = "Please tell us a bit about what you're looking for.";

    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white border border-brand-sandstone/60 p-12 text-center shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)]">
        <div className={`w-16 h-16 mx-auto mb-6 rounded-full ${styles.iconBg} flex items-center justify-center ${styles.iconShadow}`}>
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-[family-name:var(--font-display)] text-2xl text-brand-charcoal mb-3">
          {successTitle}
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">{successMessage}</p>
      </div>
    );
  }

  const inputClass = `w-full px-4 py-3 border border-brand-sandstone bg-brand-cream/30 text-brand-charcoal placeholder:text-brand-charcoal/40 focus:outline-none focus:ring-2 transition-colors ${styles.inputFocus}`;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative bg-white border border-brand-sandstone/60 p-6 sm:p-8 lg:p-10 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)]"
    >
      <div aria-hidden="true" className="absolute left-[-9999px] top-0">
        <label htmlFor="contact-website">Website</label>
        <input
          type="text"
          id="contact-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={handleChange("website")}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-semibold text-brand-charcoal mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your full name"
            value={values.name}
            onChange={handleChange("name")}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={inputClass}
          />
          {errors.name && (
            <p id="contact-name-error" role="alert" className="text-red-600 text-xs mt-1.5">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-phone" className="block text-sm font-semibold text-brand-charcoal mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="contact-phone"
            name="phone"
            required
            autoComplete="tel"
            inputMode="tel"
            placeholder="(902) 555-0123"
            value={values.phone}
            onChange={handleChange("phone")}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
            className={inputClass}
          />
          {errors.phone && (
            <p id="contact-phone-error" role="alert" className="text-red-600 text-xs mt-1.5">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-email" className="block text-sm font-semibold text-brand-charcoal mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          value={values.email}
          onChange={handleChange("email")}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={inputClass}
        />
        {errors.email && (
          <p id="contact-email-error" role="alert" className="text-red-600 text-xs mt-1.5">
            {errors.email}
          </p>
        )}
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className="block text-sm font-semibold text-brand-charcoal mb-2">
          How Can We Help?
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder={placeholder}
          value={values.message}
          onChange={handleChange("message")}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={`${inputClass} resize-y`}
        />
        {errors.message && (
          <p id="contact-message-error" role="alert" className="text-red-600 text-xs mt-1.5">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className={`mt-7 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4
                   ${styles.submitBg} text-white font-semibold tracking-wide uppercase text-sm
                   ${styles.submitShadow} ${styles.submitHover}
                   hover:-translate-y-1 transition-all duration-300`}
      >
        {buttonLabel}
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
};
