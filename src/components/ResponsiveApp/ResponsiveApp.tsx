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
      <div>
        <SearchBarContainer />
      </div>

      <div className="middle">
        <div className="main">
          <DrawersContainer />
        </div>

        <aside className="uk-position-small uk-position-center-right  ">
          <SideNavbarContainier />
        </aside>
      </div>
      <footer className="uk-position-small uk-position-bottom-center  ">
        <NavbarContainer />
      </footer>
    </div>
  );
};

export default ResponsiveApp;
