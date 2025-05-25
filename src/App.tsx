import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomeView from "./views/HomeView";
import RegisterView from "./views/RegisterView";
import VenueView from "./views/VenueView";
import ProfileView from "./views/ProfileView";
import NotFoundView from "./views/NotFoundView";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/utilities/ScrollToTop";

const App = () => {
  return (
    <Router>
      <Layout>
        <ScrollToTop />
        <Toaster position="bottom-center" />
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/search" element={<HomeView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/profile/:name" element={<ProfileView />} />
          <Route path="/venue/:id" element={<VenueView />} />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
