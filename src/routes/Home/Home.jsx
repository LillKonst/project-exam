import CalendarForm from "../../components/calendarForm/CalendarForm";
import ListOfVenues from "../../components/ListOfVenues/ListOfVenues";
import MainImage from "../../components/MainImage";

export default function Home() {
    return(
        <div>
            <MainImage />
            {/* <CalendarForm /> */}
            <ListOfVenues/>
        </div>
    );
}