import React from "react";

export default function ConfirmDelete({
  isOpen,
  onConfirm,
  onCancel,
  isLoading,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-4">
        <h3 className="text-xl font-semibold mb-4">
          Are you sure you want to delete this venue?
        </h3>
        <p className="text-gray-600 mb-6">This action cannot be undone.</p>
        <div className="flex justify-between">
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`py-2 px-4 bg-customRed hover:hoverRed text-customWhite font-semibold rounded-lg ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Yes, Delete
          </button>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className={`py-2 px-4 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold rounded-lg ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            No, Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
