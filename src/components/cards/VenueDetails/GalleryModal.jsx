import { useState } from "react";

export default function GalleryModal({ media, closeGallery }) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

   const selectImage = (index) => {
    setSelectedImageIndex(index);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 max-w-4xl w-full flex flex-col">
        <button
          onClick={closeGallery}
          className="text-gray-600 text-2xl font-semibold p-2 hover:text-gray-900 self-end mb-2"
        >
           ✕
        </button>

        <div className="flex justify-center mb-4">
        <img 
          src={media[selectedImageIndex].url} 
          alt={media[selectedImageIndex].alt || "Gallery image"} 
          className="object-cover w-full h-96 rounded-md"
        />
        </div>

      {media.length > 1 && (
        <div className="thumbnail-row">
          {media.map((thumbnail, index) => (
            <img
              key={index}
              src={thumbnail}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => selectImage(index)}
              style={{
                width: "100px",
                height: "auto",
                cursor: "pointer",
                border: selectedImageIndex === index ? "2px solid blue" : "none"
              }}
            />
          ))}
        </div>
      )}
      </div>
    </div>
     );
}