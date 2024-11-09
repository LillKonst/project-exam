import { useState } from "react";
import CalendarForm from "../../components/calendarForm/CalendarForm";
import ListOfVenues from "../../components/ListOfVenues/ListOfVenues";
import FilterButton from "../../components/Buttons/FilterButton";

export default function AllVenues() {
  const [queryParams, setQueryParams] = useState({});

  const onSearchSubmit = (newQueryParams) => {
    setQueryParams((prev) => ({
      ...prev,
      ...newQueryParams,
    }));
  };

  const onFilterChange = (newFilters) => {
    setQueryParams((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        ...newFilters,
      },
    }));
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-semibold mt-5">YOUR NEXT HOLIDAZE</h1>     
      <CalendarForm onSearchSubmit={onSearchSubmit} />
      <FilterButton onFilterChange={onFilterChange}/>
      <ListOfVenues queryParams={queryParams}/>
    </div>
  );
}