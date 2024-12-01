import mainImage from "../images/main-img-holidaze-cut.jpg";
import { Link } from "react-router-dom";

export default function MainImage() {
  return (
    <Link to="/AllVenues" className="relative w-full h-auto">
      <img
        src={mainImage}
        alt="Swimming Pool"
        className="relative top-0 left-0 w-full object-cover"
      />
      <div className="absolute bottom-0 left-0 p-2 md:p-5 rounded-lg bg-blue-400/50">
        <h1 className="text-sm xxs:text-xl xs:text-2xl md:text-4xl text-customWhite font-semibold">
          FIND YOUR NEXT VACATION SPOT
        </h1>
      </div>
    </Link>
  );
}
