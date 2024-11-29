import { useState } from "react";
import useRegister from "../../hooks/useRegistration";
import useLogin from "../../hooks/useLogin";
import { useAuth } from "../../context/AuthContext";

export default function Register({ onClose, onRegisterSuccess }) {
  const { mutate: register, isLoading: isRegistering } = useRegister();
  const { mutate: login, isLoading: isLoggingIn } = useLogin();
  const { login: contextLogin } = useAuth(); // Use AuthContext for global login management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    venueManager: false,
  });

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    console.log(
      `Updated field ${name}:`,
      type === "checkbox" ? checked : value,
    );
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted with data:", formData);

    // Trigger the registration mutation
    register(
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        venueManager: formData.venueManager,
      },
      {
        onSuccess: (registerData) => {
          console.log("Registration successful. Data:", registerData);

          console.log("Attempting to log in with:", {
            email: formData.email,
            password: formData.password,
          });

          login(
            { email: formData.email, password: formData.password },
            {
              onSuccess: (loginData) => {
                console.log("Login successful. Data:", loginData);
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
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg relative"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        REGISTER
      </h2>

      <button
        type="button"
        onClick={onClose}
        className="absolute top-0 right-0 p-2 text-gray-700 rounded-lg font-semibold focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-x"
          viewBox="0 0 16 16"
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
        </svg>
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
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue"
          placeholder="********"
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
            className="h-4 w-4 text-customBlue focus:ring-customBlue border-gray-300 rounded"
          />
          <label htmlFor="venueManager" className="ml-2 text-gray-700">
            Register as Venue Manager
          </label>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-customBlue text-white rounded-lg font-semibold hover:bg-blueHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blueHover"
          disabled={isRegistering || isLoggingIn}
        >
          {isRegistering || isLoggingIn ? "Processing..." : "Register"}
        </button>
      </div>
    </form>
  );
}
