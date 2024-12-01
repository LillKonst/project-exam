import BestRankedVenueDisplay from "../../components/BestRankedVenueDisplay/BestRankedVenueDisplay";
import AllVenuesLink from "../../components/buttons/AllVenuesLink/AllVenuesLink";
import NewestVenueDisplay from "../../components/cards/NewestVenueDisplay/NewestVenueDisplay";
import MainImage from "../../components/MainImage";
import RegisterVenueLink from "../../components/buttons/RegisterVenueLink/RegisterVenueLink";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <MainImage />
      <div className="md:mx-4 flex flex-col">
        <NewestVenueDisplay />
        <BestRankedVenueDisplay />
        <div className="grid grid-cols-12 gap-2 md:gap-4 m-6">
          <AllVenuesLink />
          <RegisterVenueLink />
        </div>
      </div>
    </div>
  );
}
