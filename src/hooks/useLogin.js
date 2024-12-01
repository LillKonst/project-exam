import { useMutation } from "@tanstack/react-query";

const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials) => {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BASEURL}auth/login?_holidaze=true`,
        {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json",
            "X-Noroff-API-Key": import.meta.env.VITE_APP_API_KEY,
          },
        },
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Login failed: ${errorText}`);
      }
      return response.json();
    },
  });
};

export default useLogin;
