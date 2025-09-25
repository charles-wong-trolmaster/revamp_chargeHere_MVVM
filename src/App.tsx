import React from "react";
import SearchBarContainer from "./containers/SearchBarContainer";
import SideNavbarContainier from "./containers/SideNavBarContainer";
import NavbarContainer from "./containers/NavBarContainer";
import MapContainer from "./containers/MapContainer";
import DrawersContainer from "./containers/DrawersContainer";
import Panel from "./components/Panel";

const App: React.FC = () => {
  return (
    <div className="uk-height-viewport uk-position-relative">
      {/* Map Background */}
      <div className="uk-position-cover">
        <MapContainer />
      </div>

      {/* Header - positioned at top, centered */}
      <div className="uk-position-small uk-position-top-center ">
        <SearchBarContainer />
      </div>

      {/* Main Panel - positioned at top-left */}
      <div className="uk-position-small uk-position-top-left uk-margin-large-top">
        <DrawersContainer />
      </div>

      {/* Side Navbar - positioned at top-right */}
      <aside className="uk-position-small uk-position-center-right  ">
        <SideNavbarContainier />
      </aside>

      {/* Footer - positioned at bottom, centered */}
      <footer className="uk-position-small uk-position-bottom-center  ">
        <NavbarContainer />
      </footer>
    </div>
  );
};

export default App;
