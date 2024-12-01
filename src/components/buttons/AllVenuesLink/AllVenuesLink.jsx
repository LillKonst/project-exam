import VillaImg from "../../../images/modern-villa.jpg";
import { Link } from "react-router-dom";

export default function AllVenuesLink() {
  return (
    <Link to="/AllVenues" className="relative col-span-12 sm:col-span-6">
      <img
        src={VillaImg}
        alt="A white big house with modern features"
        className="relative top-0 left-0 w-full max-h-96 object-cover rounded-lg"
      />
      <div className="absolute bottom-0 left-0 p-2 md:p-5 rounded-lg bg-customWhite/50">
        <h2 className="text-xl xxs:text-3xl sm:text-2xl font-semibold">
          EXPLORE ALL VENUES
        </h2>
      </div>
    </Link>
  );
}
