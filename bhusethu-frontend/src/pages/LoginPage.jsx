import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import { api } from "../api";
import bhusethuLogo from "../assets/images/bhusethu_logo.png";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = React.useState(false);

  const login = useMutation({
    mutationFn: (credentials) => api.post("/api/auth/login", credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate(location.state?.from || "/admin", { replace: true });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login.isPending) return;
    const fd = new FormData(e.currentTarget);
    login.mutate({
      email: String(fd.get("email") || "").trim(),
      password: String(fd.get("password") || ""),
    });
  };

  return (
    <main className="auth">
      <div className="auth__card">
        <Link className="auth__brand" to="/">
          <img src={bhusethuLogo} alt="" width="40" height="40" />
          Bhusethu <span>Admin</span>
        </Link>

        <span className="eyebrow">Admin access</span>
        <h1>Sign in to manage properties.</h1>
        <p className="auth__sub">
          Use your admin account to add properties and manage enquiries.
        </p>

        <form className="auth__form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="admin-email">Email address</label>
            <input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="username"
              placeholder="admin@bhusethu.com"
              pattern="[^\s@]+@[^\s@]+\.[^\s@]{2,}"
              title="Enter a valid email address"
              maxLength="254"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="admin-password">Password</label>
            <div className="auth__password">
              <input
                id="admin-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                className="auth__eye"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          {login.isError && <p className="form-alert">{login.error.message}</p>}
          <button
            className="btn btn-primary btn-block"
            type="submit"
            disabled={login.isPending}
          >
            {login.isPending ? "Signing in…" : "Login to admin portal"}
          </button>
        </form>

        <div className="auth__foot">
          <Link to="/">← Back to website</Link>
          <span>Authorised staff only.</span>
        </div>
      </div>
    </main>
  );
}
