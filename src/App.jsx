import VenueCardSm from "./components/cards/VenueLinkSm/VenueLinkSm"

import Layout from "./components/Layout/Layout";
import { RouteNotFound } from "./components/Layout/Header/NavBar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home/Home";
import Profile from "./routes/Profile/Profile"
import VenueSpecific from "./routes/VenueSpecific/VenueSpecific";
import { VenueProvider } from "./context/VenueContext";
import AllVenues from "./routes/AllVenues/AllVenues";

function App() {
  return (
    <>
       <div className="w-full">
        <Routes> 
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="/AllVenues" element={<AllVenues />} />
            <Route path="/VenueSpecific/:id" element={
            <VenueProvider>
              <VenueSpecific />
            </VenueProvider>
          } />
            <Route path="*" element={<RouteNotFound />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
