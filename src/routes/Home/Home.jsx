import BestRankedVenueDisplay from "../../components/BestRankedVenueDisplay/BestRankedVenueDisplay";
import NewestVenueDisplay from "../../components/cards/NewestVenueDisplay/NewestVenueDisplay";
import MainImage from "../../components/MainImage";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <MainImage />
      <div className="md:mx-4 flex flex-col">
        <NewestVenueDisplay />
        <BestRankedVenueDisplay />
        <Link
          to="/AllVenues"
          className="my-5 w-fit mx-auto rounded-lg p-3 flex hover:shadow-lg justify-center items-center bg-customRed"
        >
          <h2 className="text-xl font-semibold m-3">ALL VENUES</h2>
        </Link>
      </div>
    </div>
  );
}
