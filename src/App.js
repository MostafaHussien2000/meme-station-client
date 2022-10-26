import { Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NewFeedPage from "./pages/NewFeedPage";
import NotificationsPage from "./pages/NotificationsPage";
import Profile from "./pages/Profile";
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
        <Route
          path="/trending"
          element={
            <>
              <NavBar />
              <TrendingPage />
            </>
          }
        />
        <Route
          path="/notifications"
          element={
            <>
              <NavBar />
              <NotificationsPage />
            </>
          }
        />
        <Route path="/create-account" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/profile/:username"
          element={
            <>
              <NavBar />
              <Profile />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
