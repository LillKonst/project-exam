import ListOfVenues from "../../components/ListOfVenues/ListOfVenues";
import MainImage from "../../components/MainImage";
import VenuesList from "../test";

export default function Home() {
    return(
        <div>
          {/* <VenuesList /> */}
            <MainImage />
            <ListOfVenues />
        </div>
    );
}