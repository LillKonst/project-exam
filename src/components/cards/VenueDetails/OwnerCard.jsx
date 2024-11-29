export default function OwnerCard({ venue }) {
  return (
    <div className="m-3 border border-customRed rounded-lg shadow-lg p-4 flex flex-col">
          <div className="w-full flex justify-center">
            <h2 className="text-2xl font-semibold">YOUR HOST</h2>
          </div>
          <div className="w-full justify-start">
          <div className="flex gap-2 items-center">         
          {venue.owner?.avatar && venue.owner?.avatar.url && (
            <img
              src={venue.owner.avatar.url}
              alt={venue.owner.avatar.alt || "User Avatar"}
              className="w-16 h-16 rounded-full mb-4"
            />
          )} 
          <div>
              <h3 className="text-xl font-semibold">{venue.owner?.name}</h3>
              <p className="text-sm font-semibold">{venue.owner?.email}</p>
            </div>
          </div>
          <p className="ms-10">{venue.owner?.bio}</p> 
  
          </div>
        </div>
  );
}