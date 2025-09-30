import React, { useState } from "react";

export interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <ul className="uk-child-width-expand" uk-tab="">
        {tabs.map((tab, index) => (
          <li key={index} className={activeIndex === index ? "uk-active" : ""}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveIndex(index);
              }}
            >
              {tab.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="uk-margin-top">{tabs[activeIndex]?.content}</div>
    </div>
  );
};

export default Tabs;
