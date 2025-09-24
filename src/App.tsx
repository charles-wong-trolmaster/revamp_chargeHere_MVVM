import React from "react";
import SearchBarContainer from "./containers/SearchBarContainer";
import SideNavbarContainier from "./containers/SideNavBarContainer";
import NavbarContainer from "./containers/NavBarContainer";
import MapContainer from "./containers/MapContainer";
import DrawersContainer from "./containers/DrawersContainer";

const App: React.FC = () => {
  return (
    <div className="uk-height-viewport uk-position-relative">
      {/* Map Background */}
      <MapContainer />

      {/* Header - positioned at top */}
      <div
        className="uk-position-absolute uk-position-top uk-width-1-1"
        style={{ zIndex: 1000 }}
      >
        <SearchBarContainer />
      </div>

      {/* Main Panel - positioned at left */}
      <div
        className="uk-position-absolute uk-position-top-left"
        style={{
          zIndex: 1000,
          top: "60px", // Adjust based on header height
          bottom: "60px", // Adjust based on footer height
        }}
      >
        <DrawersContainer />
      </div>

      {/* Side Navbar - positioned at right */}
      <aside
        className="uk-position-absolute uk-position-top-right uk-padding uk-flex uk-flex-middle uk-flex-center"
        style={{
          background: "lightblue",
          zIndex: 1000,
          top: "60px", // Adjust based on header height
          bottom: "60px", // Adjust based on footer height
        }}
      >
        <div className="uk-text-center">
          <SideNavbarContainier />
        </div>
      </aside>

      {/* Footer - positioned at bottom */}
      <footer
        className="uk-position-absolute uk-position-bottom uk-width-1-1 uk-background-muted uk-padding-small uk-flex uk-flex-middle uk-flex-center"
        style={{ background: "lightgreen", zIndex: 1000 }}
      >
        <div className="uk-container uk-text-center">
          <NavbarContainer />
        </div>
      </footer>
    </div>
  );
};

export default App;
