// import { useState, useEffect } from "react";
// import useFetchVenue from "../../hooks/useFetchVenue";
// import { useParams } from "react-router-dom";
// import UploadGallery from "../../components/forms/VenueForm/UploadGallery";
// import { useUpdateVenue } from "../../hooks/useUpdateVenue";

// export default function EditVenue() {
//   const { data: venue, isLoading, isError } = useFetchVenue();
//   const { id } = useParams();
//   const [newVenueData, setNewVenueData] = useState(null); 
//   const [initialData, setInitialData] = useState(null); 
//   const [images, setImages] = useState([]);
//   const [currentImage, setCurrentImage] = useState(""); 
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);


//   // Populate form data
//   useEffect(() => {
//     if (venue) {

//       const normalizedMedia = venue.media.map(item => item.url || item);
//       const initialFormData = {
//         name: venue.name || "",
//         description: venue.description || "",
//         address: venue.location?.address || "",
//         city: venue.location?.city || "",
//         country: venue.location?.country || "",
//         zip: venue.location?.zip || "",
//         lat: venue.location?.lat || "",
//         lng: venue.location?.lng || "",
//         maxGuests: venue.maxGuests || 1,
//         price: venue.price || 0,
//         wifi: venue.meta?.wifi || false,
//         parking: venue.meta?.parking || false,
//         breakfast: venue.meta?.breakfast || false,
//         pets: venue.meta?.pets || false,
//         media: normalizedMedia || [],
//       };
//       setNewVenueData(initialFormData);
//       setInitialData(initialFormData);
//       setImages(normalizedMedia);
//     }
//   }, [venue]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
  
//     setNewVenueData((prevData) => {
//       // Check if the field being updated belongs to `meta`
//       if (["wifi", "parking", "breakfast", "pets"].includes(name)) {
//         return {
//           ...prevData,
//           meta: {
//             ...prevData.meta, // Preserve other fields in `meta`
//             [name]: checked,  // Update the specific checkbox field
//           },
//         };
//       }
  
//       // Update other fields outside `meta`
//       return {
//         ...prevData,
//         [name]: type === "checkbox" ? checked : value,
//       };
//     });
//   };
  
  
  

//   const { updateVenue } = useUpdateVenue();  // Assuming this returns a function to trigger the update

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission behavior
  
//     const updatedFields = {};
  
//     // Compare form state with initial state to prepare the payload
//     if (JSON.stringify(newVenueData) !== JSON.stringify(initialData)) {
//       Object.keys(newVenueData).forEach((key) => {
//         if (newVenueData[key] !== initialData[key]) {
//           updatedFields[key] = newVenueData[key];
//         }
//       });
//     }
  
//     // Handle meta (checkboxes like wifi, parking)
//     if (
//       newVenueData.meta &&
//       JSON.stringify(newVenueData.meta) !== JSON.stringify(initialData.meta)
//     ) {
//       updatedFields.meta = {
//         wifi: newVenueData.meta?.wifi || false,
//         parking: newVenueData.meta?.parking || false,
//         breakfast: newVenueData.meta?.breakfast || false,
//         pets: newVenueData.meta?.pets || false,
//       };
//     }

//     if (!newVenueData.name) {
//       setError("Name is required.");
//       return;
//     }
    
//     if (newVenueData.price <= 0) {
//       setError("Price must be greater than 0.");
//       return;
//     }
    
//     if (newVenueData.maxGuests <= 0) {
//       setError("Max guests must be greater than 0.");
//       return;
//     }
    
    
    
  
//     // Validate if there are changes to send
//     if (Object.keys(updatedFields).length === 0) {
//       setError("No changes detected.");
//       return;
//     }
  
//     try {
//       console.log("Submitting updated fields:", updatedFields);
//       const response = await updateVenue(venue.id, updatedFields);
//       setNewVenueData(response); // Update local state her var det response.data
//       alert("Venue updated successfully!");
//     } catch (err) {
//       console.error("Failed to update venue:", err);
//       setError("An error occurred. Please try again.");
//     }
//   };
  
  

//   if (isLoading) return <p>Loading...</p>;
//   if (isError || !newVenueData) return <p>Error loading venue data.</p>;

//   return (
//     <div className="m-10 px-10">
//       <h2 className="text-2xl mb-5">EDIT VENUE</h2>
//       <form onSubmit={handleSubmit} className="flex flex-col justify-between w-full">
//         <div className="flex">
//           <div className="flex flex-col w-full mx-2">
//             <div>
//               <label htmlFor="title" className="mx-2 my-1">Title</label>
//               <input
//                 type="text"
//                 name="name"
//                 id="title"
//                 value={newVenueData.name}
//                 onChange={handleChange}
//                 className="border rounded-lg p-2 w-full mb-3"
//               />
//             </div>
//             <div>
//               <label htmlFor="address" className="mx-2 my-1">Address</label>
//               <input
//                 type="text"
//                 name="address"
//                 id="address"
//                 value={newVenueData.address}
//                 onChange={handleChange}
//                 className="mb-3 border rounded-lg p-2 w-full"
//               />
//             </div>
//             <div>
//               <label htmlFor="city" className="mx-2 my-1">City</label>
//               <input
//                 type="text"
//                 name="city"
//                 id="city"
//                 value={newVenueData.city}
//                 onChange={handleChange}
//                 className="mb-3 border rounded-lg p-2 w-full"
//               />
//             </div>
//             <div>
//               <label htmlFor="country" className="mx-2 my-1">Country</label>
//               <input
//                 type="text"
//                 name="country"
//                 id="country"
//                 value={newVenueData.country}
//                 onChange={handleChange}
//                 className="mb-3 border rounded-lg p-2 w-full"
//               />
//             </div>
//             <div>
//               <label htmlFor="description" className="mx-2 my-1">Description</label>
//               <textarea
//                 name="description"
//                 id="description"
//                 rows="5"
//                 value={newVenueData.description}
//                 onChange={handleChange}
//                 className="border rounded-lg p-2 w-full mb-3"
//               />
//             </div>
//             <div className="m-2">
//               <h3 className="text-lg">This place offers:</h3>
//               <div>
//                 <input
//                   type="checkbox"
//                   name="wifi"
//                   id="wifi"
//                   checked={newVenueData.wifi}
//                   onChange={handleChange}
//                   className="mr-2"
//                 />
//                 <label htmlFor="wifi" className="text-sm font-medium">WIFI</label>
//               </div>
//               <div>
//                 <input
//                   type="checkbox"
//                   name="parking"
//                   id="parking"
//                   checked={newVenueData.parking}
//                   onChange={handleChange}
//                   className="mr-2"
//                 />
//                 <label htmlFor="parking" className="text-sm font-medium">Parking</label>
//               </div>
//               <div>
//                 <input
//                   type="checkbox"
//                   name="breakfast"
//                   id="breakfast"
//                   checked={newVenueData.breakfast}
//                   onChange={handleChange}
//                   className="mr-2"
//                 />
//                 <label htmlFor="breakfast" className="text-sm font-medium">Breakfast</label>
//               </div>
//               <div>
//                 <input
//                   type="checkbox"
//                   name="pets"
//                   id="pets"
//                   checked={newVenueData.pets}
//                   onChange={handleChange}
//                   className="mr-2"
//                 />
//                 <label htmlFor="pets" className="text-sm font-medium">Pets allowed</label>
//               </div>
//               <div>
//                 <label htmlFor="guests" className="mx-2 my-1">Max Guests</label>
//                 <select
//                   id="guests"
//                   value={newVenueData.maxGuests}
//                   onChange={(e) => setNewVenueData({...newVenueData, maxGuests: Number(e.target.value)})}
//                   className="p-2 w-fit rounded focus:outline-none"
//                 >
//                   {[...Array(10)].map((_, i) => (
//                     <option key={i + 1} value={i + 1}>
//                       {i + 1}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label htmlFor="price" className="mx-2 my-1">Price per night</label>
//                 <input
//                   type="number"
//                   name="price"
//                   id="price"
//                   value={newVenueData.price}
//                   onChange={handleChange}
//                   className="border rounded-lg p-2 w-full mb-3"
//                 />
//               </div>
//             </div>
//           </div>
//           <UploadGallery 
//           images={images}
//           setImages={setImages}
//           currentImage={currentImage}
//           setCurrentImage={setCurrentImage}
//           selectedImageIndex={selectedImageIndex}
//           setSelectedImageIndex={setSelectedImageIndex}
//         />
//         </div>
//         <button type="submit" className="bg-yellow-300 p-2 w-fit rounded m-2">
//           {loading ? "Updating..." : "Update Venue"}
//         </button>
//         {error && <div className="text-red-500">{error}</div>}
//       </form>
//     </div>
//   );
// }


// import VenueForm from "../../components/forms/VenueForm/VenueForm";
// import { useUpdateVenue } from "../../hooks/useUpdateVenue";
// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import useFetchVenue from "../../hooks/useFetchVenue";


// export default function EditVenue() {
//   const { id } = useParams();
//   const { data: venue, isLoading, isError } = useFetchVenue(id);
//   const { updateVenue } = useUpdateVenue();
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     if (venue) {
//       const normalizedMedia = venue.media.map(item => ({
//         url: item.url || item,  // Ensure each image is structured correctly
//         alt: item.alt || "image" // Default alt text if not provided
//       }));
//       setImages(normalizedMedia);  // Set images correctly in state
//     }
//   }, [venue]);

//   const handleSubmit = async (updatedData) => {
//     const updatedFields = {};

//     // Check if any fields have changed and only send those
//     if (updatedData.name !== venue.name) updatedFields.name = updatedData.name;
//     if (updatedData.description !== venue.description) updatedFields.description = updatedData.description;
//     if (updatedData.address !== venue.location?.address) updatedFields.address = updatedData.address;
//     if (updatedData.city !== venue.location?.city) updatedFields.city = updatedData.city;
//     if (updatedData.country !== venue.location?.country) updatedFields.country = updatedData.country;
//     if (updatedData.price !== venue.price) updatedFields.price = updatedData.price;
//     if (updatedData.guests !== venue.maxGuests) updatedFields.maxGuests = updatedData.guests;
//     if (updatedData.wifi !== venue.meta?.wifi) updatedFields.wifi = updatedData.wifi;
//     if (updatedData.parking !== venue.meta?.parking) updatedFields.parking = updatedData.parking;
//     if (updatedData.breakfast !== venue.meta?.breakfast) updatedFields.breakfast = updatedData.breakfast;
//     if (updatedData.pets !== venue.meta?.pets) updatedFields.pets = updatedData.pets;

//     // Check if the media/images have changed
//     if (JSON.stringify(updatedData.images) !== JSON.stringify(venue.media)) {
//       updatedFields.media = updatedData.images.map(image => ({
//         url: image.url || image,  // Ensure the image URL is structured correctly
//         alt: image.alt || "image" // Provide alt text if missing
//       }));
//     }

//      // Check if the media/images have changed
//      const imagesHaveChanged = updatedData.images.some((image, index) => {
//       // Compare each image's URL and alt property individually
//       return (
//         image.url !== venue.media[index]?.url ||
//         image.alt !== venue.media[index]?.alt
//       );
//     });

//     if (imagesHaveChanged) {
//       updatedFields.media = updatedData.images.map(image => ({
//         url: image.url || image,  // Ensure the image URL is structured correctly
//         alt: image.alt || "image" // Provide alt text if missing
//       }));
//     }


//     try {
//       // Send only the fields that have changed to the API
//       const updatedVenue = await updateVenue(venue.id, updatedFields);
//       console.log("Venue updated successfully:", updatedVenue);
//     } catch (error) {
//       console.error("Failed to update venue:", error.message);
//     }
//   };


//   return (
//     <div className="m-10 px-10">
//       <h2 className="text-2xl mb-5">EDIT VENUE</h2>
//       <VenueForm
//         initialData={venue}
//         onSubmit={handleSubmit}
//         buttonText="Update Venue"
//       />
//     </div>
//   );
// }




// import { useUpdateVenue } from "../../hooks/useUpdateVenue";
// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import useFetchVenue from "../../hooks/useFetchVenue";
// import UpdateVenueForm from "../../components/forms/EditVenue/EditVenueForm";

// export default function EditVenue() {
//   const { id } = useParams();
//   const { data: venue, isLoading, isError } = useFetchVenue(id);
//   const { updateVenue } = useUpdateVenue();
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     if (venue) {
//       // Normalize the venue media to match the API's format
//       const normalizedMedia = venue.media.map(item => ({
//         url: item.url || item, // Ensure each image is structured correctly
//         alt: item.alt || "image", // Default alt text if not provided
//       }));
//       setImages(normalizedMedia); // Set images correctly in state
//     }
//   }, [venue]);

//   const handleSubmit = async (updatedData) => {
//     const formData = {};

//     // Check if any fields have changed and only send those
//     if (updatedData.name !== venue.name) formData.name = updatedData.name;
//     if (updatedData.description !== venue.description) formData.description = updatedData.description;
//     if (updatedData.address !== venue.location?.address) formData.address = updatedData.address;
//     if (updatedData.city !== venue.location?.city) formData.city = updatedData.city;
//     if (updatedData.country !== venue.location?.country) formData.country = updatedData.country;
//     if (updatedData.price !== venue.price) formData.price = updatedData.price;
//     if (updatedData.guests !== venue.maxGuests) formData.maxGuests = updatedData.guests;
//     if (updatedData.wifi !== venue.meta?.wifi) formData.wifi = updatedData.wifi;
//     if (updatedData.parking !== venue.meta?.parking) formData.parking = updatedData.parking;
//     if (updatedData.breakfast !== venue.meta?.breakfast) formData.breakfast = updatedData.breakfast;
//     if (updatedData.pets !== venue.meta?.pets) formData.pets = updatedData.pets;

//     // Check if the media/images have changed
//     const imagesHaveChanged = Array.isArray(updatedData.images) && Array.isArray(venue.media) &&
//   updatedData.images.some((image, index) => {
//     return (
//       image.url !== venue.media[index]?.url ||
//       image.alt !== venue.media[index]?.alt
//     );
//   });


//     if (imagesHaveChanged) {
//       formData.media = updatedData.images.map(image => ({
//         url: image.url || image,  // Ensure the image URL is structured correctly
//         alt: image.alt || "image" // Provide alt text if missing
//       }));
//     }

//     console.log("Form data being submitted:", updatedData);

//     try {
//       // Send only the fields that have changed to the API
//       const updatedVenue = await updateVenue(venue.id, formData);
//       console.log("Venue updated successfully:", updatedVenue);
//     } catch (error) {
//       console.error("Failed to update venue:", error.message);
//     }
//   };

//   return (
//     <div className="m-10 px-10">
//       <h2 className="text-2xl mb-5">EDIT VENUE</h2>
//       <UpdateVenueForm
//         initialData={venue}
//         images={images}
//         setImages={setImages}
//         onSubmit={handleSubmit}
//         buttonText="Update Venue"
//       />
//     </div>
//   );
// }

import { useUpdateVenue } from "../../hooks/useUpdateVenue";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchVenue from "../../hooks/useFetchVenue";
import UpdateVenueForm from "../../components/forms/EditVenue/EditVenueForm";

export default function EditVenue() {
  const { id } = useParams();
  const { data: venue, isLoading, isError } = useFetchVenue(); // Use data directly from `useFetchVenue`
  const { updateVenue } = useUpdateVenue();
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (venue) {
      // Normalize the venue media to match the API's format
      const normalizedMedia = venue.media.map(item => ({
        url: item.url || item, // Ensure each image is structured correctly
        alt: item.alt || "image", // Default alt text if not provided
      }));
      setImages(normalizedMedia); // Set images correctly in state
    }
  }, [venue]);

  const handleSubmit = async (updatedData) => {
    const formData = {};

    // Check if any fields have changed and only send those
    if (updatedData.name !== venue.name) formData.name = updatedData.name;
    if (updatedData.description !== venue.description) formData.description = updatedData.description;
    if (updatedData.address !== venue.location?.address) formData.address = updatedData.address;
    if (updatedData.city !== venue.location?.city) formData.city = updatedData.city;
    if (updatedData.country !== venue.location?.country) formData.country = updatedData.country;
    if (updatedData.price !== venue.price) formData.price = updatedData.price;
    if (updatedData.guests !== venue.maxGuests) formData.maxGuests = updatedData.guests;
    if (updatedData.wifi !== venue.meta?.wifi) formData.wifi = updatedData.wifi;
    if (updatedData.parking !== venue.meta?.parking) formData.parking = updatedData.parking;
    if (updatedData.breakfast !== venue.meta?.breakfast) formData.breakfast = updatedData.breakfast;
    if (updatedData.pets !== venue.meta?.pets) formData.pets = updatedData.pets;

    // Check if the media/images have changed
    const imagesHaveChanged = Array.isArray(updatedData.images) && Array.isArray(venue.media) &&
      updatedData.images.some((image, index) => {
        return (
          image.url !== venue.media[index]?.url ||
          image.alt !== venue.media[index]?.alt
        );
      });

    if (imagesHaveChanged) {
      formData.media = updatedData.images.map(image => ({
        url: image.url || image,  // Ensure the image URL is structured correctly
        alt: image.alt || "image" // Provide alt text if missing
      }));
    }

    console.log("Form data being submitted:", updatedData);

    try {
      // Send only the fields that have changed to the API
      const updatedVenue = await updateVenue(venue.id, updatedData);
      console.log("Venue updated successfully:", updatedVenue);
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
    <div className="m-10 px-10">
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
