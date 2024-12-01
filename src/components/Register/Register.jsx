import { useState } from "react";
import useRegister from "../../hooks/useRegistration";
import useLogin from "../../hooks/useLogin";
import { useAuth } from "../../context/AuthContext";

export default function Register({ onClose, onRegisterSuccess, openLogin }) {
  const { mutate: register, isLoading: isRegistering } = useRegister();
  const { mutate: login, isLoading: isLoggingIn } = useLogin();
  const { login: contextLogin } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    venueManager: false,
  });
  const [emailError, setEmailError] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.email.endsWith("@stud.noroff.no")) {
      setEmailError(
        "Please use a valid email address that ends with @stud.noroff.no",
      );
      return;
    }

    setEmailError("");

    register(
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        venueManager: formData.venueManager,
      },
      {
        onSuccess: (registerData) => {
          login(
            { email: formData.email, password: formData.password },
            {
              onSuccess: (loginData) => {
                contextLogin(loginData);
                localStorage.setItem("user", JSON.stringify(loginData));
                onRegisterSuccess?.();
              },
              onError: (loginError) => {
                console.error("Login error after registration:", loginError);
              },
            },
          );
        },
        onError: (registerError) => {
          console.error("Registration error:", registerError);
        },
      },
    );
  };

  return (
    <div className="space-y-4 p-6 max-w-md mx-auto rounded-lg relative">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          REGISTER
        </h2>

        <button
          type="button"
          onClick={onClose}
          className="absolute text-2xl top-0 right-5 p-2 text-gray-700 rounded-lg font-semibold focus:outline-none"
        >
          ✕
        </button>

        <div>
          <label htmlFor="name" className="block text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue"
            placeholder="you@example.com"
            autoComplete="off"
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue"
            placeholder="********"
            autoComplete="off"
          />
        </div>

        <div className="flex mt-4 flex-col">
          <p>Would you like to register and manage your own venues?</p>
          <div className="flex items-center m-2">
            <input
              type="checkbox"
              id="venueManager"
              name="venueManager"
              checked={formData.venueManager}
              onChange={handleChange}
              className="h-4 w-4 text-customWhite rounded focus:ring-none focus:outline-none transition duration-200 ease-in-out"
            />
            <label htmlFor="venueManager" className="ml-2 text-gray-700">
              Register as Venue Manager
            </label>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-customRed text-white rounded-lg font-semibold hover:bg-hoverRed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blueHover"
            disabled={isRegistering || isLoggingIn}
          >
            {isRegistering || isLoggingIn ? "Processing..." : "Register"}
          </button>
        </div>
      </form>
      <div className="flex gap-1">
        <p>Already have an account?</p>
        <button onClick={openLogin} className="hover:underline">
          Login here
        </button>
      </div>
    </div>
  );
}
