import React, { useState } from "react";

const css = `
.su-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  color: #1d1d1f;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text",
    "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.su-main {
  flex: 1;
  width: 100%;
  max-width: 460px;
  padding: 80px 24px 48px;
  box-sizing: border-box;
  text-align: center;
}
.su-logo { font-size: 44px; line-height: 1; margin-bottom: 28px; }
.su-title {
  font-size: 32px;
  line-height: 1.125;
  font-weight: 600;
  letter-spacing: 0.004em;
  margin: 0 0 12px;
}
.su-sub { font-size: 17px; color: #6e6e73; margin: 0 0 32px; line-height: 1.4; }
.su-row { display: flex; gap: 12px; }
.su-row .su-field { flex: 1; min-width: 0; }
.su-field { position: relative; margin-bottom: 12px; text-align: left; }
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
.su-input:hover { border-color: #86868b; }
.su-input:focus {
  border-color: #0071e3;
  box-shadow: 0 0 0 4px rgba(0, 125, 250, 0.25);
}
.su-input.error { border-color: #e30000; }
.su-input.error:focus { box-shadow: 0 0 0 4px rgba(227, 0, 0, 0.18); }
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
.su-toggle:hover { text-decoration: underline; }
.su-toggle:focus-visible { outline: 2px solid #0071e3; outline-offset: 2px; border-radius: 2px; }
.su-input.has-toggle { padding-right: 64px; }
.su-meter { display: flex; gap: 4px; margin: 0 2px 6px; }
.su-meter span { flex: 1; height: 4px; border-radius: 2px; background: #e8e8ed; transition: background 0.2s; }
.su-hint { font-size: 13px; color: #6e6e73; text-align: left; margin: 0 4px 12px; line-height: 1.4; }
.su-error { color: #e30000; font-size: 14px; text-align: left; margin: 0 4px 12px; }
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
.su-check input { width: 16px; height: 16px; margin: 2px 0 0; accent-color: #0071e3; flex-shrink: 0; }
.su-link {
  color: #0066cc;
  text-decoration: none;
  background: none;
  border: 0;
  padding: 0;
  font: inherit;
  cursor: pointer;
}
.su-link:hover { text-decoration: underline; }
.su-link:focus-visible { outline: 2px solid #0071e3; outline-offset: 2px; border-radius: 2px; }
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
.su-button:hover:not(:disabled) { background: #0077ed; }
.su-button:active:not(:disabled) { background: #006edb; }
.su-button:disabled { opacity: 0.4; cursor: default; }
.su-button:focus-visible { outline: 2px solid #0071e3; outline-offset: 3px; }
.su-divider { height: 1px; background: #d2d2d7; margin: 36px 0 24px; border: 0; }
.su-small { font-size: 14px; color: #6e6e73; margin: 0; }
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
.su-footer a { color: #424245; text-decoration: none; }
.su-footer a:hover { text-decoration: underline; }
@media (max-width: 480px) {
  .su-main { padding-top: 48px; }
  .su-title { font-size: 28px; }
  .su-row { flex-direction: column; gap: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .su-input, .su-label, .su-button, .su-meter span { transition: none; }
}
`;

const STRENGTH_COLORS = ["#e30000", "#ff9f0a", "#30b350", "#248a3d"];
const STRENGTH_LABELS = ["Too weak", "Fair", "Good", "Strong"];

function strengthOf(pw) {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw) || pw.length >= 14) score++;
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
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const strength = strengthOf(form.password);

  const validate = () => {
    const next = {};
    if (!form.firstName.trim()) next.firstName = "Enter your first name.";
    if (!form.lastName.trim()) next.lastName = "Enter your last name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      next.email = "Enter a valid email address.";
    if (form.password.length < 8) next.password = "Use at least 8 characters.";
    if (form.confirm !== form.password) next.confirm = "Passwords don’t match.";
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    try {
      // TODO: replace with your real sign-up request
      await new Promise((r) => setTimeout(r, 900));
      console.log("Account created", { ...form, password: undefined });
    } catch {
      setErrors({ form: "We couldn’t create your account. Try again." });
    } finally {
      setLoading(false);
    }
  };

  const firstError =
    errors.firstName ||
    errors.lastName ||
    errors.email ||
    errors.password ||
    errors.confirm ||
    errors.form;

  return (
    <div className="su-page">
      <style>{css}</style>

      <main className="su-main">
        <div className="su-logo" aria-hidden="true"></div>
        <h1 className="su-title">Create your account</h1>
        <p className="su-sub">
          One account for everything. Set up takes about a minute.
        </p>

        <form onSubmit={handleSubmit} noValidate>
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
              onClick={() => setShowPw((s) => !s)}
              aria-pressed={showPw}
            >
              {showPw ? "Hide" : "Show"}
            </button>
          </Field>

          {form.password && (
            <>
              <div className="su-meter" aria-hidden="true">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    style={
                      i < strength
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

          {!form.password && (
            <p className="su-hint">
              Use 8 or more characters with a mix of letters, numbers and
              symbols.
            </p>
          )}

          {firstError && (
            <p className="su-error" role="alert">
              {firstError}
            </p>
          )}

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

          <button
            type="submit"
            className="su-button"
            disabled={!agree || loading}
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <hr className="su-divider" />
        <p className="su-small">
          Already have an account?{" "}
          <a className="su-link" href="/signin">
            Sign in
          </a>
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
