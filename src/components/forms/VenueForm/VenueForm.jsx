import UploadGallery from "./UploadGallery";
import { useState } from "react";

export default function VenueForm({ onSubmit, buttonText = "Submit", initialData = {}, }) {
  const [maxGuests] = useState(20);
  const [guests, setGuests] = useState(1);
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.title.value,
      description: e.target.description.value,
      media: images.map((url) => ({
        url,
        alt: "Uploaded image",
      })),
      price: parseFloat(e.target.price.value),
      maxGuests: guests,
      meta: {
        wifi: e.target.wifi.checked,
        parking: e.target.parking.checked,
        breakfast: e.target.breakfast.checked,
        pets: e.target.pets.checked,
      },
      location: {
        address: e.target.address.value,
        city: e.target.city.value,
        country: e.target.country.value,
      },
    };

    // Pass the form data to the parent component
    onSubmit(formData);
  };

  return (
    <div className="m-10 px-10">
      <form onSubmit={handleFormSubmit} className="flex flex-col justify-between w-full">
        <div className="flex">
          <div className="flex flex-col w-full mx-2">
            <div>
              <label htmlFor="title" className="mx-2 my-1">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                className="border rounded-lg p-2 w-full mb-3"
              />
            </div>
            <div>
              <label htmlFor="address" className="mx-2 my-1">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                className="mb-3 border rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="city" className="mx-2 my-1">City</label>
              <input
                type="text"
                name="city"
                id="city"
                className="mb-3 border rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="country" className="mx-2 my-1">Country</label>
              <input
                type="text"
                name="country"
                id="country"
                className="mb-3 border rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="description" className="mx-2 my-1">Description</label>
              <textarea
                type="text"
                name="description"
                id="description"
                rows="5"
                className="border rounded-lg p-2 w-full mb-3"
              />
            </div>
            <div className="m-2">
              <h3 className="text-lg">This place offers:</h3>
              <div>
                <input type="checkbox" name="wifi" id="wifi" className="mr-2" />
                <label htmlFor="wifi" className="text-sm font-medium">WIFI</label>
              </div>
              <div>
                <input type="checkbox" name="parking" id="parking" className="mr-2" />
                <label htmlFor="parking" className="text-sm font-medium">Parking</label>
              </div>
              <div>
                <input type="checkbox" name="breakfast" id="breakfast" className="mr-2" />
                <label htmlFor="breakfast" className="text-sm font-medium">Breakfast</label>
              </div>
              <div>
                <input type="checkbox" name="pets" id="pets" className="mr-2" />
                <label htmlFor="pets" className="text-sm font-medium">Pets allowed</label>
              </div>
              <div>
                <label htmlFor="guests">Max Guests</label>
                <select
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
              <div>
                <label htmlFor="price" className="mx-2 my-1">Price per night</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="border rounded-lg p-2 w-full mb-3"
                />
              </div>
            </div>
          </div>
          <UploadGallery
            images={images}
            setImages={setImages}
            currentImage={currentImage}
            setCurrentImage={setCurrentImage}
            selectedImageIndex={selectedImageIndex}
            setSelectedImageIndex={setSelectedImageIndex}
          />
        </div>
        <button type="submit" className="bg-yellow-300 p-2 w-fit rounded m-2">
          {buttonText}
        </button>
      </form>
    </div>
  );
}