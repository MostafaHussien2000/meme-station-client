import { Route, Routes } from "react-router-dom";

import Button from "./components/Button";
import NavBar from "./components/NavBar";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NewFeedPage from "./pages/NewFeedPage";
import NotificationsPage from "./pages/NotificationsPage";
import SignUpPage from "./pages/SignUpPage";
import TrendingPage from "./pages/TrendingPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/feed"
          element={
            <>
              <NavBar />
              <NewFeedPage />
            </>
          }
        />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/create-account" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
