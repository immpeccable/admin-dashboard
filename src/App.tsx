import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Country } from "./pages/Country";
import { Header } from "./components/Header";
import { City } from "./pages/City";
import { District } from "./pages/District";
import { BallotBox } from "./pages/BallotBox";
import HomePage from "./pages/Home";
import ProfilePage from "./pages/Profile";

function App() {
  const [account, setAccount] = React.useState();
  return (
    <div>
      <Header account={account} setAccount={setAccount} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<HomePage account={account} setAccount={setAccount} />}
          />
          <Route
            path="/map"
            element={
              <Country
                account={account}
                applicationType="waiting"
                color="#FFF"
              />
            }
          />
          <Route path="/sehir/:city_id/:status/:color" element={<City />} />
          <Route path="/profile" element={<ProfilePage></ProfilePage>} />
          <Route
            path="/ilce/:city_id/:district_id"
            element={<District account={account} />}
          />
          <Route
            path="/sehir/:city_id/ilce/:district_id/sandık/:ballotbox_id"
            element={<BallotBox />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
