import React from "react"

export default function VenueDetails({ venue }) { 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString(undefined, options);
  };

  if (!venue) {
    return <div>No venue data available.</div>;
  }

  console.log(venue);

  const { owner, location, media, created } = venue;
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full h-[70vh]">
        <img 
          src={venue.media[0]?.url} 
          alt={venue.media[0]?.alt || "Product image"} 
          className="object-cover w-full h-full rounded"
        />
        <button type="" className="bg-yellow-300/80 px-3 py-2 absolute top-1 right-1 m-1 rounded-md flex items-center">
          GALLERY 
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right ms-1" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
          </svg>
        </button>
      </div>
            
      <div className="flex flex-col -mt-12 mx-12 w-10/12 z-10  relative bg-white shadow-md rounded-md ">
        <div className="relative m-8 mb-5">
          <div className="flex flex-row">
            <h2 className="text-3xl ms-1">{venue.name}</h2>
            <div className="flex m-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star ms-1 mt-1" viewBox="0 0 16 16">
                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star mt-1 ms-1" viewBox="0 0 16 16">
                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star ms-1 mt-1" viewBox="0 0 16 16">
                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star ms-1 mt-1" viewBox="0 0 16 16">
                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-lg ms-2 text-gray-600">Location: City/Country {venue.location.city} {venue.location.country}</h3>
          </div>
          <div className="flex flex-col absolute top-0 right-2 m-2">
            <div className="flex">
              <p className="text-lg me-1">${venue.price}</p>
              <p className="text-lg text-gray-600">night</p>
            </div>
            <button className="bg-yellow-300 p-3 rounded">CHECK AVAILABILITY</button>
          </div>
        </div>
        <div className="m-2 py-3 rounded w-fit px-4">
          <p>{venue.description}</p>
        </div>

        <div className="bg-white m-2 py-3 rounded w-fit px-4">
          <h3 className="text-lg">This place offers:</h3>
          <p className="text-sm">Max Guests: {venue.maxGuests}</p>
          {venue.meta.wifi && <p className="text-sm">Wifi</p>}
          {venue.meta.parking && <p className="text-sm">Parking</p>}
          {venue.meta.breakfast && <p className="text-sm">Breakfast</p>}
          {venue.meta.pets ? (
          <p className="text-sm">Pets allowed</p>
          ) : (
            <p className="text-sm"> No pets allowed</p>
          )}
        </div>       

        <div>
          <p>This will be the map</p>
        </div>
          
        <p className="m-2 text-gray-600">Created: {formatDate(venue.created)}</p>

      </div>
      <div>
        {venue.owner?.avatar && venue.owner?.avatar.url && (
          <img
            src={venue.owner.avatar.url}
            alt={venue.owner.avatar.alt || "User Avatar"}
            className="w-16 h-16 rounded-full mb-4"
          />
        )} 
        <h3>{venue.owner?.name}</h3>
        <p>{venue.owner?.email}</p>
        <p>{venue.owner?.bio}</p> 
      </div>
    </div>
          
         
    )
}