import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const css = `
.su-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  color: #1d1d1f;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display",
    "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.su-main {
  flex: 1;
  width: 100%;
  max-width: 460px;
  padding: 65px 24px 48px;
  box-sizing: border-box;
  text-align: center;
}

.su-logo {
  font-size: 44px;
  line-height: 1;
  margin-bottom: 28px;
}

.su-title {
  font-size: 32px;
  line-height: 1.125;
  font-weight: 600;
  letter-spacing: 0.004em;
  margin: 0 0 12px;
}

.su-sub {
  font-size: 17px;
  color: #6e6e73;
  margin: 0 0 32px;
  line-height: 1.4;
}

.su-row {
  display: flex;
  gap: 12px;
}

.su-row .su-field {
  flex: 1;
  min-width: 0;
}

.su-field {
  position: relative;
  margin-bottom: 12px;
  text-align: left;
}

.su-input {
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

.su-input:hover {
  border-color: #86868b;
}

.su-input:focus {
  border-color: #0071e3;
  box-shadow: 0 0 0 4px rgba(0, 125, 250, 0.25);
}

.su-input.error {
  border-color: #e30000;
}

.su-input.error:focus {
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

.su-input.has-toggle {
  padding-right: 64px;
}

.su-meter {
  display: flex;
  gap: 4px;
  margin: 0 2px 6px;
}

.su-meter span {
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: #e8e8ed;
  transition: background 0.2s;
}

.su-hint {
  font-size: 13px;
  color: #6e6e73;
  text-align: left;
  margin: 0 4px 12px;
  line-height: 1.4;
}

.su-error {
  color: #e30000;
  font-size: 14px;
  text-align: left;
  margin: 0 4px 12px;
}

.su-success {
  color: #248a3d;
  font-size: 14px;
  text-align: left;
  margin: 0 4px 12px;
}

.su-check {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 20px 0 24px;
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
  height: 48px;
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

.su-button:disabled {
  opacity: 0.4;
  cursor: default;
}

.su-divider {
  height: 1px;
  background: #d2d2d7;
  margin: 36px 0 24px;
  border: 0;
}

.su-small {
  font-size: 14px;
  color: #6e6e73;
  margin: 0;
}

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

.su-section-title {
  text-align: left;
  font-size: 17px;
  font-weight: 600;
  margin: 28px 0 14px;
}

.su-select {
  width: 100%;
  box-sizing: border-box;
  height: 56px;
  padding: 0 16px;
  font: inherit;
  font-size: 16px;
  color: #1d1d1f;
  background: #fff;
  border: 1px solid #d2d2d7;
  border-radius: 12px;
  outline: none;
  margin-bottom: 12px;
}

.su-select:focus {
  border-color: #0071e3;
  box-shadow: 0 0 0 4px rgba(0, 125, 250, 0.25);
}

@media (max-width: 480px) {
  .su-main {
    padding-top: 48px;
  }

  .su-title {
    font-size: 28px;
  }

  .su-row {
    flex-direction: column;
    gap: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .su-input,
  .su-label,
  .su-button,
  .su-meter span {
    transition: none;
  }
}
`;

const STRENGTH_COLORS = ["#e30000", "#ff9f0a", "#30b350", "#248a3d"];

const STRENGTH_LABELS = ["Too weak", "Fair", "Good", "Strong"];

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
        className={`su-input${error ? " error" : ""}${children ? " has-toggle" : ""}`}
        placeholder=" "
        aria-invalid={!!error}
        {...props}
      />

      <label className="su-label" htmlFor={id}>
        {label}
      </label>

      {children}
    </div>
  );
}

function SignUp() {
  const { signup } = useAuth();
  const navigate = useNavigate();

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

    if (
      !["SCHOOL", "UNIVERSITY", "COLLEGE", "OTHER"].includes(form.instituteType)
    ) {
      next.instituteType = "Select your institute type.";
    }

    if (
      ![
        "PRIMARY",
        "SECONDARY",
        "O_LEVEL",
        "A_LEVEL",
        "DIPLOMA",
        "UNDERGRADUATE",
        "POSTGRADUATE",
        "OTHER",
      ].includes(form.educationLevel)
    ) {
      next.educationLevel = "Select your education level.";
    }

    if (!agree) {
      next.form = "Please agree to the Terms of Use and Privacy Policy.";
    }

    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const next = validate();

    setErrors(next);

    if (Object.keys(next).length > 0) {
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

  const firstError =
    errors.firstName ||
    errors.lastName ||
    errors.email ||
    errors.phone ||
    errors.password ||
    errors.confirm ||
    errors.instituteName ||
    errors.instituteType ||
    errors.educationLevel ||
    errors.form;

  return (
    <div className="su-page">
      <style>{css}</style>

      <main className="su-main">
        <div className="su-logo" aria-hidden="true">
          🎓
        </div>

        <h1 className="su-title">Create your account</h1>

        <p className="su-sub">
          One account for everything. Set up takes about a minute.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          {/* BASIC DETAILS */}

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

          {/* PASSWORD */}

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
                        ? {
                            background: STRENGTH_COLORS[strength - 1],
                          }
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

          {!form.password && (
            <p className="su-hint">
              Use 8 or more characters with a mix of letters, numbers and
              symbols.
            </p>
          )}

          {/* ACCOUNT TYPE */}

          <h3 className="su-section-title">Account type</h3>

          <select
            className="su-select"
            value={form.role}
            onChange={set("role")}
          >
            <option value="STUDENT">Student</option>
            <option value="TUTOR">Tutor</option>
          </select>

          {/* INSTITUTE DETAILS */}

          <h3 className="su-section-title">Institute details</h3>

          <Field
            id="su-institute"
            label="Institute name"
            type="text"
            value={form.instituteName}
            onChange={set("instituteName")}
            error={errors.instituteName}
          />

          <select
            className="su-select"
            value={form.instituteType}
            onChange={set("instituteType")}
          >
            <option value="">Select institute type</option>
            <option value="SCHOOL">School</option>
            <option value="UNIVERSITY">University</option>
            <option value="COLLEGE">College</option>
            <option value="OTHER">Other</option>
          </select>

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

          {/* EDUCATION DETAILS */}

          <h3 className="su-section-title">Education details</h3>

          <select
            className="su-select"
            value={form.educationLevel}
            onChange={set("educationLevel")}
          >
            <option value="">Select education level</option>
            <option value="PRIMARY">Primary</option>
            <option value="SECONDARY">Secondary</option>
            <option value="O_LEVEL">O/L</option>
            <option value="A_LEVEL">A/L</option>
            <option value="DIPLOMA">Diploma</option>
            <option value="UNDERGRADUATE">Undergraduate</option>
            <option value="POSTGRADUATE">Postgraduate</option>
            <option value="OTHER">Other</option>
          </select>

          <Field
            id="su-grade"
            label="Current year / grade (optional)"
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

          {/* ERROR MESSAGE */}

          {firstError && (
            <p className="su-error" role="alert">
              {firstError}
            </p>
          )}

          {/* TERMS */}

          <label className="su-check">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
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

          {/* SUBMIT */}

          <button
            type="submit"
            className="su-button"
            disabled={!agree || loading}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
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
