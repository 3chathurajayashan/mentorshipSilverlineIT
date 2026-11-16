import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const css = `
/* SF Pro is Apple's own font and only exists on Apple devices.
   Inter is the closest open match, so every other device gets it instead. */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

.su-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  color: #1d1d1f;
  font-family: "SF Pro Text", "SF Pro Display", -apple-system,
    BlinkMacSystemFont, "Inter", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  letter-spacing: -0.01em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

.su-title,
.su-section-title {
  font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Inter",
    "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.su-main {
  flex: 1;
  width: 100%;
  max-width: 640px;
  padding: 72px 24px 56px;
  box-sizing: border-box;
}

/* Header */

.su-header {
  text-align: center;
  margin-bottom: 40px;
}

.su-mark {
  width: 48px;
  height: 48px;
  margin: 0 auto 24px;
  color: #1d1d1f;
}

.su-title {
  font-size: 40px;
  line-height: 1.1;
  font-weight: 600;
  letter-spacing: -0.022em;
  margin: 0 0 12px;
}

.su-sub {
  font-size: 19px;
  line-height: 1.4;
  color: #6e6e73;
  margin: 0 auto;
  max-width: 440px;
}

/* Sections */

.su-section {
  background: #f5f5f7;
  border-radius: 18px;
  padding: 28px 28px 16px;
  margin-bottom: 20px;
}

.su-section-head {
  margin-bottom: 20px;
}

.su-section-title {
  font-size: 21px;
  line-height: 1.19;
  font-weight: 600;
  letter-spacing: -0.012em;
  margin: 0 0 4px;
}

.su-section-desc {
  font-size: 14px;
  line-height: 1.43;
  color: #6e6e73;
  margin: 0;
}

/* Layout helpers */

.su-row {
  display: flex;
  gap: 12px;
}

.su-row > .su-field {
  flex: 1;
  min-width: 0;
}

.su-field {
  position: relative;
  margin-bottom: 12px;
  text-align: left;
}

/* Inputs */

.su-input,
.su-select {
  width: 100%;
  box-sizing: border-box;
  height: 56px;
  padding: 22px 16px 6px;
  font: inherit;
  font-size: 17px;
  color: #1d1d1f;
  background: #fff;
  border: 1px solid #d2d2d7;
  border-radius: 12px;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.su-input:hover,
.su-select:hover {
  border-color: #86868b;
}

.su-input:focus,
.su-select:focus {
  border-color: #0071e3;
  box-shadow: 0 0 0 4px rgba(0, 125, 250, 0.25);
}

.su-input.error,
.su-select.error {
  border-color: #e30000;
}

.su-input.error:focus,
.su-select.error:focus {
  box-shadow: 0 0 0 4px rgba(227, 0, 0, 0.18);
}

.su-label {
  position: absolute;
  left: 17px;
  top: 17px;
  font-size: 17px;
  color: #86868b;
  pointer-events: none;
  transform-origin: left top;
  transition: transform 0.15s;
}

.su-input:focus + .su-label,
.su-input:not(:placeholder-shown) + .su-label {
  transform: translateY(-9px) scale(0.76);
}

/* Select: label is always raised */

.su-select {
  appearance: none;
  -webkit-appearance: none;
  padding-right: 44px;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5l5 5 5-5' stroke='%2386868b' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 18px center;
}

.su-select + .su-label {
  transform: translateY(-9px) scale(0.76);
}

.su-select.is-empty {
  color: #86868b;
}

.su-select option {
  color: #1d1d1f;
}

/* Show / hide password */

.su-toggle {
  position: absolute;
  right: 14px;
  top: 18px;
  background: none;
  border: 0;
  padding: 0;
  font: inherit;
  font-size: 14px;
  color: #0066cc;
  cursor: pointer;
}

.su-toggle:hover {
  text-decoration: underline;
}

.su-toggle:focus-visible,
.su-link:focus-visible,
.su-seg button:focus-visible {
  outline: 2px solid #0071e3;
  outline-offset: 2px;
  border-radius: 4px;
}

.su-input.has-toggle {
  padding-right: 64px;
}

/* Password strength */

.su-meter {
  display: flex;
  gap: 4px;
  margin: 0 2px 6px;
}

.su-meter span {
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: #d2d2d7;
  transition: background 0.2s;
}

.su-hint {
  font-size: 13px;
  color: #6e6e73;
  text-align: left;
  margin: 0 4px 12px;
  line-height: 1.4;
}

/* Messages */

.su-field-error {
  color: #e30000;
  font-size: 13px;
  text-align: left;
  margin: 6px 4px 0;
  line-height: 1.35;
}

.su-error {
  color: #e30000;
  font-size: 14px;
  text-align: left;
  margin: 0 4px 16px;
}

/* Account type segmented control */

.su-seg {
  display: flex;
  gap: 4px;
  padding: 4px;
  margin-bottom: 12px;
  background: #e8e8ed;
  border-radius: 12px;
}

.su-seg button {
  flex: 1;
  height: 44px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  font: inherit;
  font-size: 15px;
  font-weight: 500;
  color: #424245;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, box-shadow 0.15s;
}

.su-seg button[aria-checked="true"] {
  background: #fff;
  color: #1d1d1f;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

/* Terms + submit */

.su-check {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 28px 4px 24px;
  font-size: 14px;
  line-height: 1.4;
  text-align: left;
  color: #424245;
  cursor: pointer;
}

.su-check input {
  width: 16px;
  height: 16px;
  margin: 2px 0 0;
  accent-color: #0071e3;
  flex-shrink: 0;
}

.su-link {
  color: #0066cc;
  text-decoration: none;
  background: none;
  border: 0;
  padding: 0;
  font: inherit;
  cursor: pointer;
}

.su-link:hover {
  text-decoration: underline;
}

.su-button {
  width: 100%;
  height: 52px;
  border: 0;
  border-radius: 980px;
  background: #0071e3;
  color: #fff;
  font: inherit;
  font-size: 17px;
  font-weight: 400;
  cursor: pointer;
  transition: background 0.15s, opacity 0.15s;
}

.su-button:hover:not(:disabled) {
  background: #0077ed;
}

.su-button:focus-visible {
  outline: 2px solid #0071e3;
  outline-offset: 3px;
}

.su-button:disabled {
  opacity: 0.4;
  cursor: default;
}

.su-divider {
  height: 1px;
  background: #d2d2d7;
  margin: 40px 0 24px;
  border: 0;
}

.su-small {
  font-size: 14px;
  color: #6e6e73;
  margin: 0;
  text-align: center;
}

/* Step progress */

.su-steps {
  display: flex;
  gap: 8px;
  margin-bottom: 28px;
}

.su-step {
  flex: 1;
  background: none;
  border: 0;
  padding: 0;
  font: inherit;
  text-align: left;
  cursor: default;
}

.su-step.is-done {
  cursor: pointer;
}

.su-step-bar {
  height: 4px;
  border-radius: 2px;
  background: #d2d2d7;
  overflow: hidden;
  margin-bottom: 8px;
}

.su-step-bar i {
  display: block;
  height: 100%;
  background: #0071e3;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}

.su-step.is-active .su-step-bar i,
.su-step.is-done .su-step-bar i {
  transform: scaleX(1);
}

.su-step-label {
  font-size: 13px;
  color: #86868b;
  transition: color 0.2s;
}

.su-step.is-active .su-step-label,
.su-step.is-done .su-step-label {
  color: #1d1d1f;
}

.su-step:focus-visible {
  outline: 2px solid #0071e3;
  outline-offset: 4px;
  border-radius: 4px;
}

/* Horizontal slider */

.su-viewport {
  overflow: hidden;
  /* room so focus rings aren't clipped */
  margin: -8px;
}

.su-track {
  display: flex;
  align-items: flex-start;
  transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}

.su-panel {
  flex: 0 0 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 8px;
  /* inactive panels collapse and leave the tab order
     only after the slide has finished */
  max-height: 0;
  overflow: hidden;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.35s ease, max-height 0s 0.45s, visibility 0s 0.45s;
}

.su-panel.is-active {
  max-height: 4000px;
  visibility: visible;
  opacity: 1;
  transition: opacity 0.35s ease 0.1s, max-height 0s, visibility 0s;
}

/* Back / Continue */

.su-actions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.su-actions .su-button {
  flex: 1;
}

.su-actions .su-button.secondary {
  flex: 0 0 120px;
  background: #e8e8ed;
  color: #1d1d1f;
}

.su-actions .su-button.secondary:hover:not(:disabled) {
  background: #dcdce1;
}

/* Footer */

.su-footer {
  width: 100%;
  box-sizing: border-box;
  max-width: 980px;
  padding: 20px 24px 28px;
  border-top: 1px solid #d2d2d7;
  font-size: 12px;
  color: #6e6e73;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
  justify-content: center;
}

.su-footer a {
  color: #424245;
  text-decoration: none;
}

.su-footer a:hover {
  text-decoration: underline;
}

/* Responsive */

@media (max-width: 560px) {
  .su-main {
    padding-top: 48px;
  }

  .su-title {
    font-size: 32px;
  }

  .su-sub {
    font-size: 17px;
  }

  .su-section {
    padding: 22px 16px 10px;
    border-radius: 16px;
  }

  .su-row {
    flex-direction: column;
    gap: 0;
  }

  .su-actions .su-button.secondary {
    flex-basis: 96px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .su-input,
  .su-select,
  .su-label,
  .su-button,
  .su-seg button,
  .su-meter span,
  .su-track,
  .su-panel,
  .su-step-bar i {
    transition: none;
  }
}
`;

const STRENGTH_COLORS = ["#e30000", "#ff9f0a", "#30b350", "#248a3d"];
const STRENGTH_LABELS = ["Too weak", "Fair", "Good", "Strong"];

const ROLES = [
  { value: "STUDENT", label: "Student" },
  { value: "TUTOR", label: "Tutor" },
];

const INSTITUTE_TYPES = [
  { value: "SCHOOL", label: "School" },
  { value: "UNIVERSITY", label: "University" },
  { value: "COLLEGE", label: "College" },
  { value: "OTHER", label: "Other" },
];

const EDUCATION_LEVELS = [
  { value: "PRIMARY", label: "Primary" },
  { value: "SECONDARY", label: "Secondary" },
  { value: "O_LEVEL", label: "O/L" },
  { value: "A_LEVEL", label: "A/L" },
  { value: "DIPLOMA", label: "Diploma" },
  { value: "UNDERGRADUATE", label: "Undergraduate" },
  { value: "POSTGRADUATE", label: "Postgraduate" },
  { value: "OTHER", label: "Other" },
];

// Which form fields belong to which step (used for per-step validation)
const STEPS = [
  {
    label: "Account",
    fields: [
      "role",
      "firstName",
      "lastName",
      "email",
      "phone",
      "password",
      "confirm",
    ],
  },
  { label: "Institute", fields: ["instituteName", "instituteType"] },
  { label: "Education", fields: ["educationLevel", "form"] },
];

const LAST_STEP = STEPS.length - 1;

function strengthOf(password) {
  if (!password) return 0;

  let score = 0;

  if (password.length >= 8) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password) || password.length >= 14) score++;

  return Math.max(1, score);
}

function Field({ id, label, error, children, ...props }) {
  return (
    <div className="su-field">
      <input
        id={id}
        className={`su-input${error ? " error" : ""}${
          children ? " has-toggle" : ""
        }`}
        placeholder=" "
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />

      <label className="su-label" htmlFor={id}>
        {label}
      </label>

      {children}

      {error && (
        <p className="su-field-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

function Select({ id, label, value, options, placeholder, error, ...props }) {
  return (
    <div className="su-field">
      <select
        id={id}
        value={value}
        className={`su-select${error ? " error" : ""}${
          value ? "" : " is-empty"
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <label className="su-label" htmlFor={id}>
        {label}
      </label>

      {error && (
        <p className="su-field-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

function Section({ title, description, children }) {
  return (
    <section className="su-section">
      <div className="su-section-head">
        <h2 className="su-section-title">{title}</h2>
        {description && <p className="su-section-desc">{description}</p>}
      </div>

      {children}
    </section>
  );
}

function SignUp() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    role: "STUDENT",

    instituteName: "",
    instituteType: "",
    faculty: "",
    department: "",

    educationLevel: "",
    currentYearOrGrade: "",
    fieldOfStudy: "",
  });

  const [showPw, setShowPw] = useState(false);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  const set = (key) => (e) => {
    setForm((previous) => ({
      ...previous,
      [key]: e.target.value,
    }));

    setErrors((previous) => ({
      ...previous,
      [key]: "",
      form: "",
    }));
  };

  const setRole = (role) => {
    setForm((previous) => ({ ...previous, role }));
    setErrors((previous) => ({ ...previous, role: "", form: "" }));
  };

  const strength = strengthOf(form.password);

  const validate = () => {
    const next = {};

    if (!form.firstName.trim()) {
      next.firstName = "Enter your first name.";
    }

    if (!form.lastName.trim()) {
      next.lastName = "Enter your last name.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Enter a valid email address.";
    }

    if (!form.phone.trim()) {
      next.phone = "Enter your phone number.";
    }

    if (form.password.length < 8) {
      next.password = "Use at least 8 characters.";
    }

    if (form.confirm !== form.password) {
      next.confirm = "Passwords don't match.";
    }

    if (!["STUDENT", "TUTOR"].includes(form.role)) {
      next.role = "Select a valid account type.";
    }

    if (!form.instituteName.trim()) {
      next.instituteName = "Enter your institute name.";
    }

    if (!INSTITUTE_TYPES.some((t) => t.value === form.instituteType)) {
      next.instituteType = "Select your institute type.";
    }

    if (!EDUCATION_LEVELS.some((l) => l.value === form.educationLevel)) {
      next.educationLevel = "Select your education level.";
    }

    if (!agree) {
      next.form = "Please agree to the Terms of Use and Privacy Policy.";
    }

    return next;
  };

  // Move focus to the first invalid field (without scrolling the slider).
  const focusFirstInvalid = () => {
    setTimeout(() => {
      formRef.current
        ?.querySelector('[aria-invalid="true"]')
        ?.focus({ preventScroll: true });
    }, 0);
  };

  const goTo = (index) => {
    setStep(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Validate only the current step, then slide forward.
  const handleNext = () => {
    const all = validate();
    const stepErrors = {};

    STEPS[step].fields.forEach((key) => {
      if (key !== "form" && all[key]) stepErrors[key] = all[key];
    });

    setErrors(stepErrors);

    if (Object.keys(stepErrors).length > 0) {
      focusFirstInvalid();
      return;
    }

    goTo(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // On steps 1 and 2, Enter / Continue just moves forward.
    if (step < LAST_STEP) {
      handleNext();
      return;
    }

    const next = validate();

    setErrors(next);

    if (Object.keys(next).length > 0) {
      // Jump back to the step that holds the first error.
      const bad = STEPS.findIndex((s) => s.fields.some((f) => next[f]));

      if (bad !== -1 && bad !== step) goTo(bad);

      focusFirstInvalid();

      return;
    }

    setLoading(true);

    try {
      const userData = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        password: form.password,
        role: form.role,

        instituteDetails: {
          instituteName: form.instituteName.trim(),
          instituteType: form.instituteType,
          faculty: form.faculty.trim(),
          department: form.department.trim(),
        },

        educationDetails: {
          educationLevel: form.educationLevel,
          currentYearOrGrade: form.currentYearOrGrade.trim(),
          fieldOfStudy: form.fieldOfStudy.trim(),
        },
      };

      const response = await signup(userData);

      if (!response?.success) {
        throw new Error(response?.message || "Registration failed.");
      }

      // AuthContext saves the token and user.
      // Navigate only after successful registration.
      const dashboardRoutes = {
        STUDENT: "/student-dashboard",
        TUTOR: "/tutor-dashboard",
      };

      navigate(dashboardRoutes[response.user.role] || "/");
    } catch (error) {
      setErrors({
        form: error.message || "We couldn't create your account. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="su-page">
      <style>{css}</style>

      <main className="su-main">
        <header className="su-header">
          <svg
            className="su-mark"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M24 9 4 19l20 10 20-10L24 9Z" />
            <path d="M12 24v9c0 3 5.4 6 12 6s12-3 12-6v-9" />
            <path d="M44 19v11" />
          </svg>

          <h1 className="su-title">Create your account</h1>

          <p className="su-sub">
            One account for everything. Setup takes about a minute.
          </p>
        </header>

        {/* STEP PROGRESS */}

        <div className="su-steps">
          {STEPS.map((s, i) => (
            <button
              key={s.label}
              type="button"
              className={`su-step${i === step ? " is-active" : ""}${
                i < step ? " is-done" : ""
              }`}
              onClick={() => i < step && goTo(i)}
              disabled={i > step}
              aria-current={i === step ? "step" : undefined}
            >
              <div className="su-step-bar">
                <i />
              </div>

              <span className="su-step-label">
                {i + 1}. {s.label}
              </span>
            </button>
          ))}
        </div>

        <form ref={formRef} onSubmit={handleSubmit} noValidate>
          <div className="su-viewport">
            <div
              className="su-track"
              style={{ transform: `translateX(-${step * 100}%)` }}
            >
              {/* STEP 1: ACCOUNT */}

              <div className={`su-panel${step === 0 ? " is-active" : ""}`}>
                <Section
                  title="Account type"
                  description="Choose how you will use your account."
                >
                  <div
                    className="su-seg"
                    role="radiogroup"
                    aria-label="Account type"
                  >
                    {ROLES.map((role) => (
                      <button
                        key={role.value}
                        type="button"
                        role="radio"
                        aria-checked={form.role === role.value}
                        onClick={() => setRole(role.value)}
                      >
                        {role.label}
                      </button>
                    ))}
                  </div>

                  {errors.role && (
                    <p className="su-field-error">{errors.role}</p>
                  )}
                </Section>

                <Section
                  title={
                    form.role === "TUTOR" ? "Tutor details" : "Student details"
                  }
                  description="Tell us who you are and how to reach you."
                >
                  <div className="su-row">
                    <Field
                      id="su-first"
                      label="First name"
                      type="text"
                      autoComplete="given-name"
                      value={form.firstName}
                      onChange={set("firstName")}
                      error={errors.firstName}
                      autoFocus
                    />

                    <Field
                      id="su-last"
                      label="Last name"
                      type="text"
                      autoComplete="family-name"
                      value={form.lastName}
                      onChange={set("lastName")}
                      error={errors.lastName}
                    />
                  </div>

                  <Field
                    id="su-email"
                    label="Email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={set("email")}
                    error={errors.email}
                  />

                  <Field
                    id="su-phone"
                    label="Phone number"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    error={errors.phone}
                  />
                </Section>

                <Section
                  title="Password"
                  description="Use 8 or more characters with a mix of letters, numbers and symbols."
                >
                  <Field
                    id="su-password"
                    label="Password"
                    type={showPw ? "text" : "password"}
                    autoComplete="new-password"
                    value={form.password}
                    onChange={set("password")}
                    error={errors.password}
                  >
                    <button
                      type="button"
                      className="su-toggle"
                      onClick={() => setShowPw((previous) => !previous)}
                      aria-pressed={showPw}
                    >
                      {showPw ? "Hide" : "Show"}
                    </button>
                  </Field>

                  {form.password && (
                    <>
                      <div className="su-meter" aria-hidden="true">
                        {[0, 1, 2, 3].map((index) => (
                          <span
                            key={index}
                            style={
                              index < strength
                                ? { background: STRENGTH_COLORS[strength - 1] }
                                : undefined
                            }
                          />
                        ))}
                      </div>

                      <p className="su-hint" aria-live="polite">
                        Password strength: {STRENGTH_LABELS[strength - 1]}
                      </p>
                    </>
                  )}

                  <Field
                    id="su-confirm"
                    label="Confirm password"
                    type={showPw ? "text" : "password"}
                    autoComplete="new-password"
                    value={form.confirm}
                    onChange={set("confirm")}
                    error={errors.confirm}
                  />
                </Section>
              </div>

              {/* STEP 2: INSTITUTE */}

              <div className={`su-panel${step === 1 ? " is-active" : ""}`}>
                <Section
                  title="Institute details"
                  description="Where you study or teach."
                >
                  <Field
                    id="su-institute"
                    label="Institute name"
                    type="text"
                    value={form.instituteName}
                    onChange={set("instituteName")}
                    error={errors.instituteName}
                  />

                  <Select
                    id="su-institute-type"
                    label="Institute type"
                    placeholder="Select"
                    value={form.instituteType}
                    onChange={set("instituteType")}
                    options={INSTITUTE_TYPES}
                    error={errors.instituteType}
                  />

                  <div className="su-row">
                    <Field
                      id="su-faculty"
                      label="Faculty (optional)"
                      type="text"
                      value={form.faculty}
                      onChange={set("faculty")}
                    />

                    <Field
                      id="su-department"
                      label="Department (optional)"
                      type="text"
                      value={form.department}
                      onChange={set("department")}
                    />
                  </div>
                </Section>
              </div>

              {/* STEP 3: EDUCATION + TERMS */}

              <div className={`su-panel${step === 2 ? " is-active" : ""}`}>
                <Section
                  title="Education details"
                  description="Your current level of study."
                >
                  <Select
                    id="su-level"
                    label="Education level"
                    placeholder="Select"
                    value={form.educationLevel}
                    onChange={set("educationLevel")}
                    options={EDUCATION_LEVELS}
                    error={errors.educationLevel}
                  />

                  <div className="su-row">
                    <Field
                      id="su-grade"
                      label="Year / grade (optional)"
                      type="text"
                      value={form.currentYearOrGrade}
                      onChange={set("currentYearOrGrade")}
                    />

                    <Field
                      id="su-study"
                      label="Field of study (optional)"
                      type="text"
                      value={form.fieldOfStudy}
                      onChange={set("fieldOfStudy")}
                    />
                  </div>
                </Section>

                {/* FORM ERROR */}

                {errors.form && (
                  <p className="su-error" role="alert">
                    {errors.form}
                  </p>
                )}

                {/* TERMS */}

                <label className="su-check">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => {
                      setAgree(e.target.checked);
                      setErrors((previous) => ({ ...previous, form: "" }));
                    }}
                  />

                  <span>
                    I agree to the{" "}
                    <a className="su-link" href="#terms">
                      Terms of Use
                    </a>{" "}
                    and{" "}
                    <a className="su-link" href="#privacy">
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* NAVIGATION */}

          <div className="su-actions">
            {step > 0 && (
              <button
                type="button"
                className="su-button secondary"
                onClick={() => goTo(step - 1)}
              >
                Back
              </button>
            )}

            <button
              type="submit"
              className="su-button"
              disabled={step === LAST_STEP && (!agree || loading)}
            >
              {step < LAST_STEP
                ? "Continue"
                : loading
                  ? "Creating account..."
                  : "Create account"}
            </button>
          </div>
        </form>

        <hr className="su-divider" />

        <p className="su-small">
          Already have an account?{" "}
          <Link className="su-link" to="/signin">
            Sign in
          </Link>
        </p>
      </main>

      <footer className="su-footer">
        <span>Copyright © 2026 Your Company. All rights reserved.</span>

        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms of Use</a>
        <a href="#support">Support</a>
      </footer>
    </div>
  );
}

export default SignUp;
