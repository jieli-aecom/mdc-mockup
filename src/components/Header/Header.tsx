import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HEADER_NAV_LINKS, HEADER_NAV_NAMES } from "../../consts";
import "./Header.css";

const Header: React.FC = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="header-container">
      <div className="header-top-bar">
        <div className="header-user-icon" onClick={() => setOpen(!open)}>
          MD
        </div>
        {open && (
          <div className="header-links">
            {["My Projects", "Other Link", "Other Link 2", "Logout"].map(
              (item) => (
                <p key={`header-link-${item}`}>{item}</p>
              )
            )}
          </div>
        )}
      </div>
      <div className="header-nav-container">
        <img
          src="miami-dade-county-logo.png"
          alt="Logo"
          className="header-logo-container"
        />
        <nav className="header-nav-items">
          {HEADER_NAV_LINKS.map((link, index) => (
            <Link
              key={`header-nav-${link}`}
              to={link}
              className={`header-nav-item${
                link === location.pathname ? " header-nav-item-selected" : ""
              }`}
            >
              {HEADER_NAV_NAMES[index]}
            </Link>
          ))}
        </nav>
      </div>
      <div className="header-border-bottom"></div>
    </header>
  );
};

export default Header;
