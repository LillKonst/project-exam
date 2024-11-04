import CalendarForm from "../../components/calendarForm/CalendarForm";
import ListOfVenues from "../../components/ListOfVenues/ListOfVenues";



export default function Home() {
    return(
        <div>
            <div className="h-[70px]"></div>

            <CalendarForm />
            <ListOfVenues/>
        </div>
    );
}