import React from "react";
import "./ResponsiveApp.scss";
import SearchBarContainer from "@/containers/(searchBar)/SearchBarContainer";
import SideNavbarContainier from "@/containers/(navbar)/SideNavBarContainer";
import NavbarContainer from "@/containers/(navbar)/NavBarContainer";
import MapContainer from "@/containers/(map)/MapContainer";
import DrawersContainer from "@/containers/DrawersContainer";

const ResponsiveApp: React.FC = () => {
  return (
    <div className="responsive-app">
      <div className="uk-position-cover">
        <MapContainer />
      </div>
      <div className="top">
        <SearchBarContainer />
      </div>

      <div className="middle">
        <div className="main">
          <DrawersContainer />
        </div>

        <div className="side">
          <SideNavbarContainier />
        </div>
      </div>
      <div className="bottom">
        <NavbarContainer />
      </div>
    </div>
  );
};

export default ResponsiveApp;
