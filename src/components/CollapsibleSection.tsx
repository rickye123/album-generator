import React, { useState } from 'react';
import './CollapsibleSection.css';

interface CollapsibleSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, defaultOpen = false, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`collapsible-section ${isOpen ? 'open' : 'closed'}`}>
      <h2 className="toggle-header" onClick={() => setIsOpen((prev) => !prev)}>
        {title}
        <span className={`arrow ${isOpen ? 'down' : 'right'}`}></span>
      </h2>
      {isOpen && <div className="section-content">{children}</div>}
    </div>
  );
};

export default CollapsibleSection;
