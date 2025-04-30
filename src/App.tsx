import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import HomeView from "./views/HomeView";
import RegisterView from "./views/RegisterView";
import VenueView from "./views/VenueView";
import ProfileView from "./views/ProfileView";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/profile/:name" element={<ProfileView />} />
          <Route path="/venue/:venueId" element={<VenueView />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
