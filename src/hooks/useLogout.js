function useLogout() {
  const { logout } = useAuth();

  return () => {
    logout(); // Oppdater Context
    localStorage.removeItem("accessToken"); // Rydde opp
  };
}
