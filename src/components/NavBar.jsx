import { NavLink } from "react-router-dom";

import { AiOutlineFire, AiOutlineBell } from "react-icons/ai";
import { CgFeed } from "react-icons/cg";

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            className={({ isActive }) => `nav_link ${isActive ? "active" : ""}`}
            to="/feed"
          >
            <CgFeed />
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => `nav_link ${isActive ? "active" : ""}`}
            to="/trending"
          >
            <AiOutlineFire />
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => `nav_link ${isActive ? "active" : ""}`}
            to="/notifications"
          >
            <AiOutlineBell />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
