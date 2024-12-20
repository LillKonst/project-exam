import Layout from "./components/Layout/Layout";
import { RouteNotFound } from "./components/Layout/Header/NavBar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home/Home";
import Profile from "./routes/Profile/Profile";
import VenueSpecific from "./routes/VenueSpecific/VenueSpecific";
import AllVenues from "./routes/AllVenues/AllVenues";
import RegisterVenue from "./routes/RegisterVenue/RegisterVenue";
import EditVenue from "./routes/EditVenue/EditVenue";

function App() {
  return (
    <>
      <div className="w-full">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="/AllVenues" element={<AllVenues />} />
            <Route path="/VenueSpecific/:id" element={<VenueSpecific />} />
            <Route path="/RegisterVenue" element={<RegisterVenue />} />
            <Route path="/EditVenue/:id" element={<EditVenue />} />
            <Route path="*" element={<RouteNotFound />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
