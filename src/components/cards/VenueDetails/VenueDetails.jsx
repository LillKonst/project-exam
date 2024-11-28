import { useState } from "react";
import React from "react"
import GalleryModal from "./GalleryModal";
import BookVenue from "./BookVenue";
import MapOfVenue from "../../../MapOfVenue/MapOfVenue";
import venueDefaultImg from "../../../images/venue-default-img.png"
import OwnerCard from "./OwnerCard";

export default function VenueDetails({ venue }) { 
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString(undefined, options);
  };

  const openGallery = () => setIsGalleryOpen(true);
  const closeGallery = () => setIsGalleryOpen(false);


  if (!venue) {
    return <div>No venue data available.</div>;
  }

  console.log(venue);
  console.log("owner", venue.owner);

  const { owner, location, media, created, maxGuests } = venue;
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full h-[70vh]">
        <img 
          src={venue.media[0]?.url || venueDefaultImg } 
          alt={venue.media[0]?.alt || "Product image"} 
          className="object-cover w-full h-full rounded"
        />
        <button type="button" onClick={openGallery} className="bg-customYellow font-medium text-lg p-3 absolute top-5 right-5 m-1 rounded-md flex items-center">
          GALLERY 
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-right ms-1" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
          </svg>
        </button>
      </div>

      {isGalleryOpen && (
        <GalleryModal media={venue.media} isGalleryOpen={isGalleryOpen} closeGallery={closeGallery}/>
      )}
            
      <div className="flex flex-col -mt-12 mx-12 w-10/12 z-10 p-2 md:p-5 bg-white shadow-md rounded-md ">
        <div className="flex flex-col md:flex-row m-3 md:m-8 md:mb-5 pb-5 border-b border-customYellow">
          <div className="flex flex-col">
            <div className="flex flex-row flex-wrap">
              <h2 className="text-4xl ms-1">{venue.name}</h2>
              
              <div className="flex m-2">
              {[...Array(venue.rating)].map((_, i) => (
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-star-fill text-customYellow ms-2" viewBox="0 0 16 16">
                 <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
               </svg>
              ))}
              </div>
          </div>
          <h3 className="text-lg ms-2 text-gray-600">{ venue.location?.city && venue.location?.country ? `${venue.location.city} ${venue.location.country}` : "Location not available"}</h3>
        </div>
        
        <div className="flex flex-col items-start md:items-center md:ms-auto m-2">
          <div className="flex">
            <p className="text-3xl me-1">${venue.price}</p>
            <p className="text-3xl text-gray-600">night</p>
          </div>
          <p className="text-md m-1 ">Max Guests: {venue.maxGuests}</p>
        </div>
      </div>
        
        <div className="flex flex-col lg:flex-row">
          <div className="w-full">
          {venue.meta && Object.values(venue.meta).some(value => value) && (
            <div className="bg-white my-2 ms-6 py-3 rounded w-fit px-4">              
              <h3 className="text-4xl secondFont">This place offers:</h3>
          {venue.meta.wifi && 
          <p className="text-md flex m-1 ms-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-wifi me-2" viewBox="0 0 16 16">
              <path d="M15.384 6.115a.485.485 0 0 0-.047-.736A12.44 12.44 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.52.52 0 0 0 .668.05A11.45 11.45 0 0 1 8 4c2.507 0 4.827.802 6.716 2.164.205.148.49.13.668-.049"/>
              <path d="M13.229 8.271a.482.482 0 0 0-.063-.745A9.46 9.46 0 0 0 8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065A8.46 8.46 0 0 1 8 7a8.46 8.46 0 0 1 4.576 1.336c.206.132.48.108.653-.065m-2.183 2.183c.226-.226.185-.605-.1-.75A6.5 6.5 0 0 0 8 9c-1.06 0-2.062.254-2.946.704-.285.145-.326.524-.1.75l.015.015c.16.16.407.19.611.09A5.5 5.5 0 0 1 8 10c.868 0 1.69.201 2.42.56.203.1.45.07.61-.091zM9.06 12.44c.196-.196.198-.52-.04-.66A2 2 0 0 0 8 11.5a2 2 0 0 0-1.02.28c-.238.14-.236.464-.04.66l.706.706a.5.5 0 0 0 .707 0l.707-.707z"/>
            </svg> 
            Wifi
          </p>}
          {venue.meta.parking && 
          <p className="text-md flex m-1 ms-3"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-p-square me-2" viewBox="0 0 16 16">
              <path d="M5.5 4.002h2.962C10.045 4.002 11 5.104 11 6.586c0 1.494-.967 2.578-2.55 2.578H6.784V12H5.5zm2.77 4.072c.893 0 1.419-.545 1.419-1.488s-.526-1.482-1.42-1.482H6.778v2.97z"/>
              <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
            </svg>
            Parking
          </p>}
          {venue.meta.breakfast && 
          <p className="text-md flex m-1 ms-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="me-2" viewBox="0 0 640 512"><path d="M96 64c0-17.7 14.3-32 32-32l320 0 64 0c70.7 0 128 57.3 128 128s-57.3 128-128 128l-32 0c0 53-43 96-96 96l-192 0c-53 0-96-43-96-96L96 64zM480 224l32 0c35.3 0 64-28.7 64-64s-28.7-64-64-64l-32 0 0 128zM32 416l512 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg> 
            Breakfast
          </p>} 
          {venue.meta.pets && 
          <p className="text-md flex m-1 ms-3"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" className="me-2"><path d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5l0 1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3l0-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z"/></svg> 
            Pet friendly
          </p>}
        </div> 
          )}

        <div className="my-2 mx-6 py-3 rounded w-fit px-4">
          <p className="text-xl">{venue.description}</p>
        </div>      

        <div className="my-2 mx-6 py-3 px-4">
          <h3 className="text-4xl secondFont">Location:</h3>
          <div>Adress: {venue.location.address}</div>
          <div>Zip: {venue.location.zip}</div>
          <div>City: {venue.location.city}</div>
          <div>Country: {venue.location.country}</div>
          <div>Continent: {venue.location.continent}</div>
        </div>
          
        <p className="m-2 mx-6 px-3 text-xl text-gray-600">Created: {formatDate(venue.created)}</p>

      </div>
      <div className="flex flex-col md:flex-row lg:flex-col">
        <BookVenue venue={venue} bookings={venue.bookings}/>
        <OwnerCard venue={venue}/>
      </div>
    </div>   
  </div>
</div>
          
         
  )
}