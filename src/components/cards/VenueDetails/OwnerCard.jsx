export default function OwnerCard({ venue }) {
  return (
    <div className="sm:m-3 mt-3 h-fit border border-gray-200 rounded-lg shadow-xl p-4 flex flex-col">
      <div className="w-full flex justify-center">
        <h2 className="text-lg sm:text-2xl font-semibold">YOUR HOST</h2>
      </div>
      <div className="w-full justify-start">
        <div className="flex gap-2 items-center">
          {venue.owner?.avatar && venue.owner?.avatar.url && (
            <img
              src={venue.owner.avatar.url}
              alt={venue.owner.avatar.alt || "User Avatar"}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full mb-4"
            />
          )}
          <div>
            <h3 className="text-md sm:text-xl font-semibold">
              {venue.owner?.name}
            </h3>
            <p className="text-sm font-semibold">{venue.owner?.email}</p>
          </div>
        </div>
        <p className="ms-10">{venue.owner?.bio}</p>
      </div>
    </div>
  );
}
