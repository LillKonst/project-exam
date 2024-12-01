import { useCreateVenue } from "../../hooks/useCreateVenue";
import { useNavigate } from "react-router-dom";
import VenueForm from "../../components/forms/VenueForm/VenueForm";

export default function RegisterVenue() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const createdVenue = await useCreateVenue(formData);
      navigate("/profile");
    } catch (error) {
      console.error("Failed to create venue:", error.message);
    }
  };

  return (
    <div className="m-5 md:m-10">
      <h2 className="text-2xl mb-5">REGISTER VENUE</h2>
      <VenueForm onSubmit={handleSubmit} buttonText="Register Venue" />
    </div>
  );
}
