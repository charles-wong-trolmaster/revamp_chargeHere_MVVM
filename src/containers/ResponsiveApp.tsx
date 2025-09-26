import React, { useCallback, useState } from "react";
import "@/styles/ResponsiveApp.scss";

interface ResponsiveAppProps {
  title?: string;
  sideText?: string;
  bottomText?: string;
}

const ResponsiveApp: React.FC<ResponsiveAppProps> = ({
  title = "My Responsive Web App",
  sideText = "Status: Ready",
  bottomText = "Responsive Web App",
}) => {
  const [visibleDrawers, setVisibleDrawers] = useState<Set<string>>(
    new Set(["drawer1"])
  );

  const openDrawer = useCallback((drawerId: string): void => {
    setVisibleDrawers((prev) => new Set([...prev, drawerId]));
  }, []);

  const closeDrawer = useCallback((drawerId: string): void => {
    setVisibleDrawers((prev) => {
      const newSet = new Set(prev);
      newSet.delete(drawerId);
      return newSet;
    });
  }, []);

  const closeDrawer2AndDrawer3 = useCallback((): void => {
    setVisibleDrawers((prev) => {
      const newSet = new Set(prev);
      newSet.delete("drawer2");
      newSet.delete("drawer3");
      return newSet;
    });
  }, []);

  return (
    <div className="responsive-app">
      <div className="top">{title}</div>

      <div className="middle">
        <div className="main">
          <div className="sideboard">
            <div
              className={`drawer ${
                visibleDrawers.has("drawer1") ? "visible" : ""
              }`}
            >
              <h3>Drawer 1</h3>
              <button onClick={() => openDrawer("drawer2")}>
                Open Drawer 2
              </button>
              <p>
                This is the first drawer. The text size is now defined relative
                to the drawer width.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore.
              </p>
              <p>
                Additional content to test scrolling when drawer height is
                constrained.
              </p>
              <p>
                More content here to see how the drawer behaves with overflow.
              </p>
            </div>

            <div
              className={`drawer ${
                visibleDrawers.has("drawer2") ? "visible" : ""
              }`}
            >
              <button className="close" onClick={closeDrawer2AndDrawer3}>
                ×
              </button>
              <h3>Drawer 2</h3>
              <button onClick={() => openDrawer("drawer3")}>
                Open Drawer 3
              </button>
              <p>
                This is the second drawer. The font sizes scale with the drawer
                width.
              </p>
              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo.
              </p>
              <p>
                Additional content to test scrolling when drawer height is
                constrained.
              </p>
              <p>
                More content here to see how the drawer behaves with overflow.
              </p>
            </div>

            <div
              className={`drawer ${
                visibleDrawers.has("drawer3") ? "visible" : ""
              }`}
            >
              <button className="close" onClick={() => closeDrawer("drawer3")}>
                ×
              </button>
              <h3>Drawer 3</h3>
              <p>
                This is the third drawer. Notice how all text scales
                proportionally with the drawer's width.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur.
              </p>
              <p>
                Additional content to test scrolling when drawer height is
                constrained.
              </p>
              <p>
                More content here to see how the drawer behaves with overflow.
              </p>
            </div>
          </div>
        </div>

        <div className="side">{sideText}</div>
      </div>

      <div className="bottom">{bottomText}</div>
    </div>
  );
};

export default ResponsiveApp;
