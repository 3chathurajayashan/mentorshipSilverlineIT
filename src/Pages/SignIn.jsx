import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const css = `
/* SF Pro is Apple's own font and only exists on Apple devices.
   Inter is the closest open match, so every other device gets it instead. */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

.si-page {
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

.si-main {
  flex: 1;
  width: 100%;
  max-width: 420px;
  padding: 96px 24px 56px;
  box-sizing: border-box;
  text-align: center;
}

.si-mark {
  width: 48px;
  height: 48px;
  margin: 0 auto 24px;
  color: #1d1d1f;
}

.si-title {
  font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Inter",
    "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 40px;
  line-height: 1.1;
  font-weight: 600;
  letter-spacing: -0.022em;
  margin: 0 0 12px;
}

.si-sub {
  font-size: 17px;
  line-height: 1.4;
  color: #6e6e73;
  margin: 0 0 36px;
}

/* Fields */

.si-field {
  position: relative;
  margin-bottom: 12px;
  text-align: left;
}

.si-input {
  width: 100%;
  box-sizing: border-box;
  height: 56px;
  padding: 22px 56px 6px 16px;
  font: inherit;
  font-size: 17px;
  color: #1d1d1f;
  background: #fff;
  border: 1px solid #d2d2d7;
  border-radius: 12px;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.si-input:hover {
  border-color: #86868b;
}

.si-input:focus {
  border-color: #0071e3;
  box-shadow: 0 0 0 4px rgba(0, 125, 250, 0.25);
}

.si-input.error {
  border-color: #e30000;
}

.si-input.error:focus {
  box-shadow: 0 0 0 4px rgba(227, 0, 0, 0.18);
}

.si-input[readonly] {
  color: #6e6e73;
  background: #f5f5f7;
}

.si-label {
  position: absolute;
  left: 17px;
  top: 17px;
  font-size: 17px;
  color: #86868b;
  pointer-events: none;
  transform-origin: left top;
  transition: transform 0.15s;
}

.si-input:focus + .si-label,
.si-input:not(:placeholder-shown) + .si-label {
  transform: translateY(-9px) scale(0.76);
}

/* Circular continue button inside the field */

.si-arrow {
  position: absolute;
  right: 12px;
  top: 12px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #86868b;
  background: transparent;
  color: #86868b;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}

.si-arrow.ready {
  background: #0071e3;
  border-color: #0071e3;
  color: #fff;
}

.si-arrow:focus-visible {
  outline: 2px solid #0071e3;
  outline-offset: 2px;
}

.si-arrow:disabled {
  cursor: default;
  opacity: 0.6;
}

/* Messages */

.si-error {
  color: #e30000;
  font-size: 14px;
  text-align: left;
  margin: 4px 4px 12px;
}

.si-small {
  font-size: 14px;
  color: #6e6e73;
  margin: 0;
}

/* Remember me */

.si-check {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 16px 0 28px;
  font-size: 14px;
  color: #424245;
  cursor: pointer;
  user-select: none;
}

.si-check input {
  width: 16px;
  height: 16px;
  accent-color: #0071e3;
  margin: 0;
}

/* Links */

.si-link {
  color: #0066cc;
  font-size: 14px;
  text-decoration: none;
  background: none;
  border: 0;
  padding: 0;
  font-family: inherit;
  cursor: pointer;
}

.si-link:hover {
  text-decoration: underline;
}

.si-link:focus-visible {
  outline: 2px solid #0071e3;
  outline-offset: 2px;
  border-radius: 2px;
}

.si-link:disabled {
  opacity: 0.5;
  cursor: default;
  text-decoration: none;
}

.si-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.si-divider {
  height: 1px;
  background: #d2d2d7;
  margin: 40px 0 24px;
  border: 0;
}

/* Footer */

.si-footer {
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

.si-footer a {
  color: #424245;
  text-decoration: none;
}

.si-footer a:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .si-main {
    padding-top: 56px;
  }

  .si-title {
    font-size: 32px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .si-input,
  .si-label,
  .si-arrow {
    transition: none;
  }
}
`;

const Arrow = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M3 8h10M9 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [step, setStep] = useState("email");

  const [remember, setRemember] = useState(true);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailValid = /^\S+@\S+\.\S+$/.test(email.trim());

  const handleEmail = (e) => {
    e.preventDefault();

    if (!emailValid) {
      setError("Enter a valid email address.");
      return;
    }

    setError("");
    setStep("password");
  };

  const handlePassword = async (e) => {
    e.preventDefault();

    if (!password.trim()) {
      setError("Enter your password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Send credentials to the backend through AuthContext.
      const response = await login({
        email: email.trim().toLowerCase(),
        password,
      });

      if (!response?.success || !response?.user) {
        throw new Error(response?.message || "Unable to sign in.");
      }

      // Redirect according to the authenticated user's role.
      const dashboardRoutes = {
        STUDENT: "/student-dashboard",
        TUTOR: "/tutor-dashboard",
        ADMIN: "/admin-dashboard",
      };

      const destination = dashboardRoutes[response.user.role] || "/";

      navigate(destination, { replace: true });
    } catch (err) {
      setError(
        err.message || "Your email or password is incorrect. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEmail = () => {
    setStep("email");
    setPassword("");
    setError("");
  };

  return (
    <div className="si-page">
      <style>{css}</style>

      <main className="si-main">
        <svg
          className="si-mark"
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

        <h1 className="si-title">Sign in</h1>

        <p className="si-sub">
          {step === "email"
            ? "Use your email to continue."
            : "Enter your password to continue."}
        </p>

        <form
          onSubmit={step === "email" ? handleEmail : handlePassword}
          noValidate
        >
          {/* EMAIL FIELD */}

          <div className="si-field">
            <input
              id="si-email"
              className={`si-input${error && step === "email" ? " error" : ""}`}
              type="email"
              autoComplete="username"
              placeholder=" "
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              readOnly={step === "password"}
              aria-invalid={!!error && step === "email"}
              autoFocus
            />

            <label className="si-label" htmlFor="si-email">
              Email
            </label>

            {step === "email" && (
              <button
                type="submit"
                className={`si-arrow${email ? " ready" : ""}`}
                aria-label="Continue"
                disabled={!email}
              >
                <Arrow />
              </button>
            )}
          </div>

          {/* PASSWORD FIELD */}

          {step === "password" && (
            <div className="si-field">
              <input
                id="si-password"
                className={`si-input${error ? " error" : ""}`}
                type="password"
                autoComplete="current-password"
                placeholder=" "
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                aria-invalid={!!error}
                autoFocus
              />

              <label className="si-label" htmlFor="si-password">
                Password
              </label>

              <button
                type="submit"
                className={`si-arrow${password && !loading ? " ready" : ""}`}
                aria-label="Sign in"
                disabled={!password || loading}
              >
                <Arrow />
              </button>
            </div>
          )}

          {/* ERROR MESSAGE */}

          {error && (
            <p className="si-error" role="alert">
              {error}
            </p>
          )}

          {/* REMEMBER ME */}

          <label className="si-check">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Keep me signed in
          </label>

          {/* LOADING MESSAGE */}

          {loading && (
            <p className="si-small" aria-live="polite">
              Signing you in...
            </p>
          )}
        </form>

        <div className="si-links">
          {step === "password" && (
            <button
              type="button"
              className="si-link"
              onClick={handleChangeEmail}
              disabled={loading}
            >
              Use a different email
            </button>
          )}

          <a className="si-link" href="#forgot">
            Forgot password?
          </a>
        </div>

        <hr className="si-divider" />

        <p className="si-small">
          Don't have an account?{" "}
          <Link
            className="si-link"
            to="/signup"
            style={{ fontSize: "inherit" }}
          >
            Create yours now
          </Link>
        </p>
      </main>

      <footer className="si-footer">
        <span>Copyright © 2026 Your Company. All rights reserved.</span>

        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms of Use</a>
        <a href="#support">Support</a>
      </footer>
    </div>
  );
}

export default SignIn;
