import { Route, Routes, Navigate } from "react-router-dom";

import NavBar from "./components/NavBar";
import PasswordSettings from "./components/PasswordSettings";
import PersonalSettings from "./components/PersonalSettings";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NewFeedPage from "./pages/NewFeedPage";
import NotificationsPage from "./pages/NotificationsPage";
import Profile from "./pages/Profile";
import SettingsPage from "./pages/SettingsPage";
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
        <Route path="/settings" element={<SettingsPage />}>
          <Route index element={<Navigate to="/settings/personal" />} />
          <Route path={"/settings/personal"} element={<PersonalSettings />} />
          <Route path={"/settings/password"} element={<PasswordSettings />} />
          {/* <Route
            path={"/settings/online-presence"}
            element={<PasswordSettings />}
          /> */}
          {/* <Route path={"/settings/privacy"} element={<>privacy</>} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
