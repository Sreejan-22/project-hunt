import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "./Menu.css";

const Menu = () => {
  const history = useHistory();
  const [active, setActive] = useState("feed");

  useEffect(() => {
    if (history.location.pathname === "/") {
      setActive("feed");
    }
    if (history.location.pathname.includes("/explore")) {
      setActive("explore");
    }
    if (history.location.pathname.includes("/profile")) {
      setActive("profile");
    }
    if (history.location.pathname.includes("/saved")) {
      setActive("saved");
    }
    if (history.location.pathname.includes("/notifications")) {
      setActive("notifications");
    }
  }, []);

  return (
    <div className="feed-menu">
      <br />
      <br />
      <br />
      <div className="menu-items">
        <Link
          to="/"
          className={`menu-item ${active === "feed" ? "active-menu-item" : ""}`}
        >
          <HomeIcon />
          &nbsp;&nbsp;Feed
        </Link>
        <div
          className={`menu-item ${
            active === "explore" ? "active-menu-item" : ""
          }`}
          onClick={() => setActive("explore")}
        >
          <ExploreIcon />
          &nbsp;&nbsp;Explore
        </div>
        <Link
          to="/profile"
          className={`menu-item ${
            active === "profile" ? "active-menu-item" : ""
          }`}
        >
          <PersonIcon />
          &nbsp;&nbsp;Profile
        </Link>
        <div
          className={`menu-item ${
            active === "saved" ? "active-menu-item" : ""
          }`}
          onClick={() => setActive("saved")}
        >
          <BookmarkIcon />
          &nbsp;&nbsp;Saved
        </div>
        <div
          className={`menu-item ${
            active === "notifications" ? "active-menu-item" : ""
          }`}
          onClick={() => setActive("notifications")}
        >
          <NotificationsIcon />
          &nbsp;&nbsp;Notifications
        </div>
        <div
          className={`menu-item ${
            active === "logout" ? "active-menu-item" : ""
          }`}
          onClick={() => setActive("logout")}
        >
          <LogoutIcon />
          &nbsp;&nbsp;Logout
        </div>
      </div>
    </div>
  );
};

export default Menu;
