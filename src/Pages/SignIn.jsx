import React, { useState } from "react";

const css = `
.si-page {
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
.si-main {
  flex: 1;
  width: 100%;
  max-width: 420px;
  padding: 96px 24px 48px;
  box-sizing: border-box;
  text-align: center;
}
.si-logo { font-size: 44px; line-height: 1; margin-bottom: 28px; }
.si-title {
  font-size: 32px;
  line-height: 1.125;
  font-weight: 600;
  letter-spacing: 0.004em;
  margin: 0 0 32px;
}
.si-field { position: relative; margin-bottom: 12px; text-align: left; }
.si-input {
  width: 100%;
  box-sizing: border-box;
  height: 56px;
  padding: 22px 52px 6px 16px;
  font: inherit;
  font-size: 17px;
  color: #1d1d1f;
  background: #fff;
  border: 1px solid #d2d2d7;
  border-radius: 12px;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.si-input:hover { border-color: #86868b; }
.si-input:focus {
  border-color: #0071e3;
  box-shadow: 0 0 0 4px rgba(0, 125, 250, 0.25);
}
.si-input.error { border-color: #e30000; }
.si-label {
  position: absolute;
  left: 17px;
  top: 17px;
  font-size: 17px;
  color: #86868b;
  pointer-events: none;
  transform-origin: left top;
  transition: transform 0.15s, color 0.15s;
}
.si-input:focus + .si-label,
.si-input:not(:placeholder-shown) + .si-label {
  transform: translateY(-9px) scale(0.76);
}
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
.si-arrow.ready { background: #0071e3; border-color: #0071e3; color: #fff; }
.si-arrow:focus-visible { outline: 2px solid #0071e3; outline-offset: 2px; }
.si-arrow:disabled { cursor: default; }
.si-error { color: #e30000; font-size: 14px; text-align: left; margin: 4px 4px 12px; }
.si-check {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 16px 0 24px;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
}
.si-check input { width: 16px; height: 16px; accent-color: #0071e3; margin: 0; }
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
.si-link:hover { text-decoration: underline; }
.si-link:focus-visible { outline: 2px solid #0071e3; outline-offset: 2px; border-radius: 2px; }
.si-links { display: flex; flex-direction: column; gap: 12px; align-items: center; }
.si-divider { height: 1px; background: #d2d2d7; margin: 40px 0 24px; border: 0; }
.si-small { font-size: 14px; color: #6e6e73; }
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
.si-footer a { color: #424245; text-decoration: none; }
.si-footer a:hover { text-decoration: underline; }
@media (max-width: 480px) {
  .si-main { padding-top: 56px; }
  .si-title { font-size: 28px; }
}
@media (prefers-reduced-motion: reduce) {
  .si-input, .si-label, .si-arrow { transition: none; }
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState("email"); // "email" | "password"
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailValid = /^\S+@\S+\.\S+$/.test(email);

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
    if (!password) return;
    setLoading(true);
    setError("");
    try {
      // TODO: replace with your real authentication call
      await new Promise((r) => setTimeout(r, 800));
      console.log("Signed in", { email, remember });
    } catch {
      setError("Your email or password is incorrect. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="si-page">
      <style>{css}</style>

      <main className="si-main">
        <div className="si-logo" aria-hidden="true"></div>
        <h1 className="si-title">Sign in</h1>

        <form
          onSubmit={step === "email" ? handleEmail : handlePassword}
          noValidate
        >
          <div className="si-field">
            <input
              id="si-email"
              className={`si-input${error && step === "email" ? " error" : ""}`}
              type="email"
              autoComplete="username"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={step === "password"}
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

          {step === "password" && (
            <div className="si-field">
              <input
                id="si-password"
                className={`si-input${error ? " error" : ""}`}
                type="password"
                autoComplete="current-password"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {error && (
            <p className="si-error" role="alert">
              {error}
            </p>
          )}

          <label className="si-check">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Keep me signed in
          </label>
        </form>

        <div className="si-links">
          {step === "password" && (
            <button
              type="button"
              className="si-link"
              onClick={() => {
                setStep("email");
                setPassword("");
                setError("");
              }}
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
          Don’t have an account?{" "}
          <a className="si-link" href="/signup" style={{ fontSize: "inherit" }}>
            Create yours now
          </a>
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
