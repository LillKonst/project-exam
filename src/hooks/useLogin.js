// import { useState } from "react";

// const useLogin = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [accessToken, setAccessToken] = useState(null);
//   // const baseURL = process.env.REACT_APP_BASEURL;

//   const login = async (email, password) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_APP_BASEURL}auth/login`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "X-Noroff-API-Key": import.meta.env.VITE_APP_API_KEY,
//           },
//           body: JSON.stringify({ email, password }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Login failed");
//       }

//       const data = await response.json();
//       console.log("API Response Data:", data);

//       const accessToken = data.data.accessToken;
//       setAccessToken(accessToken);
//       localStorage.setItem("accessToken", accessToken);

//       console.log("Login successful:", data);
//       console.log("Access Token:", accessToken);

//       if (onLoginSuccess) {
//         // Kall callback hvis den er definert
//         onLoginSuccess(); // Kall på callback-funksjonen
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { login, loading, error, accessToken };
// };

// export default useLogin;

// import { useMutation } from "@tanstack/react-query";
// import { useAuth } from "../context/AuthContext";
// import { useState } from "react";

// export default function useLogin() {
//   const { login } = useAuth();
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [accessToken, setAccessToken] = useState(null);

//   const mutation = useMutation({
//     mutationFn: async (credentials) => {
//       setLoading(true);
//       const response = await fetch(
//         `${import.meta.env.VITE_APP_BASEURL}auth/login`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "X-Noroff-API-Key": import.meta.env.VITE_APP_API_KEY,
//           },
//           body: JSON.stringify(credentials),
//         }
//       );

//       if (!response.ok) throw new Error("Login failed");
//       const data = await response.json();
//       setAccessToken(data.data.accessToken);
//       localStorage.setItem("accessToken", data.data.accessToken);
//       return data;
//     },
//     onSuccess: (data) => {
//       login(data.user);
//       setAccessToken(data.data.accessToken);
//       localStorage.setItem("accessToken", data.data.accessToken);
//       setLoading(false);
//       setError(null);
//     },
//     onError: (err) => {
//       setError(err.message);
//       setLoading(false);
//     },
//   });

//   return { login: mutation.mutate, loading, error, accessToken };
// }

import { useMutation } from "@tanstack/react-query";

const useLogin = () => {
  return useMutation(async (credentials) => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BASEURL}auth/login`,
      {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
          "X-Noroff-API-Key": import.meta.env.VITE_APP_API_KEY,
        },
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Login failed: ${errorText}`);
    }
    return response.json();
  });
};

export default useLogin;
