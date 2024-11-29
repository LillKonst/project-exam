import useLogin from "../../hooks/useLogin";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Login({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login: contextLogin } = useAuth();
  const { mutate, isLoading: loading, error } = useLogin();

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate(
      { email, password },
      {
        onSuccess: (data) => {
          contextLogin(data);
          localStorage.setItem("user", JSON.stringify(data));
          onClose();
          console.log("Login successful for:", email, "with response:", data);
        },
        onError: (error) => {
          console.error("Login error:", error);
        },
      },
    );
  };

  return (
    <form
      className="space-y-4 p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Login
      </h2>

      <div>
        <label htmlFor="email" className="block text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customRed"
          placeholder="Your email"
          autoComplete="email"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customRed"
          placeholder="Your password"
          autoComplete="current-password"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 mt-4 bg-customBlue text-white rounded-lg font-semibold hover:bg-blueHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blueHover"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <div style={{ color: "red" }}>Error: {error.message}</div>}
      </div>
    </form>
  );
}
