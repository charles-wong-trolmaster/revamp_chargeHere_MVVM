import React from "react";
import SearchBarContainer from "./containers/SearchBarContainer";
import SideNavbarContainier from "./containers/SideNavBarContainer";
import NavbarContainer from "./containers/NavBarContainer";
import PanelManagerContainer from "./containers/PanelManagerContainer";
import MapContainer from "./containers/MapContainer";

const App: React.FC = () => {
  return (
    <div className="uk-height-viewport uk-position-relative">
      {/* Map Background */}
      <MapContainer />

      {/* UI Layer - needs flex column structure */}
      <div className="uk-position-absolute uk-width-1-1 uk-height-viewport uk-flex uk-flex-column">
        {/* Header */}
        <SearchBarContainer />

        {/* Main Content Area - this should expand */}
        <div className="uk-flex-1 uk-flex">
          {/* Main Content */}
          <PanelManagerContainer />

          {/* Side Navbar */}
          <aside
            className="uk-width-1-6 uk-padding uk-flex-none uk-flex uk-flex-middle uk-flex-center"
            style={{ background: "lightblue" }}
          >
            <div className="uk-text-center">
              <SideNavbarContainier />
            </div>
          </aside>
        </div>

        {/* Footer */}
        <footer
          className="uk-background-muted uk-padding-small uk-flex-none uk-flex uk-flex-middle uk-flex-center"
          style={{ background: "lightgreen" }}
        >
          <div className="uk-container uk-text-center">
            <NavbarContainer />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;