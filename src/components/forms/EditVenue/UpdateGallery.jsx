import { useState } from "react";

export default function UpdateGallery({
  images,
  setImages,
  selectedImageIndex,
  setSelectedImageIndex,
}) {
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [currentImageAlt, setCurrentImageAlt] = useState("");

  const handleAddImage = (e) => {
    e.preventDefault();
    if (!currentImageUrl.trim()) {
      return;
    }

    const newImage = {
      url: currentImageUrl,
      alt: currentImageAlt || "Default image alt",
    };

    setImages((prev) => {
      const newImages = [...prev, newImage];
      setSelectedImageIndex(newImages.length - 1);
      return newImages;
    });

    setCurrentImageUrl("");
    setCurrentImageAlt("");
  };

  const handleDeleteImage = (indexToDelete) => {
    setImages((prev) => {
      const newImages = prev.filter((_, index) => index !== indexToDelete);

      if (indexToDelete === selectedImageIndex) {
        setSelectedImageIndex(newImages.length - 1);
      }
      return newImages;
    });
  };

  return (
    <div className=" mx-2 w-full max-w-[450px]">
      <h2 className="secondFont text-3xl mb-2">Upload a Gallery:</h2>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <label className="mx-2 my-1">Image URL</label>
          <input
            type="url"
            placeholder="Enter image URL"
            value={currentImageUrl}
            onChange={(e) => setCurrentImageUrl(e.target.value)}
            className="border rounded-lg p-2 w-full mb-3"
          />
        </div>
        <div className="flex flex-col">
          <label className="mx-2 my-1">Alt Text (Optional)</label>
          <input
            type="text"
            placeholder="Enter alt text"
            value={currentImageAlt}
            onChange={(e) => setCurrentImageAlt(e.target.value)}
            className="border rounded-lg p-2 w-full mb-3"
          />
        </div>
        <button
          onClick={handleAddImage}
          className="bg-customRed shadow-sm w-fit text-customWhite px-4 py-2 rounded-lg font-medium mb-5"
        >
          Add
        </button>
      </div>

      <div className="flex justify-center mb-4">
        {images[selectedImageIndex] ? (
          <img
            src={images[selectedImageIndex].url}
            alt={images[selectedImageIndex].alt || "Main image"}
            className="object-cover w-full max-w-md h-64 rounded-md shadow-lg"
          />
        ) : (
          <div className="flex items-center justify-center w-full max-w-md h-64 rounded-md shadow-lg border border-gray-300 bg-gray-100">
            <div className="text-center">
              <div className="text-gray-400 text-xl font-semibold mb-2">
                No images
              </div>
              <div className="flex gap-2">
                <div className="w-16 h-16 bg-gray-300 rounded-md"></div>
                <div className="w-16 h-16 bg-gray-300 rounded-md"></div>
                <div className="w-16 h-16 bg-gray-300 rounded-md"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {images.length > 0 && (
        <div className="flex gap-2 overflow-x-auto mb-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative w-20 h-20 rounded-md cursor-pointer border overflow-hidden ${
                selectedImageIndex === index
                  ? "border-blue-500"
                  : "border-gray-300"
              }`}
              onClick={() => setSelectedImageIndex(index)}
            >
              <img
                src={image.url}
                alt={image.alt || `Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteImage(index);
                }}
                className="absolute top-1 right-1 bg-gray-500 text-white rounded-full px-1 hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
