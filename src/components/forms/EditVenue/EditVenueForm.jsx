import { useState, useEffect } from "react";
import UpdateGallery from "./UpdateGallery";

export default function UpdateVenueForm({
  initialData = {},
  onSubmit,
  buttonText = "Submit",
}) {
  const [maxGuests] = useState(20);
  const [guests, setGuests] = useState(initialData.maxGuests || 1);
  const [images, setImages] = useState(initialData.media || []);
  const [currentImage, setCurrentImage] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [formState, setFormState] = useState({
    title: initialData.name || "",
    description: initialData.description || "",
    address: initialData.location?.address || "",
    city: initialData.location?.city || "",
    country: initialData.location?.country || "",
    price: initialData.price || "",
    wifi: initialData.meta?.wifi || false,
    parking: initialData.meta?.parking || false,
    breakfast: initialData.meta?.breakfast || false,
    pets: initialData.meta?.pets || false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: formState.title,
      description: formState.description,
      location: {
        address: formState.address,
        city: formState.city,
        country: formState.country,
      },
      media: images.map((img) => ({
        url: img.url || img,
        alt: img.alt || "Uploaded image",
      })),
      price: parseFloat(formState.price),
      maxGuests: guests,
      meta: {
        wifi: formState.wifi,
        parking: formState.parking,
        breakfast: formState.breakfast,
        pets: formState.pets,
      },
    };
    console.log("Form data being submitted:", formData);
    onSubmit(formData);
  };

  return (
    <div className="m-2 md:m-5 lg:m-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between w-full"
      >
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col w-full max-w-[500px] mx-2">
            <h2 className="secondFont text-3xl mb-2">Venue Info: </h2>
            <div className="flex flex-col">
              <label htmlFor="title" className="mx-2 my-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formState.title}
                onChange={handleInputChange}
                className="border rounded-lg p-2 w-full mb-3"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="mx-2 my-1">
                Description
              </label>
              <textarea
                type="text"
                name="description"
                id="description"
                rows="5"
                value={formState.description}
                onChange={handleInputChange}
                className="border rounded-lg p-2 w-full mb-3"
              />
            </div>

            <div className="flex gap-2">
              <div className="flex flex-col">
                <label htmlFor="guests" className="mx-2 my-1">
                  Max Guests
                </label>
                <select
                  name="guests"
                  id="guests"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="p-2 w-fit rounded focus:outline-none"
                >
                  {[...Array(maxGuests)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="price" className="mx-2 my-1">
                  Price per night
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={formState.price}
                  onChange={handleInputChange}
                  className="border rounded-lg p-2 w-full mb-3"
                />
              </div>
            </div>

            <div className="m-2">
              <h3 className="secondFont text-3xl mb-2">This place offers:</h3>
              <div>
                <input
                  type="checkbox"
                  name="wifi"
                  id="wifi"
                  checked={formState.wifi}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="wifi" className="text-sm font-medium">
                  WIFI
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="parking"
                  id="parking"
                  checked={formState.parking}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="parking" className="text-sm font-medium">
                  Parking
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="breakfast"
                  id="breakfast"
                  checked={formState.breakfast}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="breakfast" className="text-sm font-medium">
                  Breakfast
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="pets"
                  id="pets"
                  checked={formState.pets}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="pets" className="text-sm font-medium">
                  Pets allowed
                </label>
              </div>
            </div>

            <div>
              <h2 className="secondFont text-3xl mb-2">Location:</h2>
              <div className="flex flex-col">
                <label htmlFor="address" className="mx-2 my-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formState.address}
                  onChange={handleInputChange}
                  className="mb-3 border rounded-lg p-2 w-full"
                />
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col w-full">
                  <label htmlFor="city" className="mx-2 my-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={formState.city}
                    onChange={handleInputChange}
                    className="mb-3 border rounded-lg p-2 w-full"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="zip" className="mx-2 my-1">
                    Zip
                  </label>
                  <input
                    type="number"
                    name="zip"
                    id="zip"
                    value={formState.zip}
                    onChange={handleInputChange}
                    className="mb-3 border rounded-lg p-2 w-full"
                  />
                </div>
              </div>

              <div className="flex gap-2 w-full">
                <div className="flex flex-col w-full">
                  <label htmlFor="country" className="mx-2 my-1">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    value={formState.country}
                    onChange={handleInputChange}
                    className="mb-3 border rounded-lg p-2 w-full"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="continent" className="mx-2 my-1">
                    Continent
                  </label>
                  <input
                    type="text"
                    name="continent"
                    id="continent"
                    value={formState.continent}
                    onChange={handleInputChange}
                    className="mb-3 border rounded-lg p-2 w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <UpdateGallery
            images={images}
            setImages={setImages}
            currentImage={currentImage}
            setCurrentImage={setCurrentImage}
            selectedImageIndex={selectedImageIndex}
            setSelectedImageIndex={setSelectedImageIndex}
          />
        </div>
        <button
          type="submit"
          className="bg-customRed shadow-sm text-customWhite px-4 w-fit py-2 rounded-lg font-medium mx-2 mb-5"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}
