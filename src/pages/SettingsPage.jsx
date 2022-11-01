import React from "react";
import { NavLink, Link, Outlet } from "react-router-dom";

import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useContext } from "react";
import LoggedUserContext from "../context/loggedUserContext";

function SettingsPage() {
    document.title = "Account Settings";

    const { loggedUser } = useContext(LoggedUserContext)

    return (
        <div className="settings-page">
            <Link to={`/profile/${loggedUser.data.username}`} id="back-button">
                <HiOutlineArrowNarrowLeft /> Back to profile.
            </Link>
            <main className="main-content">
                <div className="side-nav">
                    <NavLink
                        className={({ isActive }) =>
                            `side_nav_link ${isActive ? "active" : ""}`
                        }
                        to={"/settings/personal"}
                    >
                        Personal information
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `side_nav_link ${isActive ? "active" : ""}`
                        }
                        to={"/settings/password"}
                    >
                        Password
                    </NavLink>
                </div>
                <div className="settings">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default SettingsPage;
