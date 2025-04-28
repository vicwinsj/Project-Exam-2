import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import HomeView from "./views/HomeView";
// import Register from "./views/Register";
import VenueView from "./views/VenueView";
// import Profile from "./views/Profile";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomeView />} />
          {/* <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} /> */}
          <Route path="/venue/:venueId" element={<VenueView />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
