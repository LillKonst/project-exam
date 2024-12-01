import { useUpdateVenue } from "../../hooks/useUpdateVenue";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchVenue from "../../hooks/useFetchVenue";
import UpdateVenueForm from "../../components/forms/EditVenue/EditVenueForm";

export default function EditVenue() {
  const { id } = useParams();
  const { data: venue, isLoading, isError } = useFetchVenue();
  const { updateVenue } = useUpdateVenue();
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (venue) {
      const normalizedMedia = venue.media.map((item) => ({
        url: item.url || item,
        alt: item.alt || "image",
      }));
      setImages(normalizedMedia);
    }
  }, [venue]);

  const handleSubmit = async (updatedData) => {
    const formData = {};

    if (updatedData.name !== venue.name) formData.name = updatedData.name;
    if (updatedData.description !== venue.description)
      formData.description = updatedData.description;
    if (updatedData.address !== venue.location?.address)
      formData.address = updatedData.address;
    if (updatedData.city !== venue.location?.city)
      formData.city = updatedData.city;
    if (updatedData.country !== venue.location?.country)
      formData.country = updatedData.country;
    if (updatedData.price !== venue.price) formData.price = updatedData.price;
    if (updatedData.guests !== venue.maxGuests)
      formData.maxGuests = updatedData.guests;
    if (updatedData.wifi !== venue.meta?.wifi) formData.wifi = updatedData.wifi;
    if (updatedData.parking !== venue.meta?.parking)
      formData.parking = updatedData.parking;
    if (updatedData.breakfast !== venue.meta?.breakfast)
      formData.breakfast = updatedData.breakfast;
    if (updatedData.pets !== venue.meta?.pets) formData.pets = updatedData.pets;

    const imagesHaveChanged =
      Array.isArray(updatedData.images) &&
      Array.isArray(venue.media) &&
      updatedData.images.some((image, index) => {
        return (
          image.url !== venue.media[index]?.url ||
          image.alt !== venue.media[index]?.alt
        );
      });

    if (imagesHaveChanged) {
      formData.media = updatedData.images.map((image) => ({
        url: image.url || image,
        alt: image.alt || "image",
      }));
    }

    try {
      const updatedVenue = await updateVenue(venue.id, updatedData);
    } catch (error) {
      console.error("Failed to update venue:", error.message);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !venue) {
    return <p>Error loading venue data</p>;
  }

  return (
    <div className="m-5 md:m-10">
      <h2 className="text-2xl mb-5">EDIT VENUE</h2>
      <UpdateVenueForm
        initialData={venue}
        images={images}
        setImages={setImages}
        onSubmit={handleSubmit}
        buttonText="Update Venue"
      />
    </div>
  );
}
