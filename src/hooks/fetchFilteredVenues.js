export async function fetchFilteredVenues(queryParams = {}) {
  const { name, location, dateFrom, dateTo, guests } = queryParams;
  console.log("Received queryParams:", queryParams);
  const url = new URL(`${import.meta.env.VITE_APP_BASEURL}holidaze/venues`);
  const params = new URLSearchParams();

  if (name) params.append("name", name);
  if (location.city) params.append("city", location.city);
  if (location.country) params.append("country", location.country);
  if (dateFrom) params.append("dateFrom", dateFrom.toISOString());
  if (dateTo) params.append("dateTo", dateTo.toISOString());
  if (guests) params.append("guests", guests);

  if (filters) {
    if (filters.wifi !== undefined) params.append("wifi", filters.wifi);
    if (filters.breakfast !== undefined)
      params.append("breakfast", filters.breakfast);
    if (filters.parking !== undefined)
      params.append("parking", filters.parking);
    if (filters.pets !== undefined) params.append("pets", filters.pets);
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const json = await response.json();
  return json.data || json;
}
