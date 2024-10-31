import CalendarForm from "../../components/calendarForm/CalendarForm";
import VenueCardSm from "../../components/ListOfVenues/ListOfVenues";



export default function Home() {
    return(
        <div>
            <div className="h-[70px]"></div>

            <CalendarForm />
            <VenueCardSm />
        </div>
    );
}